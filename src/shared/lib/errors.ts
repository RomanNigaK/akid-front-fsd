export enum Errors {
  UnspecifiedServerError = 'Unspecified server error',
  UserExists = 'A user with this email is registered',
  InvalidCredentials = 'Invalid credentials.',
}

export const AVAILABLE_ERRORS: Record<Errors | string, string> = {
  [Errors.UnspecifiedServerError]: 'Неопределенная ошибка сервера',
  [Errors.InvalidCredentials]: 'Не верная пара логин/пароль',
  [Errors.UserExists]:
    'Пользователь с таким Email уже зарегистрирован в приложении',
};

export const errorHandler = (message: Errors | string) => {
  return (
    AVAILABLE_ERRORS[message] || AVAILABLE_ERRORS[Errors.UnspecifiedServerError]
  );
};
