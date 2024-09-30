import React, { useState } from 'react';
import { Button, Form, Input, Card, Alert } from 'antd';
import { apiRequest } from '../utils/apiRequest.ts';

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
            const response = await apiRequest('http://localhost:8080/user/auth/register', 'POST', data);

            setLoading(false);

            if (response.token) {
                console.log('Token recebido:', response.token);
            } else {
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
            backgroundColor: '#f0f0f0',
        }}>
            <Card
                title="Cadastro"
                style={{
                    width: 400,
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
                                borderColor: '#000',
                                color: '#000',
                                backgroundColor: '#f9f9f9',
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
                                borderColor: '#000',
                                color: '#000',
                                backgroundColor: '#f9f9f9',
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
                            Cadastrar
                        </Button>
                    </Form.Item>
                </Form>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    onClick={() => window.location.href = '/login'}
                    style={{
                        backgroundColor: '#000',
                        borderColor: '#000',
                        color: '#fff',
                    }}
                >
                    Login
                </Button>
            </Card>
        </div>
    );
}
