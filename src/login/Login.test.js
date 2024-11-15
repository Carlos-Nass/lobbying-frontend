import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Login } from './Login';
import { apiRequest } from '../utils/apiRequest';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

jest.mock('../utils/apiRequest');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../context/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('Login Component', () => {
  let setUser, setToken, navigate;

  beforeEach(() => {
    setUser = jest.fn();
    setToken = jest.fn();
    navigate = jest.fn();
    useUser.mockReturnValue({ setUser, setToken });
    useNavigate.mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
    expect(screen.getByText('Cadastro')).toBeInTheDocument();
  });

  test('shows error message if login fails', async () => {
    apiRequest.mockRejectedValue(new Error('Login failed'));

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao enviar as respostas.')).toBeInTheDocument();
    });
  });

  test('navigates to home on successful login', async () => {
    const response = { token: 'fake-token', id: 1, email: 'test@example.com' };
    apiRequest.mockResolvedValue(response);

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith(response);
      expect(setToken).toHaveBeenCalledWith(response.token);
      expect(navigate).toHaveBeenCalledWith('/home');
    });
  });

  test('navigates to register if no token is received', async () => {
    const response = {};
    apiRequest.mockResolvedValue(response);

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('E-mail'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/register');
    });
  });
});
