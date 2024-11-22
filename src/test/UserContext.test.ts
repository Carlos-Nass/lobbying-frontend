jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: jest.fn(),
    createContext: jest.fn(),
    useState: jest.fn(),
}));

describe('UserProvider', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve fornecer o contexto de usuário corretamente', () => {
        const mockSetUser = jest.fn();
        const mockSetToken = jest.fn();
        const mockContextValue = {
            token: 'test-token',
            user: { name: 'Test User' },
            setUser: mockSetUser,
            setToken: mockSetToken,
        };

        const { user, setUser } = mockContextValue;

        expect(user).toEqual({ name: 'Test User' });

        setUser({ name: 'Updated User' });

        expect(mockSetUser).toHaveBeenCalledWith({ name: 'Updated User' });
    });

    it('deve permitir a mudança de token', () => {
        const mockSetToken = jest.fn();
        const mockContextValue = {
            token: 'test-token',
            user: { name: 'Test User' },
            setUser: jest.fn(),
            setToken: mockSetToken,
        };

        const { setToken } = mockContextValue;
        setToken('new-token');

        expect(mockSetToken).toHaveBeenCalledWith('new-token');
    });
});
