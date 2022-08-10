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
  const [errorNotFound, setErrorNotFound] = useState(false);
  const [errorPageMessage, setErrorPageMessage] = useState('');
  const [preloaderMessage, setPreloaderMessage] = useState('');
  const [preloaderMessageError, setPreloaderMessageError] = useState('');
  const [isPreloader, setIsPreloader] = useState(false);
  const [initialSavedCards, setInitialSavedCards] = useState([]);
  const [storyCards, setStoryCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          res && setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn && !errorNotFound) {
      history.push('/movies');
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      moviesApi.getCards().then((cards) => {
        setStoryCards(cards);
        setCards(cards);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
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
    }
  }, [loggedIn]);

  function handleRegister({ name, password, email }) {
    return auth
      .registration(name, password, email)
      .then((res) => {
        if (res) {
          handleLogin({ password, email });
        }
      })
      .catch((err) => {
        err.message === 'Ошибка: Bad Request'
          ? setErrorMessage('При регистрации пользователя произошла ошибка')
          : handleErrors(err);
        console.log(err);
      });
  }

  function handleLogin({ password, email }) {
    return auth
      .authorization(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setCurrentUser(data.user);
        setErrorMessage('');
        history.push('/movies');
      })
      .catch((err) => {
        err.message === 'Ошибка: Bad Request'
          ? setErrorMessage('При авторизации пользователя произошла ошибка')
          : handleErrors(err);
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');

    setLoggedIn(false);
    setCurrentUser({});

    history.push('/');
  }

  function handleUpdateUser(obj) {
    mainApi
      .sendInfoProfile(obj)
      .then((result) => {
        setCurrentUser(result);
        setErrorMessage('Данные успешно обновлены! ');
      })
      .catch((err) => {
        err.message === 'Ошибка: Bad Request'
          ? setErrorMessage('При обновлении профиля произошла ошибка')
          : handleErrors(err);
        console.log(err);
      });
  }

  //Сортировка отправки ошибок
  function handleErrors(err) {
    if (
      err.message === 'Ошибка: 404' ||
      err.message === 'Ошибка: Internal Server Error' ||
      err.message === 'Failed to fetch'
    ) {
      setErrorPageMessage(errorHandler(err));
      history.push('*');
    }
    setErrorMessage(errorHandler(err));
  }

  //Поиск в несохраненных картах
  function searchCards(value, isToggle) {
    setIsPreloader(true);
    moviesApi
      .getCards()
      .then((cards) => {
        if (cards) {
          const arr = cards.filter((item) => {
            if (item.nameRU && item.nameEN) {
              //Переключатель - короткометражки
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
              //История поиска
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

  //Поиск сохраненных карт
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
      setIsPreloader(false);
      setSavedCards(arr);
      setStorySavePage({
        isToggle: isToggle,
        value: value,
        arr: arr,
      });
    } else {
      setPreloaderMessage('Ничего не найдено');
    }
  }

  //Отбор короткометражек
  function searchShortCards(isToggle, pageSaveMovies) {
    setIsPreloader(true);
    const arrCards = pageSaveMovies ? savedCards : storyCards;

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

  function addPageNotFound() {
    setErrorNotFound(true);
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
          <Route exact path='/'>
            <Header loggedIn={loggedIn} />
            <Main loggedIn={loggedIn} infoLink='Главная' />
            <Footer />
          </Route>
          <ProtectedRoute path='/profile' loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} />
            <Profile
              signOut={signOut}
              handleUpdateUser={handleUpdateUser}
              errorMessage={errorMessage}
            />
          </ProtectedRoute>
          <ProtectedRoute path='/movies' loggedIn={loggedIn}>
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
          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies' loggedIn={loggedIn}>
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
          </ProtectedRoute>
          <Route path='*'>
            <ErrorPage
              errorPageMessage={errorPageMessage}
              addPageNotFound={addPageNotFound}
            />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
