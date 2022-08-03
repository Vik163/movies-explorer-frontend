import React from 'react';

import SearchForm from './SearchForm/SearchForm.js';
import Preloader from './Preloader/Preloader.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';

function Movies(props) {
  const { cards } = props;
  return (
    <main className='main'>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList cards={cards} />
    </main>
  );
}
export default Movies;
