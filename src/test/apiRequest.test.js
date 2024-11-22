const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const { apiRequest } = require('../utils/apiRequest');

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

});
