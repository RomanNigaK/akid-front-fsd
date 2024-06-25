import ky from 'ky';

const envViteApiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

const prefixUrl = `${envViteApiBaseUrl}/api`;

export const httpClient = ky.create({
  prefixUrl,
});

export const httpClientAuthorized = ky.create({
  prefixUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('accessToken')}`
        );
      },
    ],
  },
});
