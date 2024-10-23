import React, { useState } from 'react';
import { Button, Form, Input, Card, Alert, Image } from 'antd';
import { apiRequest } from '../utils/apiRequest.ts';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.tsx';
import loginImage from '../assets/login-image.jpg';

export function Login() {

    const { setUser, setToken } = useUser();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate  = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);

        const data = {
            email: values.email,
            password: values.password,
        };

        try {
            const response = await apiRequest('http://localhost:8080/user/auth/login', 'POST', data);

            setLoading(false);

            if(response.token) {
                localStorage.setItem('user', JSON.stringify(response));
                localStorage.setItem('token', response.token);

                setUser(response);
                setToken(response.token);
                navigate('/home');
            } else {
                navigate('/register');
            }
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end', // Alinha o card à direita
            alignItems: 'center', // Centraliza verticalmente
            height: '100vh',
            background: 'linear-gradient(to bottom, #B6DE83, #66bb6a)', // Fundo verde claro gradiente
            fontFamily: 'Helvetica, Arial, sans-serif', // Fonte Helvetica
        }}>
            <Card
                style={{
                    width: 600,
                    height: '100vh', // Faz o card preencher de cima a baixo
                    backgroundColor: '#ffffff',
                    border: 'none', // Sem bordas visíveis
                    borderRadius: 0, // Remove bordas arredondadas para preencher de cima a baixo
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para destacar o card
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Centraliza o conteúdo verticalmente dentro do card
                    alignItems: 'center', // Centraliza o conteúdo horizontalmente dentro do card
                }}
                headStyle={{
                    fontSize: '24px', // Aumenta o tamanho do título
                    fontWeight: 'bold',
                    color: '#000',
                    textAlign: 'center',
                }}
            >
                <Image
                    src={loginImage} // Use a imagem importada
                    alt="Login Image"
                    preview={false} // Desativa o preview
                    style={{
                        width: '100%',
                        height: 'auto',
                        marginBottom: 20,
                    }}
                />
                <h2 style={{
                    fontSize: '24px', // Aumenta o tamanho do título
                    fontWeight: 'bold',
                    color: '#000',
                    textAlign: 'center',
                }}>Fazer login</h2>
                <h3 style={{
                    fontSize: '14px', // Subtítulo
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}>Entre com seu e-mail e senha</h3>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    {error && (
                        <Alert
                            message={error}
                            type="error"
                            showIcon
                            style={{
                                marginBottom: 16,
                                backgroundColor: '#fff',
                                border: '1px solid #ff4d4f',
                                color: '#ff4d4f'
                            }}
                        />
                    )}

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Por favor, insira seu e-mail!' }]}
                    >
                        <Input
                            placeholder="E-mail"
                            style={{
                                border: 'none', // Remove as bordas
                                color: '#000',
                                backgroundColor: '#e0e0e0', // Cinza um pouco mais escuro que o branco
                                boxShadow: 'none', // Remove as sombras
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
                    >
                        <Input.Password
                            placeholder="Senha"
                            style={{
                                border: 'none', // Remove as bordas
                                color: '#000',
                                backgroundColor: '#e0e0e0', // Cinza um pouco mais escuro que o branco
                                boxShadow: 'none', // Remove as sombras
                            }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{
                                    backgroundColor: '#B6DE83', // Cor verde claro
                                    borderColor: '#B6DE83',
                                    color: '#000',
                                    width: '48%', // Ajusta a largura para caber dois botões lado a lado
                                }}
                            >
                                Entrar
                            </Button>
                            <Button
                                type="primary"
                                loading={loading}
                                onClick={() => window.location.href = '/register'}
                                style={{
                                    backgroundColor: '#B6DE83', // Cor verde claro
                                    borderColor: '#B6DE83',
                                    color: '#000',
                                    width: '48%', // Ajusta a largura para caber dois botões lado a lado
                                }}
                            >
                                Cadastro
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};
