import React from 'react';

import SearchForm from './Movies/SearchForm/SearchForm';
import MoviesCardList from './Movies/MoviesCardList/MoviesCardList';

function SavedMovies(props) {
  const savePage = true;
  const { savedCards, searchCards, story, searchShortCards } = props;
  return (
    <main className='main'>
      <SearchForm
        searchCards={searchCards}
        story={story}
        searchShortCards={searchShortCards}
      />
      <MoviesCardList
        savedCards={savedCards}
        cards={savedCards}
        savePage={savePage}
      />
    </main>
  );
}
export default SavedMovies;
