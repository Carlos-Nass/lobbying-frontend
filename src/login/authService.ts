import { apiRequest } from '../utils/apiRequest';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const authService = {
  login: async (email, password) => {
    const data = { email, password };

    try {
      const response = await apiRequest(BASE_URL + '/user/auth/login', 'POST', data);
      return response;
    } catch (error) {
      throw new Error('Erro ao realizar o login. Por favor, tente novamente.');
    }
  },
};
