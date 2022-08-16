export default function ErrorHandler(err) {
  if (err.message === 'Ошибка: Conflict') {
    return 'Пользователь с таким email уже существует';
  }
  if (err.message === 'Ошибка: Unauthorized') {
    return 'Вы ввели неправильный логин или пароль';
  }
  if (err.message === 'Ошибка: 404') {
    return {
      statusCode: 404,
      message: 'Страница по указанному маршруту не найдена',
    };
  }
  if (err.message === 'Ошибка: Internal Server Error' || err.message === 'Failed to fetch') {
    return {
      statusCode: 500,
      message: 'На сервере произошла ошибка',
    };
  }
}
