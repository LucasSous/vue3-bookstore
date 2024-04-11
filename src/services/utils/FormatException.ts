import axios, { AxiosError } from 'axios';
import { ServerError } from '@/interfaces/serverError.interface';

const formatException = (error): String => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ServerError>;
    if (axiosError.response) {
      const responseError = axiosError.response.data.error;
      if (responseError) {
        return responseError;
      }
    }
  }
  return 'Um erro inesperado aconteceu';
};

export { formatException };
