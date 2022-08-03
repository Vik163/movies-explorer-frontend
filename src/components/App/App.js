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
// import ProtectedRoute from '../ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { api } from '../../utils/api.js';
// import { auth } from '../../utils/auth.js';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([
    {
      id: 1,
      nameRU: '«Роллинг Стоунз» в изгнании',
      nameEN: 'Stones in Exile',
      director: 'Стивен Кайак ',
      country: 'США',
      year: '2010',
      duration: 61,
      description:
        'В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.',
      trailerLink: 'https://www.youtube.com/watch?v=UXcqcdYABFw',
      created_at: '2020-11-23T14:12:21.376Z',
      updated_at: '2020-11-23T14:12:21.376Z',
      image: {
        id: 1,
        name: 'stones-in-exile',
        alternativeText: '',
        caption: '',
        width: 512,
        height: 279,
        formats: {
          thumbnail: {
            hash: 'thumbnail_stones_in_exile_b2f1b8f4b7',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 245,
            height: 134,
            size: 8.79,
            path: null,
            url: '/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg',
          },
          small: {
            hash: 'small_stones_in_exile_b2f1b8f4b7',
            ext: '.jpeg',
            mime: 'image/jpeg',
            width: 500,
            height: 272,
            size: 25.68,
            path: null,
            url: '/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg',
          },
        },
        hash: 'stones_in_exile_b2f1b8f4b7',
        ext: '.jpeg',
        mime: 'image/jpeg',
        size: 25.53,
        url: '/uploads/stones_in_exile_b2f1b8f4b7.jpeg',
        previewUrl: null,
        provider: 'local',
        provider_metadata: null,
        created_at: '2020-11-23T14:11:57.313Z',
        updated_at: '2020-11-23T14:11:57.313Z',
      },
    },
  ]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route path='/sign-up'>
            <Register />
          </Route>
          <Route path='/sign-in'>
            <Login />
          </Route>
          <Route path='/error'>
            <ErrorPage />
          </Route>
          {/* <ProtectedRoute exact path="/" loggedIn={loggedIn}> */}
          <Route path='/profile'>
            <Header loggedIn={loggedIn} />
            <Profile />
          </Route>
          <Route exact path='/'>
            <Header loggedIn={loggedIn} />
            <Main loggedIn={loggedIn} infoLink='Главная' />
            <Footer />
          </Route>
          <Route path='/movies'>
            <Header loggedIn={loggedIn} />
            <Movies cards={cards} />
            <Footer />
          </Route>
          <Route path='/saved-movies'>
            <Header loggedIn={loggedIn} />
            <SavedMovies savedCards={savedCards} />
            <Footer />
          </Route>
          {/* </ProtectedRoute> */}
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
