import React, { useEffect, useState, useCallback } from 'react';

import './SearchForm.css';
import './FilterCheckbox.css';

function SearchForm(props) {
  const {
    searchCards,
    getInitialCards,
    getInitialSaveCards,
    story,
    searchShortCards,
    pageSaveMovies,
    searchSaveCards,
  } = props;
  const [isError, setIsError] = useState(false);
  const [value, setValue] = React.useState('');
  const [isToggle, setIsToggle] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsError(e.target.validationMessage);
  };

  // история формы поиска
  useEffect(() => {
    if (!(story === {} || story === null)) {
      setIsToggle(story.isToggle);
      setValue(story.value);
    }
  }, [story]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      if (pageSaveMovies) {
        getInitialSaveCards();
      } else {
        setIsError(true);
        getInitialCards();
      }
    } else {
      if (pageSaveMovies) {
        searchSaveCards(value, isToggle);
      } else {
        searchCards(value, isToggle);
        resetForm();
      }
    }
  };

  const resetForm = useCallback(() => {
    setIsError(false);
  }, [setIsError]);

  const toggle = () => {
    setIsToggle(!isToggle);
    searchShortCards(!isToggle, pageSaveMovies);
  };

  return (
    <section className='searchForm'>
      <form className='searchForm__form' onSubmit={handleSubmit} noValidate>
        <input
          className='searchForm__input searchForm__input_type_email'
          type='text'
          placeholder='Фильм'
          name='film'
          minLength='2'
          onChange={handleChange}
          value={value ?? ''}
          required
        />
        {isError && (
          <span
            className='searchForm__input-error'
            style={{ display: 'block' }}
          >
            Нужно ввести ключевое слово
          </span>
        )}
        <button
          className='searchForm__submit button-hover'
          type='submit'
        ></button>
      </form>
      <div className='searchForm__checkbox-container button-hover'>
        <input
          type='checkbox'
          className={`searchForm__checkbox ${
            isToggle && 'searchForm__checkbox-checked'
          }`}
          id='checkbox'
        />
        <label
          className='searchForm__label'
          htmlFor='checkbox'
          onClick={toggle}
        >
          Короткометражки
        </label>
      </div>
    </section>
  );
}

export default SearchForm;
