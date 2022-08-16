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
    getInitialSaveCards,
    preloaderMessage,
  } = props;

  return (
    <main className='main'>
      <SearchForm
        searchSaveCards={searchSaveCards}
        getInitialSaveCards={getInitialSaveCards}
        story={story}
        pageSaveMovies={pageSaveMovies}
        searchShortCards={searchShortCards}
      />
      {isPreloader ? (
        <Preloader preloaderMessage={preloaderMessage} />
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
