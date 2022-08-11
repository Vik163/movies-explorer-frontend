import React from 'react';

import SearchForm from './SearchForm/SearchForm.js';
import Preloader from './Preloader/Preloader.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';

function Movies(props) {
  const pageSaveMovies = false;

  const {
    cards,
    story,
    searchCards,
    getInitialCards,
    initialSavedCards,
    searchShortCards,
    isPreloader,
    deleteCard,
    addCard,
    savedCards,
    preloaderMessage,
    preloaderMessageError,
  } = props;

  return (
    <main className='main'>
      <SearchForm
        searchCards={searchCards}
        getInitialCards={getInitialCards}
        story={story}
        searchShortCards={searchShortCards}
      />
      {isPreloader ? (
        <Preloader
          preloaderMessage={preloaderMessage}
          preloaderMessageError={preloaderMessageError}
        />
      ) : (
        <MoviesCardList
          cards={cards}
          pageSaveMovies={pageSaveMovies}
          deleteCard={deleteCard}
          initialSavedCards={initialSavedCards}
          addCard={addCard}
          savedCards={savedCards}
          story={story}
        />
      )}
    </main>
  );
}
export default Movies;
