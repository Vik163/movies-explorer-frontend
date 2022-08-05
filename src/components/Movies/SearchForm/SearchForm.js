import React, { useEffect, useState, useCallback } from 'react';

import './SearchForm.css';
import './FilterCheckbox.css';

function SearchForm(props) {
  const [isError, setIsError] = useState(false);
  const [value, setValue] = React.useState('');
  const [isToggle, setIsToggle] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsError(e.target.validationMessage);
  };

  useEffect(() => {
    isError && setIsError(true);
  }, [isError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value) {
      setIsError(true);
    } else {
      props.searchCards(value, isToggle);
      resetForm();
    }
  };

  const resetForm = useCallback(() => {
    setValue('');
    setIsError(false);
  }, [setValue, setIsError]);

  const toggle = () => {
    setIsToggle(!isToggle);
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
        <input type='checkbox' className='searchForm__checkbox' id='checkbox' />
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
