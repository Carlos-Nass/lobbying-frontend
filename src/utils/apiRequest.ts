import axios from 'axios';

export const apiRequest = async (url, method = 'POST', data = {}) => {
    try {
        const response = await axios({
            url: url,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        });

        return response.data;
    } catch (error) {
        console.error('Erro na requisição:', error);

        if (error.response) {
            throw new Error(`Erro: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
            throw new Error('Erro: Nenhuma resposta do servidor.');
        } else {
            throw new Error(`Erro: ${error.message}`);
        }
    }
};
