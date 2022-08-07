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

  const [loggedIn, setLoggedIn] = useState(false);
  const [story, setStory] = useState({});
  const [storySavePage, setStorySavePage] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [errorPageMessage, setErrorPageMessage] = useState('');
  const [preloaderMessage, setPreloaderMessage] = useState('');
  const [preloaderMessageError, setPreloaderMessageError] = useState('');
  const [isPreloader, setIsPreloader] = useState(false);
  const [initialSavedCards, setInitialSavedCards] = useState([]);
  const [initialCards, setInitialCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  const checkToken = () => {
    auth
      .checkToken()
      .then((res) => {
        res && setLoggedIn(true);
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
    moviesApi.searchCards().then((cards) => {
      setInitialCards(cards);
      setCards(cards);
    });
  }, []);

  useEffect(() => {
    Promise.all([mainApi.getUserInfo(), mainApi.getSaveCards()])
      .then(([userData, saveCards]) => {
        setCurrentUser(userData);
        setInitialSavedCards(saveCards);
        setSavedCards(saveCards);
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
        setErrorMessage('Данные успешно обновлены! ');
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
            setStory({
              isToggle: isToggle,
              value: value,
              arr: arr,
            });
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

  function searchSaveCards(value, isToggle) {
    setIsPreloader(true);

    const arr = savedCards.filter((item) => {
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
      setSavedCards(arr);
      setStorySavePage({
        isToggle: isToggle,
        value: value,
        arr: arr,
      });
    } else {
      setPreloaderMessage('Ничего не найдено');
    }
    setIsPreloader(false);
  }

  function searchShortCards(isToggle, pageSaveMovies) {
    setIsPreloader(true);
    const arrCards = pageSaveMovies ? savedCards : initialCards;

    pageSaveMovies
      ? setStorySavePage({
          isToggle: isToggle,
        })
      : setStory({
          isToggle: isToggle,
        });

    if (isToggle) {
      const arr = arrCards.filter((item) => {
        return item.duration < 40;
      });
      if (!(arr.length === 0)) {
        setIsPreloader(false);
        story.arr
          ? pageSaveMovies
            ? setSavedCards(story.arr)
            : setCards(story.arr)
          : pageSaveMovies
          ? setSavedCards(arr)
          : setCards(arr);
      } else {
        setPreloaderMessage('Ничего не найдено');
      }
    } else {
      setIsPreloader(false);
      story.arr
        ? pageSaveMovies
          ? setSavedCards(story.arr)
          : setCards(story.arr)
        : pageSaveMovies
        ? setSavedCards(initialSavedCards)
        : setCards(arrCards);
    }
  }

  function addCard(card) {
    mainApi
      .addCard(card)
      .then((saveCard) => {
        setSavedCards([saveCard, ...savedCards]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteCard(card) {
    mainApi
      .deleteCard(card)
      .then(() => {
        setSavedCards((state) => state.filter((c) => !(c._id === card._id)));
      })
      .catch((err) => {
        console.log(err);
      });
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
                story={story}
                searchCards={searchCards}
                searchShortCards={searchShortCards}
                addCard={addCard}
                deleteCard={deleteCard}
                savedCards={savedCards}
                isPreloader={isPreloader}
                preloaderMessage={preloaderMessage}
                preloaderMessageError={preloaderMessageError}
              />
              <Footer />
            </Route>
            <Route path='/saved-movies'>
              <Header loggedIn={loggedIn} />
              <SavedMovies
                savedCards={savedCards}
                story={storySavePage}
                deleteCard={deleteCard}
                searchSaveCards={searchSaveCards}
                searchShortCards={searchShortCards}
                isPreloader={isPreloader}
                preloaderMessage={preloaderMessage}
                preloaderMessageError={preloaderMessageError}
              />
              <Footer />
            </Route>
          </ProtectedRoute>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
