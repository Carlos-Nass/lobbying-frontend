import React, { useState } from 'react';
import { Button, Form, Input, Card, Alert } from 'antd';
import { apiRequest } from '../utils/apiRequest.ts';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext.tsx';

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
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0'
        }}>
            <Card
                title="Login"
                style={{
                    width: 300,
                    backgroundColor: '#ffffff',
                    border: '1px solid #000',
                    borderRadius: 10,
                }}
                headStyle={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#000',
                    textAlign: 'center',
                }}
            >
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
                        rules={[{ required: true, message: 'Por favor, insira seu usuário!' }]}
                    >
                        <Input
                            placeholder="Usuário"
                            style={{
                                borderColor: '#000',
                                color: '#000',
                                backgroundColor: '#f9f9f9',
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
                                borderColor: '#000',
                                color: '#000',
                                backgroundColor: '#f9f9f9',
                            }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            block
                            style={{
                                backgroundColor: '#000',
                                borderColor: '#000',
                                color: '#fff',
                            }}
                        >
                            Entrar
                        </Button>
                    </Form.Item>
                </Form>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    onClick={() => window.location.href = '/register'}
                    style={{
                        backgroundColor: '#000',
                        borderColor: '#000',
                        color: '#fff',
                    }}
                >
                    Cadastro
                </Button>
            </Card>
        </div>
    );
};
