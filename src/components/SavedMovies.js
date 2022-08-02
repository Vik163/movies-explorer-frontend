import React from 'react';

import SearchForm from './Movies/SearchForm/SearchForm';
import Preloader from './Movies/Preloader/Preloader';
import MoviesCardList from './Movies/MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const { savedCards } = props;
  return (
    <main className='main'>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList cards={savedCards} />
    </main>
  );
}
export default SavedMovies;
