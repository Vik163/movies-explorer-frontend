import React from 'react';

import './SearchForm.css';
import './FilterCheckbox.css';

function SearchForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className='searchForm'>
      <form className='searchForm__form' onSubmit={handleSubmit}>
        <input
          className='searchForm__input searchForm__input_type_email'
          type='text'
          placeholder='Фильм'
          name='film'
          required
        />
        <button
          className='searchForm__submit button-hover'
          type='submit'
        ></button>
      </form>
      <div className='searchForm__checkbox-container button-hover'>
        <input type='checkbox' className='searchForm__checkbox' id='checkbox' />
        <label className='searchForm__label' htmlFor='checkbox'>
          Короткометражки
        </label>
      </div>
    </section>
  );
}

export default SearchForm;
