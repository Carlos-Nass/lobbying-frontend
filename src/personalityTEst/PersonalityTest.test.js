import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersonalityTest from './PersonalityTest';
import { questionsMock } from './Questions';

jest.mock('./Questions', () => ({
  questionsMock: [
    {
      question: 'Question 1?',
      options: ['Option 1', 'Option 2', 'Option 3'],
    },
    {
      question: 'Question 2?',
      options: ['Option A', 'Option B', 'Option C'],
    },
  ],
}));

describe('PersonalityTest Component', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ id: 1 }));
    localStorage.setItem('token', 'fake-token');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the first question initially', () => {
    render(<PersonalityTest />);
    expect(screen.getByText('Question 1?')).toBeInTheDocument();
  });

  test('shows error message if next is clicked without selecting an answer', () => {
    render(<PersonalityTest />);
    fireEvent.click(screen.getByText('Próximo'));
    expect(screen.getByText('Por favor, responda à pergunta antes de continuar.')).toBeInTheDocument();
  });

  test('moves to the next question when an answer is selected and next is clicked', () => {
    render(<PersonalityTest />);
    fireEvent.click(screen.getByLabelText('Option 1'));
    fireEvent.click(screen.getByText('Próximo'));
    expect(screen.getByText('Question 2?')).toBeInTheDocument();
  });

  test('shows error message if finish is clicked without answering the last question', () => {
    render(<PersonalityTest />);
    fireEvent.click(screen.getByLabelText('Option 1'));
    fireEvent.click(screen.getByText('Próximo'));
    fireEvent.click(screen.getByText('Finalizar'));
    expect(screen.getByText('Por favor, responda à pergunta antes de continuar.')).toBeInTheDocument();
  });

  test('submits answers and shows success message on finish', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );

    render(<PersonalityTest />);
    fireEvent.click(screen.getByLabelText('Option 1'));
    fireEvent.click(screen.getByText('Próximo'));
    fireEvent.click(screen.getByLabelText('Option A'));
    fireEvent.click(screen.getByText('Finalizar'));

    await waitFor(() => {
      expect(screen.getByText('Respostas enviadas com sucesso!')).toBeInTheDocument();
    });
  });

  test('shows error message on submission failure', async () => {
    global.fetch = jest.fn(() => Promise.reject('API is down'));

    render(<PersonalityTest />);
    fireEvent.click(screen.getByLabelText('Option 1'));
    fireEvent.click(screen.getByText('Próximo'));
    fireEvent.click(screen.getByLabelText('Option A'));
    fireEvent.click(screen.getByText('Finalizar'));

    await waitFor(() => {
      expect(screen.getByText('Erro ao enviar as respostas.')).toBeInTheDocument();
    });
  });
});
