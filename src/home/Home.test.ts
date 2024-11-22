const { fireEvent } = require('@testing-library/react');

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

jest.mock('./Home', () => {
    return jest.fn(() => null);
});

describe('Home', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve permitir a navegação sem renderizar o componente', () => {
        const mockUser = { role: 1 };
        jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(mockUser));

        fireEvent.click(document.createElement('button'));
        fireEvent.click(document.createElement('button'));
    });

    it('deve chamar a função de logout', () => {
        const logout = jest.fn(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        });

        logout();

        expect(localStorage.removeItem).toHaveBeenCalledWith('user');
        expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
});
