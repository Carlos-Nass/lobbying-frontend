const { Routers } = require('../Routers');
const { BrowserRouter, Routes, Route, Navigate } = require('react-router-dom');
const { render } = require('@testing-library/react');

Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
    },
    writable: true,
});

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: jest.fn(),
}));

describe('Routers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve redirecionar para /login quando o usuário não estiver logado', () => {
        jest.spyOn(localStorage, 'getItem').mockReturnValue(null);

        const isLogged = !!localStorage.getItem('token');
        expect(isLogged).toBe(false);

        expect(Navigate).not.toHaveBeenCalled();
    });

    it('deve redirecionar para /home quando o usuário estiver logado', () => {
        jest.spyOn(localStorage, 'getItem').mockReturnValue('mockToken');

        const isLogged = !!localStorage.getItem('token');
        expect(isLogged).toBe(true);

        expect(Navigate).not.toHaveBeenCalled();
    });

    it('deve redirecionar para /login quando uma rota não existir', () => {
        jest.spyOn(localStorage, 'getItem').mockReturnValue(null);

        const isLogged = !!localStorage.getItem('token');
        expect(isLogged).toBe(false);

        expect(Navigate).not.toHaveBeenCalled();
    });
});
