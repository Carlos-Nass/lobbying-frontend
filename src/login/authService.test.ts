const authService = require('./authService');
const { apiRequest } = require('../utils/apiRequest'); // Importa a função que será mockada

jest.mock('../utils/apiRequest'); // Mocka o módulo apiRequest

describe('authService', () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const email = 'test@example.com';
  const password = 'password123';

  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  it('deve chamar apiRequest com os parâmetros corretos ao realizar o login', async () => {
    // Simula a resposta de sucesso para a chamada da API
    apiRequest.mockResolvedValue({
      token: 'mockToken',
    });

    // Executa o método de login
    const response = await authService.login(email, password);

    // Verifica se apiRequest foi chamada corretamente
    expect(apiRequest).toHaveBeenCalledWith(
      `${BASE_URL}/user/auth/login`,
      'POST',
      { email, password }
    );

    // Verifica se o retorno é o esperado
    expect(response).toEqual({
      token: 'mockToken',
    });
  });

  it('deve lançar um erro quando apiRequest falhar', async () => {
    // Usando jest.spyOn para monitorar a função apiRequest diretamente
    const apiRequestSpy = jest.spyOn(require('../utils/apiRequest'), 'apiRequest');

    // Simula um erro na chamada da API
    apiRequestSpy.mockRejectedValue(new Error('Erro na API'));

    // Verifica se o erro é tratado corretamente
    await expect(authService.login(email, password)).rejects.toThrow(
      'Erro ao realizar o login. Por favor, tente novamente.'
    );

    // Verifica se apiRequest foi chamada corretamente
    expect(apiRequestSpy).toHaveBeenCalledWith(
      `${BASE_URL}/user/auth/login`,
      'POST',
      { email, password }
    );
  });
});
