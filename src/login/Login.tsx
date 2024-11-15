import React, { useState } from 'react';
import { Button, Form, Input, Card, Alert, Image } from 'antd';
import { apiRequest } from '../utils/apiRequest';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const BASE_URL = process.env.REACT_APP_BASE_URL;

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
            const response = await apiRequest(BASE_URL + '/user/auth/login', 'POST', data);

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
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(to bottom, #B6DE83, #66bb6a)',
            fontFamily: 'Helvetica, Arial, sans-serif',
        }}>
            <Card
                style={{
                    width: 600,
                    height: '100vh',
                    backgroundColor: '#ffffff',
                    border: 'none',
                    borderRadius: 0, 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center', 
                }}
                headStyle={{
                    fontSize: '24px', 
                    fontWeight: 'bold',
                    color: '#000',
                    textAlign: 'center',
                }}
            >
                <Image
                    src={require('../assets/login-image.png')}
                    alt="Login Image"
                    preview={false}
                    style={{
                        width: '100%',
                        height: 'auto',
                        marginBottom: 20,
                    }}
                />
                <h2 style={{
                    fontFamily: 'Poppins, Helvetica, sans-serif',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#000',
                    textAlign: 'center',
                }}>Fazer login</h2>
                <h3 style={{
                    fontFamily: 'Poppins, Helvetica, sans-serif',
                    fontSize: '14px',
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
                                border: 'none',
                                color: '#000',
                                backgroundColor: '#e0e0e0',
                                boxShadow: 'none',
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
                                border: 'none',
                                color: '#000',
                                backgroundColor: '#e0e0e0',
                                boxShadow: 'none',
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
                                    fontFamily: 'Poppins, Helvetica, sans-serif',
                                    backgroundColor: '#B6DE83',
                                    borderColor: '#B6DE83',
                                    color: '#000',
                                    width: '48%',
                                }}
                            >
                                Entrar
                            </Button>
                            <Button
                                type="primary"
                                loading={loading}
                                onClick={() => window.location.href = '/register'}
                                style={{
                                    fontFamily: 'Poppins, Helvetica, sans-serif',
                                    backgroundColor: '#fff',
                                    borderColor: '#B6DE83',
                                    color: '#000',
                                    width: '48%',
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
