import './Footer.css';

function Footer() {
  return (
    <footer className='footer page__footer'>
      <h1 className='footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h1>
      <div className='footer__info'>
        <p className='footer__date'>&copy; {new Date().getFullYear()}</p>
        <ul className='footer__navbar'>
          <li className='footer__navbar-item button-hover'>
            <a
              className='footer__link'
              href='https://practicum.yandex.ru/'
              target='_blank'
              rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__navbar-item button-hover'>
            <a
              className='footer__link'
              href='https://github.com/'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </li>
          <li className='footer__navbar-item button-hover'>
            <a
              className='footer__link'
              href='https://vk.com/'
              target='_blank'
              rel='noreferrer'
            >
              ВКонтакте
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
