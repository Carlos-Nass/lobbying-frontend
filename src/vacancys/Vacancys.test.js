import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Vagas } from './Vagas'; // Caminho para o componente
import '@testing-library/jest-dom';
import { Spin, Card } from 'antd';

global.fetch = jest.fn();

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Componente Vagas', () => {
    beforeEach(() => {
        localStorageMock.getItem.mockClear();
    });

    it('deve renderizar o título "Vagas"', () => {
        render(<Vagas />);
        expect(screen.getByText('Vagas')).toBeInTheDocument();
    });

    it('deve exibir um spinner enquanto os dados estão sendo carregados', () => {
        // Mock para retornar uma promessa pendente, simulando carregamento
        global.fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue([]) });

        render(<Vagas />);
        expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });

    it('deve exibir uma lista de vagas após o carregamento', async () => {
        // Mock para retornar dados simulados
        const mockVacancies = [
            { id: 1, title: 'Vaga 1', description: 'Descrição da vaga 1', tags: [{ label: 'Tag 1' }], createdAt: '2024-11-10', urlForm: 'http://form1.com' },
            { id: 2, title: 'Vaga 2', description: 'Descrição da vaga 2', tags: [{ label: 'Tag 2' }], createdAt: '2024-11-11', urlForm: 'http://form2.com' },
        ];

        global.fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockVacancies),
        });

        render(<Vagas />);

        // Espera o componente renderizar as vagas
        await waitFor(() => expect(screen.getByText('Vaga 1')).toBeInTheDocument());
        expect(screen.getByText('Vaga 2')).toBeInTheDocument();
    });

    it('deve chamar a API com o token do localStorage', async () => {
        // Configurar o localStorage mock
        localStorageMock.getItem.mockReturnValueOnce('mockToken');

        const mockVacancies = [
            { id: 1, title: 'Vaga 1', description: 'Descrição da vaga 1', tags: [{ label: 'Tag 1' }], createdAt: '2024-11-10', urlForm: 'http://form1.com' },
        ];

        global.fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockVacancies),
        });

        render(<Vagas />);

        await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
            expect.stringContaining('/vacancy/load-vacancys-by-tags'),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Authorization': 'Bearer mockToken',
                }),
            })
        ));
    });

    it('deve mudar a página de vagas ao clicar na paginação', async () => {
        const mockVacancies = [
            { id: 1, title: 'Vaga 1', description: 'Descrição da vaga 1', tags: [{ label: 'Tag 1' }], createdAt: '2024-11-10', urlForm: 'http://form1.com' },
            { id: 2, title: 'Vaga 2', description: 'Descrição da vaga 2', tags: [{ label: 'Tag 2' }], createdAt: '2024-11-11', urlForm: 'http://form2.com' },
            { id: 3, title: 'Vaga 3', description: 'Descrição da vaga 3', tags: [{ label: 'Tag 3' }], createdAt: '2024-11-12', urlForm: 'http://form3.com' },
        ];

        global.fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockVacancies),
        });

        render(<Vagas />);

        await waitFor(() => expect(screen.getByText('Vaga 1')).toBeInTheDocument());

        // Clica na página 2
        fireEvent.click(screen.getByText('2'));

        // Verifica se a página foi alterada e a vaga 2 é renderizada
        await waitFor(() => expect(screen.getByText('Vaga 2')).toBeInTheDocument());
    });
});
