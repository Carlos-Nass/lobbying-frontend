import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Register } from './Register';
import { apiRequest } from '../utils/apiRequest';

jest.mock('../utils/apiRequest');

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders registration form', () => {
    render(<Register />);
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Sobrenome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirmar Senha')).toBeInTheDocument();
    expect(screen.getByText('Cadastro')).toBeInTheDocument();
  });

  test('shows error message if registration fails', async () => {
    apiRequest.mockRejectedValue(new Error('Registration failed'));

    render(<Register />);
    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Sobrenome'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirmar Senha'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Cadastro'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao enviar as respostas.')).toBeInTheDocument();
    });
  });

  test('shows success message on successful registration', async () => {
    const response = { token: 'fake-token' };
    apiRequest.mockResolvedValue(response);

    render(<Register />);
    fireEvent.change(screen.getByPlaceholderText('Nome'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Sobrenome'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Senha'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirmar Senha'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Cadastro'));

    await waitFor(() => {
      expect(screen.getByText('Respostas enviadas com sucesso!')).toBeInTheDocument();
    });
  });
});
