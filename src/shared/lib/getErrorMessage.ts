/* eslint-disable sonarjs/no-duplicate-string */
import { HTTPError } from 'ky';
import { errorHandler } from './errors';

const regExpField = /\{([^}]+)\}/;

const getErrorFields = (text?: string) => {
  if (!text) return;
  return text.match(regExpField);
};

export const getErrorMessage = async (error: unknown) => {
  if (error instanceof HTTPError) {
    const errorJSON = await error.response.json();

    const { detail, message, field } = errorJSON;

    const fields = getErrorFields(detail || message || field);

    const errorText =
      errorHandler(message || detail || field) || 'Unspecified server error';

    return { errorText, fields };
  }
  if (error instanceof Error) {
    const fields = getErrorFields(error.message);
    const errorText = errorHandler(error.message) || 'Unspecified server error';

    return { errorText, fields };
  }

  return {
    errorText:
      errorHandler('Unspecified server error') || 'Unspecified server error',
  };
};
