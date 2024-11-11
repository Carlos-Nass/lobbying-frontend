const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { apiRequest } = require('./apiRequest');

describe('apiRequest', () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    afterAll(() => {
        mock.restore();
    });

    it('deve fazer uma requisição POST com sucesso e retornar os dados', async () => {
        const mockData = { success: true };
        const url = '/test-url';

        mock.onPost(url).reply(200, mockData);

        const response = await apiRequest(url, 'POST', { key: 'value' });

        expect(response).toEqual(mockData);
    });

    it('deve fazer uma requisição GET com sucesso e retornar os dados', async () => {
        const mockData = { success: true };
        const url = '/test-url';

        mock.onGet(url).reply(200, mockData);

        const response = await apiRequest(url, 'GET');

        expect(response).toEqual(mockData);
    });

    it('deve lançar um erro ao receber uma resposta de erro do servidor', async () => {
        const url = '/test-url';

        mock.onPost(url).reply(400, { message: 'Bad Request' });

        await expect(apiRequest(url, 'POST')).rejects.toThrow('Erro: 400 - [object Object]');
    });

    it('deve lançar um erro quando o servidor não responde', async () => {
        const url = '/test-url';

        mock.onPost(url).networkError();

        await expect(apiRequest(url, 'POST')).rejects.toThrow('Erro: Network Error');
    });

    it('deve lançar um erro para outros erros na requisição', async () => {
        const url = '/test-url';

        mock.onPost(url).timeout();

        await expect(apiRequest(url, 'POST')).rejects.toThrow('Erro: timeout of 0ms exceeded');
    });
});
