import React from 'react';

import SearchForm from './SearchForm/SearchForm.js';
import Preloader from './Preloader/Preloader.js';
import MoviesCardList from './MoviesCardList/MoviesCardList.js';

function Movies(props) {
  const {
    cards,
    story,
    searchCards,
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
          deleteCard={deleteCard}
          addCard={addCard}
          savedCards={savedCards}
          story={story}
        />
      )}
    </main>
  );
}
export default Movies;
