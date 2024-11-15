import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Vagas from './Vagas';
import { act } from 'react-dom/test-utils';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        id: 1,
        title: 'Desenvolvedor Frontend',
        description: 'Vaga para desenvolvedor frontend com experiência em React.',
        tags: [{ label: 'React' }, { label: 'JavaScript' }],
        createdAt: '2023-11-15',
        urlForm: 'http://example.com/form'
      }
    ]),
  })
);

describe('Vagas Component', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('user', JSON.stringify({ id: 1 }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading spinner initially', () => {
    render(<Vagas />);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  test('renders vacancies after loading', async () => {
    await act(async () => {
      render(<Vagas />);
    });

    await waitFor(() => {
      expect(screen.getByText('Desenvolvedor Frontend')).toBeInTheDocument();
      expect(screen.getByText('Vaga para desenvolvedor frontend com experiência em React.')).toBeInTheDocument();
      expect(screen.getByText('Tags: React, JavaScript')).toBeInTheDocument();
      expect(screen.getByText('Data de Criação: 15/11/2023')).toBeInTheDocument();
      expect(screen.getByText('URL do Formulário:')).toBeInTheDocument();
    });
  });

  test('handles pagination correctly', async () => {
    await act(async () => {
      render(<Vagas />);
    });

    await waitFor(() => {
      expect(screen.getByText('Desenvolvedor Frontend')).toBeInTheDocument();
    });

    // Simulate page change
    act(() => {
      screen.getByRole('button', { name: /2/i }).click();
    });

    // Verify that the content changes accordingly
    await waitFor(() => {
      expect(screen.queryByText('Desenvolvedor Frontend')).not.toBeInTheDocument();
    });
  });
});
