import React from 'react';

import './SearchForm.css';
import './FilterCheckbox.css';

function SearchForm() {
  return (
    <section className='searchForm'>
      <form className='searchForm__form' onSubmit={'handleSubmit'}>
        <input
          className='searchForm__input searchForm__input_type_email'
          type='text'
          // onChange={handleChange}
          // value={infoAuth.email ?? ''}
          placeholder='Фильм'
          name='film'
          required
        />
        <button
          className='searchForm__submit'
          type='submit'
          // onClick={toggle}
        ></button>
      </form>
      <div className='searchForm__checkbox-container'>
        <input type='checkbox' className='searchForm__checkbox' id='checkbox' />
        <label className='searchForm__label' for='checkbox'>
          Короткометражки
        </label>
      </div>
    </section>
  );
}

export default SearchForm;