import React, { useEffect, useState, useCallback } from 'react';

import './SearchForm.css';
import './FilterCheckbox.css';

function SearchForm() {
  const [isError, setIsError] = useState(false);
  const [value, setValue] = React.useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsError(e.target.validationMessage);
  };

  useEffect(() => {
    isError && setIsError(true);
  }, [isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    !value ? setIsError(true) : resetForm();
  };

  const resetForm = useCallback(() => {
    setValue('');
    setIsError(false);
  }, [setValue, setIsError]);

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
        <input type='checkbox' className='searchForm__checkbox' id='checkbox' />
        <label className='searchForm__label' htmlFor='checkbox'>
          Короткометражки
        </label>
      </div>
    </section>
  );
}

export default SearchForm;
