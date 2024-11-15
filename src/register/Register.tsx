import React, { useState } from 'react';
import { Button, Form, Input, Card, Alert } from 'antd';
import { apiRequest } from '../utils/apiRequest';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export function Register() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);

        const data = {
            name: values.name,
            surname: values.surname,
            email: values.email,
            password: values.password,
            role: 1
        };

        try {
            const response = await apiRequest(BASE_URL +  '/user/auth/register', 'POST', data);

            setLoading(false);

            if (response.token) {
                console.log('Token recebido:', response.token);
                setSuccess(null)
            } else {
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
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#000',
                    textAlign: 'center',
                }}>Cadastro</h2>
                <h3 style={{
                    fontSize: '14px',
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}>Preencha os campos abaixo para se cadastrar</h3>
                <Form
                    name="cadastro"
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

                    {success && (
                        <Alert
                            message={success}
                            type="success"
                            showIcon
                            style={{
                                marginBottom: 16,
                                backgroundColor: '#f6ffed',
                                border: '1px solid #b7eb8f',
                                color: '#52c41a'
                            }}
                        />
                    )}

                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Por favor, insira seu nome!' }]}
                    >
                        <Input
                            placeholder="Nome"
                            style={{
                                border: 'none',
                                color: '#000',
                                backgroundColor: '#e0e0e0',
                                boxShadow: 'none',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="surname"
                        rules={[{ required: true, message: 'Por favor, insira seu sobrenome!' }]}
                    >
                        <Input
                            placeholder="Sobrenome"
                            style={{
                                border: 'none',
                                color: '#000',
                                backgroundColor: '#e0e0e0',
                                boxShadow: 'none',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, type: 'email', message: 'Por favor, insira um email válido!' }]}
                    >
                        <Input
                            placeholder="Email"
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

                    <Form.Item
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Por favor, confirme sua senha!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('As senhas não combinam!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Confirmar Senha"
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
                                Cadastrar
                            </Button>
                            <Button
                                type="primary"
                                loading={loading}
                                onClick={() => window.location.href = '/login'}
                                style={{
                                    fontFamily: 'Poppins, Helvetica, sans-serif',
                                    backgroundColor: '#fff',
                                    borderColor: '#B6DE83',
                                    color: '#000',
                                    width: '48%', 
                                }}
                            >
                                Voltar
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
