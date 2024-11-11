import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { message } from 'antd';
import VacancyForm from './VacancyForm';  // Ajuste o caminho de importação se necessário

// Mockando o fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: 'Tag 1' }, { id: 2, name: 'Tag 2' }]),
    ok: true,
  })
);

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  message: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('VacancyForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o formulário corretamente', async () => {
    render(<VacancyForm />);

    // Verificar se os campos do formulário são renderizados
    expect(screen.getByLabelText('Título')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição')).toBeInTheDocument();
    expect(screen.getByLabelText('Link de Cadastro')).toBeInTheDocument();
    expect(screen.getByLabelText('Tags')).toBeInTheDocument();
  });

  it('deve chamar o fetch e preencher as tags', async () => {
    render(<VacancyForm />);

    // Esperar que as tags sejam carregadas
    await waitFor(() => expect(screen.getByText('Tag 1')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Tag 2')).toBeInTheDocument());
  });

  it('deve exibir mensagem de sucesso ao enviar o formulário', async () => {
    render(<VacancyForm />);

    // Preencher o formulário
    fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Vaga de Desenvolvedor' } });
    fireEvent.change(screen.getByLabelText('Descrição'), { target: { value: 'Descrição da vaga' } });
    fireEvent.change(screen.getByLabelText('Link de Cadastro'), { target: { value: 'http://example.com' } });
    fireEvent.change(screen.getByLabelText('Tags'), { target: { value: [1] } });

    // Submeter o formulário
    fireEvent.click(screen.getByText('Cadastrar'));

    // Esperar pela mensagem de sucesso
    await waitFor(() => expect(message.success).toHaveBeenCalledWith('Vaga cadastrada com sucesso!'));
  });

  it('deve exibir mensagem de erro se o fetch falhar', async () => {
    // Simulando falha no fetch
    global.fetch.mockImplementationOnce(() => Promise.reject('Erro ao cadastrar vaga'));

    render(<VacancyForm />);

    // Preencher o formulário
    fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Vaga de Teste' } });
    fireEvent.change(screen.getByLabelText('Descrição'), { target: { value: 'Descrição de teste' } });
    fireEvent.change(screen.getByLabelText('Link de Cadastro'), { target: { value: 'http://example.com' } });
    fireEvent.change(screen.getByLabelText('Tags'), { target: { value: [1] } });

    // Submeter o formulário
    fireEvent.click(screen.getByText('Cadastrar'));

    // Esperar pela mensagem de erro
    await waitFor(() => expect(message.error).toHaveBeenCalledWith('Erro ao cadastrar vaga.'));
  });

  it('deve exibir erro se o título não for preenchido', async () => {
    render(<VacancyForm />);

    // Submeter o formulário sem preencher o título
    fireEvent.click(screen.getByText('Cadastrar'));

    // Esperar pelo erro de validação
    expect(await screen.findByText('Por favor, insira o título da vaga!')).toBeInTheDocument();
  });

  it('deve exibir erro se as tags não forem selecionadas', async () => {
    render(<VacancyForm />);

    // Submeter o formulário sem selecionar tags
    fireEvent.click(screen.getByText('Cadastrar'));

    // Esperar pelo erro de validação
    expect(await screen.findByText('Por favor, selecione ao menos uma tag!')).toBeInTheDocument();
  });
});
