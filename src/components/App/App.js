import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';

import Login from '../Login.js';
import Register from '../Register/Register.js';
import Profile from '../Profile/Profile.js';
import ErrorPage from '../ErrorPage/ErrorPage.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies';

import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/api.js';
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
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isAddInfoTooltip, setIsAddInfoTooltip] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [messageInfoTooltip, setMessageInfoTooltip] = useState('');
  const [isAddConfirmPopupOpen, setIsAddConfirmPopupOpen] = useState(false);
  const [isPreloader, setIsPreloader] = useState('Сохранить');
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
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/movies');
    }
  }, [loggedIn]);

  useEffect(() => {
    setIsPreloader(true);

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        console.log(userData);
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }, []);

  function handleRegister({ name, password, email }) {
    return auth
      .registration(name, password, email)
      .then((res) => {
        if (res) {
          history.push('/movies');
        }
      })
      .catch((err) => {
        err.message === 'Ошибка: Bad Request' &&
          setErrorMessage('При регистрации пользователя произошла ошибка');
        err.message === 'Ошибка: Conflict' &&
          setErrorMessage('Пользователь с таким email уже существует');

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
        api.getInitialCards().then((cards) => {
          setCards(cards);
          history.push('/movies');
        });
      })
      .catch((err) => {
        err.message === 'Ошибка: Unauthorized' &&
          setErrorMessage('Вы ввели неправильный логин или пароль');
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
    api
      .sendInfoProfile(obj)
      .then((result) => {
        if (result.email === currentUser.email) {
          throw new Error('Ошибка: Conflict');
        }
        setCurrentUser(result);
      })
      .catch((err) => {
        err.message === 'Ошибка: Bad Request' &&
          setErrorMessage('При обновлении профиля произошла ошибка');
        err.message === 'Ошибка: Conflict' &&
          setErrorMessage('Пользователь с таким email уже существует');
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(obj, clearInput) {
    setIsPreloader(true);
    api
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
    api
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
    const action = isLiked ? api.deleteLike(card) : api.addLikes(card);
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
            <ErrorPage />
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
              <Movies cards={cards} />
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
