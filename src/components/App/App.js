import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';

import Login from '../Register-Login/Login.js';
import Register from '../Register-Login/Register.js';
import Profile from '../Profile/Profile.js';
import ErrorPage from '../ErrorPage/ErrorPage.js';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies';
import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/api.js';
import { auth } from '../../utils/auth.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [logInfo, setLogInfo] = useState({
    id: '',
    email: '',
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [isSign, setIsSign] = useState(false);
  const [valueSubmit, setValueSubmit] = useState('Сохранить');
  const [valueSubmitDeleteCard, setValueSubmitDeleteCard] = useState('Да');
  const [selectedCard, setSelectedCard] = useState({});
  const [cardDelete, setCardDelete] = useState({});
  const [cards, setCards] = useState([]);

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLogInfo({
              id: res._id,
              email: res.email,
            });
            setLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleRegister({ password, email }) {
    return auth
      .registration(password, email)
      .then((res) => {
        if (res) {
          setIsSign(true);

          history.push('/sign-in');
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSign(false);
      })
      .finally(() => {});
  }

  function handleLogin({ password, email }) {
    return auth
      .authorization(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          checkToken();
          setCurrentUser(data.user);
          api.getInitialCards().then((cards) => {
            setCards(cards);
          });
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  }

  function signOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setLogInfo({
      id: null,
      email: null,
    });
    history.push('/sign-in');
  }

  function handleAddPlaceSubmit(obj, clearInput) {
    setValueSubmit('Сохранение...');
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
        setValueSubmit('Сохранить');
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
    setCardDelete(card);
  }

  function handleUpdateUser(obj) {
    setValueSubmit('Сохранение...');

    api
      .sendInfoProfile(obj)
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValueSubmit('Сохранить');
      });
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

  function handleUpdateAvatar(avatar, clearInput) {
    setValueSubmit('Сохранение...');
    api
      .addAvatar(avatar)
      .then((result) => {
        setCurrentUser(result);
        clearInput();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setValueSubmit('Сохранить');
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route path='/sign-up'>
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path='/sign-in'>
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path='/error'>
            <ErrorPage handleLogin={handleLogin} />
          </Route>
          {/* <ProtectedRoute exact path="/" loggedIn={loggedIn}> */}
          <Route path='/profile'>
            <Header
              loggedIn={loggedIn}
              infoLink='Главная'
              signOut={signOut}
              link='/sign-in'
            />
            <Profile handleLogin={handleLogin} />
          </Route>
          <Route path='/main'>
            {/* временно */}

            <Header
              loggedIn={loggedIn}
              infoLink='Главная'
              signOut={signOut}
              // link='/sign-in'
            />
            <Main loggedIn={loggedIn} infoLink='Главная' signOut={signOut} />
            <Footer />
          </Route>
          <Route path='/movies'>
            <Header
              loggedIn={loggedIn}
              infoLink='Главная'
              signOut={signOut}
              // link='/sign-in'
            />
            <Movies onCardLike={handleCardLike} cards={cards} />
            <Footer />
          </Route>
          {/* временно */}
          {/* </ProtectedRoute> */}
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
