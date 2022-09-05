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

  const [formReset, setFormReset] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorNotFound, setErrorNotFound] = useState(false);
  const [errorPageMessage, setErrorPageMessage] = useState('');
  const [preloaderMessage, setPreloaderMessage] = useState('');
  const [isPreloader, setIsPreloader] = useState(false);
  const [initialSavedCards, setInitialSavedCards] = useState([]);
  const [story, setStory] = useState(false);
  const [storySavePage, setStorySavePage] = useState({});
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const loggedIn = localStorage.getItem('loggedIn');
  const initialCards = JSON.parse(localStorage.getItem('initialCards'));
  const storySaveCards = JSON.parse(localStorage.getItem('saveCards'));

  // Проверка авторизации ------------------------
  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          res
            ? localStorage.setItem('loggedIn', true)
            : localStorage.setItem('loggedIn', false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  // ----------------------------------------------

  // Получение первоначальных карт --------------------------------
  useEffect(() => {
    if (loggedIn) {
      if (!initialCards) {
        moviesApi.getCards().then((cards) => {
          setCards(cards);
          localStorage.setItem('initialCards', JSON.stringify(cards));
        });
      } else {
        if (!storySaveCards) {
          // Отсутствует история
          setCards(initialCards);
        } else {
          setCards(storySaveCards.arr); // Есть история
          setStory(storySaveCards);
        }
      }
    }
  }, [loggedIn]);

  // Карты пользователя --------------
  useEffect(() => {
    setSavedCards(initialSavedCards);
  }, [initialSavedCards]);

  // Получение карт пользователя и его данных --------------------
  useEffect(() => {
    if (loggedIn) {
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

  // получение первоначальных карт при пустом инпуте поиска фильмов
  function getInitialCards() {
    if (loggedIn) {
      setIsPreloader(false);
      setCards(initialCards);
    }
  }

  // получение первоначальных карт пользователя
  function getInitialSaveCards() {
    if (loggedIn) {
      setIsPreloader(false);
      setSavedCards(initialSavedCards);
      setStorySavePage({});
    }
  }

  // Регистрация с немедленной авторизацией
  function handleRegister({ name, password, email }) {
    return auth
      .registration(name, password, email)
      .then((res) => {
        if (res) {
          handleLogin({ password, email });
        }
      })
      .catch((err) => {
        setFormReset(true);
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
        localStorage.setItem('loggedIn', true);
        setCurrentUser(data.user);
        setErrorMessage('');
        history.push('/movies');
      })
      .catch((err) => {
        setFormReset(true);
        err.message === 'Ошибка: Bad Request'
          ? setErrorMessage('При авторизации пользователя произошла ошибка')
          : handleErrors(err);
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('saveCards');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('initialCards');

    setStory({});
    setCurrentUser({});

    history.push('/');
  }

  // Обновление пользователя -------------------------
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

    if (initialCards) {
      const arr = initialCards.filter((item) => {
        if (item.nameRU && item.nameEN) {
          if (isToggle) {
            //Переключатель - короткометражки
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
        // История поиска
        localStorage.setItem(
          'saveCards',
          JSON.stringify({
            isToggle: isToggle,
            value: value,
            arr: arr,
          })
        );
        // строка в объект + рендер ------------------------------
        setStory(JSON.parse(localStorage.getItem('saveCards')));
      } else {
        setPreloaderMessage('Ничего не найдено');
      }
    }
  }

  //Поиск сохраненных карт
  function searchSaveCards(value, isToggle) {
    setIsPreloader(true);

    const arr = initialSavedCards.filter((item) => {
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

    // Выбор массива карт ------------------------------------
    const arrCards = pageSaveMovies ? savedCards : initialCards;

    // Обновление в истории состояния переключателя короткометражек
    pageSaveMovies
      ? setStorySavePage({ ...storySavePage, isToggle: isToggle })
      : setStory({ ...story, isToggle: isToggle });

    if (isToggle) {
      // Короткометражки
      const arr = arrCards.filter((item) => {
        return item.duration < 40;
      });
      if (!(arr.length === 0)) {
        setIsPreloader(false);
        pageSaveMovies ? setSavedCards(arr) : setCards(arr);
      } else {
        setPreloaderMessage('Ничего не найдено');
      }
    } else {
      setIsPreloader(false);
      // Обновление фильмов в истории
      story.arr ? setCards(story.arr) : setCards(arrCards);
      storySavePage.arr
        ? setSavedCards(storySavePage.arr)
        : setSavedCards(initialSavedCards);
    }
  }

  // Добавление и удаление карт ----------------------
  function addCard(card) {
    mainApi
      .addCard(card)
      .then((saveCard) => {
        setInitialSavedCards([saveCard, ...savedCards]);
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
        setInitialSavedCards((state) =>
          state.filter((c) => !(c._id === card._id))
        );
        setSavedCards((state) => state.filter((c) => !(c._id === card._id)));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // ------------------------------------------------------

  // Страница 404 ------------
  function addPageNotFound() {
    setErrorNotFound(true);
  }

  // Сообщение об ошибке в Profile
  function resetErrors() {
    setErrorMessage('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <ProtectedRoute path='/sign-up' loggedIn={loggedIn}>
            <Register
              handleRegister={handleRegister}
              errorMessage={errorMessage}
              formReset={formReset}
              resetErrors={resetErrors}
            />
          </ProtectedRoute>
          <ProtectedRoute path='/sign-in' loggedIn={loggedIn}>
            <Login
              handleLogin={handleLogin}
              errorMessage={errorMessage}
              formReset={formReset}
              resetErrors={resetErrors}
            />
          </ProtectedRoute>
          <Route exact path='/'>
            <Header loggedIn={loggedIn} />
            <Main getInitialSaveCards={getInitialSaveCards} />
            <Footer />
          </Route>
          <ProtectedRoute path='/profile' loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} />
            <Profile
              signOut={signOut}
              handleUpdateUser={handleUpdateUser}
              errorMessage={errorMessage}
              getInitialSaveCards={getInitialSaveCards}
            />
          </ProtectedRoute>
          <ProtectedRoute path='/movies' loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} />
            <Movies
              cards={cards}
              story={story}
              getInitialCards={getInitialCards}
              getInitialSaveCards={getInitialSaveCards}
              searchCards={searchCards}
              searchShortCards={searchShortCards}
              addCard={addCard}
              deleteCard={deleteCard}
              initialSavedCards={initialSavedCards}
              savedCards={savedCards}
              isPreloader={isPreloader}
              preloaderMessage={preloaderMessage}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies' loggedIn={loggedIn}>
            <Header loggedIn={loggedIn} />
            <SavedMovies
              savedCards={savedCards}
              getInitialSaveCards={getInitialSaveCards}
              story={storySavePage}
              deleteCard={deleteCard}
              searchSaveCards={searchSaveCards}
              initialSavedCards={initialSavedCards}
              searchShortCards={searchShortCards}
              isPreloader={isPreloader}
              preloaderMessage={preloaderMessage}
            />
            <Footer />
          </ProtectedRoute>
          <Route path='*'>
            <ErrorPage
              errorNotFound={errorNotFound}
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
