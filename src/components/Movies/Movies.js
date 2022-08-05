import React from 'react';

import SearchForm from './SearchForm/SearchForm.js';
import Preloader from './Preloader/Preloader.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';

function Movies(props) {
  const {
    cards,
    searchCards,
    isPreloader,
    preloaderMessage,
    preloaderMessageError,
  } = props;

  return (
    <main className='main'>
      <SearchForm searchCards={searchCards} />
      {isPreloader ? (
        <Preloader
          preloaderMessage={preloaderMessage}
          preloaderMessageError={preloaderMessageError}
        />
      ) : (
        <MoviesCardList cards={cards} />
      )}
    </main>
  );
}
export default Movies;
