import React from 'react';

import SearchForm from './Movies/SearchForm/SearchForm';
import Preloader from './Movies/Preloader/Preloader.js';

import MoviesCardList from './Movies/MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const pageSaveMovies = true;
  const {
    savedCards,
    searchSaveCards,
    story,
    searchShortCards,
    deleteCard,
    isPreloader,
    initialSavedCards,
    preloaderMessage,
    preloaderMessageError,
  } = props;

  return (
    <main className='main'>
      <SearchForm
        searchSaveCards={searchSaveCards}
        story={story}
        pageSaveMovies={pageSaveMovies}
        searchShortCards={searchShortCards}
      />
      {isPreloader ? (
        <Preloader
          preloaderMessage={preloaderMessage}
          preloaderMessageError={preloaderMessageError}
        />
      ) : (
        <MoviesCardList
          savedCards={savedCards}
          initialSavedCards={initialSavedCards}
          cards={savedCards}
          pageSaveMovies={pageSaveMovies}
          deleteCard={deleteCard}
        />
      )}
    </main>
  );
}
export default SavedMovies;
