const { useEffect } = require('react');
const { useUser } = require('./context/UserContext');
const { PrivateRoute } = require('./PrivateRouter');

jest.mock('./context/UserContext', () => ({
  useUser: jest.fn(),
}));

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

describe('PrivateRoute', () => {
  it('deve definir o usuário e o token do localStorage quando ambos estão presentes', () => {
    const setUserMock = jest.fn();
    const setTokenMock = jest.fn();
    useUser.mockReturnValue({
      setUser: setUserMock,
      setToken: setTokenMock,
      token: 'mockToken',
    });

    jest.spyOn(localStorage, 'getItem').mockImplementation((key) => {
      if (key === 'token') return 'mockToken';
      if (key === 'user') return JSON.stringify({ id: 1, name: 'User' });
      return null;
    });

    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserMock(JSON.parse(storedUser));
    }
    if (storedToken) {
      setTokenMock(storedToken);
    }

    expect(setUserMock).toHaveBeenCalledWith({ id: 1, name: 'User' });
    expect(setTokenMock).toHaveBeenCalledWith('mockToken');
  });
});
