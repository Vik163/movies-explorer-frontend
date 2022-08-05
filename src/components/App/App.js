import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';

import Login from '../Login.js';
import Register from '../Register/Register.js';
import Profile from '../Profile/Profile.js';
import ErrorPage from '../Errors/ErrorPage.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies';
import errorHandler from '../Errors/ErrorHandler';

import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/mainApi.js';
import { moviesApi } from '../../utils/moviesApi.js';
import { auth } from '../../utils/auth.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [logInfo, setLogInfo] = useState({
    id: '',
    name: '',
    email: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorPageMessage, setErrorPageMessage] = useState('');
  const [preloaderMessage, setPreloaderMessage] = useState('');
  const [preloaderMessageError, setPreloaderMessageError] = useState('');
  const [isAddConfirmPopupOpen, setIsAddConfirmPopupOpen] = useState(false);
  const [isPreloader, setIsPreloader] = useState(false);
  const [valueSubmitDeleteCard, setValueSubmitDeleteCard] = useState('Да');
  const [selectedCard, setSelectedCard] = useState({});
  const [cardDelete, setCardDelete] = useState({});
  const [cards, setCards] = useState([]);

  const checkToken = () => {
    auth
      .checkToken()
      .then((res) => {
        if (res) {
          setLogInfo({
            id: res._id,
            name: res.name,
            email: res.email,
          });
          setLoggedIn(true);
        }
        history.push('/movies');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    !errorPageMessage && checkToken();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
    }
  }, [loggedIn]);

  useEffect(() => {
    Promise.all([mainApi.getUserInfo(), moviesApi.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        handleErrors(err);
        console.log(err);
      });
  }, []);

  function handleRegister({ name, password, email }) {
    return auth
      .registration(name, password, email)
      .then((res) => {
        if (res) {
          history.push('/movies');
          setErrorMessage('');
        }
      })
      .catch((err) => {
        handleErrors(err);
        err.message === 'Ошибка: Bad Request' &&
          setErrorMessage('При регистрации пользователя произошла ошибка');
        console.log(err);
      });
  }

  function handleLogin({ password, email }) {
    return auth
      .authorization(password, email)
      .then((data) => {
        checkToken();
        setLoggedIn(true);
        setCurrentUser(data.user);
        mainApi.getInitialCards().then((cards) => {
          setCards(cards);
          history.push('/movies');
          setErrorMessage('');
        });
      })
      .catch((err) => {
        handleErrors(err);
        err.message === 'Ошибка: Bad Request' &&
          setErrorMessage('При авторизации пользователя произошла ошибка');
        console.log(err);
      });
  }

  function signOut() {
    return auth
      .signOut()
      .then(() => {
        setLoggedIn(false);
        setLogInfo({
          id: null,
          email: null,
          name: null,
        });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(obj) {
    mainApi
      .sendInfoProfile(obj)
      .then((result) => {
        setCurrentUser(result);
        setErrorMessage('');
      })
      .catch((err) => {
        handleErrors(err);
        err.message === 'Ошибка: Bad Request' &&
          setErrorMessage('При обновлении профиля произошла ошибка');
        console.log(err);
      });
  }

  function handleErrors(err) {
    if (
      err.message === 'Ошибка: 404' ||
      err.message === 'Ошибка: Internal Server Error' ||
      err.message === 'Failed to fetch'
    ) {
      setErrorPageMessage(errorHandler(err));
      history.push('/error');
    }
    setErrorMessage(errorHandler(err));
  }

  function searchCards(value, isToggle) {
    setIsPreloader(true);
    moviesApi
      .searchCards()
      .then((cards) => {
        if (cards) {
          const arr = cards.filter((item) => {
            if (item.nameRU && item.nameEN) {
              if (isToggle) {
                if (item.duration < 40) {
                  return (
                    item.nameRU.toLowerCase().includes(value.toLowerCase()) ||
                    item.nameEN.toLowerCase().includes(value.toLowerCase())
                  );
                }
              } else {
                return (
                  item.nameRU.toLowerCase().includes(value.toLowerCase()) ||
                  item.nameEN.toLowerCase().includes(value.toLowerCase())
                );
              }
            }
          });
          if (!(arr.length === 0)) {
            setIsPreloader(false);
            setCards(arr);
          } else {
            setPreloaderMessage('Ничего не найдено');
          }
        }
      })
      .catch((err) => {
        err &&
          setPreloaderMessageError(
            'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
          );
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(obj, clearInput) {
    setIsPreloader(true);
    mainApi
      .addCard(obj)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        clearInput();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  function handleCardDelete(e) {
    e.preventDefault();

    setValueSubmitDeleteCard('Сохранение...');
    mainApi
      .deleteCard(cardDelete)
      .then(() => {
        setCards((state) => state.filter((c) => !(c._id === cardDelete._id)));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValueSubmitDeleteCard('Да');
      });
  }

  function onConfirmDelete(card) {
    setIsAddConfirmPopupOpen(true);
    setCardDelete(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const action = isLiked ? mainApi.deleteLike(card) : mainApi.addLikes(card);
    action
      .then((result) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? result : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route path='/sign-up'>
            <Register
              handleRegister={handleRegister}
              errorMessage={errorMessage}
            />
          </Route>
          <Route path='/sign-in'>
            <Login handleLogin={handleLogin} errorMessage={errorMessage} />
          </Route>
          <Route path='/error'>
            <ErrorPage errorPageMessage={errorPageMessage} />
          </Route>
          <Route exact path='/'>
            <Header loggedIn={loggedIn} />
            <Main loggedIn={loggedIn} infoLink='Главная' />
            <Footer />
          </Route>
          <ProtectedRoute path='/' loggedIn={loggedIn}>
            <Route path='/profile'>
              <Header loggedIn={loggedIn} />
              <Profile
                signOut={signOut}
                handleUpdateUser={handleUpdateUser}
                errorMessage={errorMessage}
              />
            </Route>
            <Route path='/movies'>
              <Header loggedIn={loggedIn} />
              <Movies
                cards={cards}
                searchCards={searchCards}
                isPreloader={isPreloader}
                preloaderMessage={preloaderMessage}
                preloaderMessageError={preloaderMessageError}
              />
              <Footer />
            </Route>
            <Route path='/saved-movies'>
              <Header loggedIn={loggedIn} />
              <SavedMovies />
              <Footer />
            </Route>
          </ProtectedRoute>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
