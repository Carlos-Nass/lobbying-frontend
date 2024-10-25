import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function VacancyForm() {
    const [tags, setTags] = useState<any[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch(BASE_URL + '/tag', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar tags');
                }

                const data = await response.json();
                setTags(data);
            } catch (error) {
                console.error('Erro ao buscar tags:', error);
            }
        };

        fetchTags();
    }, []);

    const onFinish = async (values) => {
        const payload = {
            title: values.title,
            description: values.description,
            tagIds: values.tags.map(tagId => tagId),
            urlForm: values.urlForm
        };

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(BASE_URL + '/vacancy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            message.success('Vaga cadastrada com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar vaga:', error);
            message.error('Erro ao cadastrar vaga.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Poppins, Helvetica, sans-serif' }}>
            <h1>Cadastrar Vaga</h1>
            <Form form={form} onFinish={onFinish} layout="vertical" style={{ fontFamily: 'Poppins, Helvetica, sans-serif' }}>
                <Form.Item
                    name="title"
                    label={<span style={{ fontFamily: 'Poppins, Helvetica, sans-serif'}}>Título</span>}
                    rules={[{ required: true, message: 'Por favor, insira o título da vaga!' }]}
                >
                    <Input style={{ fontFamily: 'Poppins, Helvetica, sans-serif' }} />
                </Form.Item>

                <Form.Item
                    name="description"
                    label={<span style={{ fontFamily: 'Poppins, Helvetica, sans-serif'}}>Descrição</span>}
                    rules={[{ required: true, message: 'Por favor, insira a descrição da vaga!' }]}
                >
                    <Input.TextArea rows={4} style={{ fontFamily: 'Poppins, Helvetica, sans-serif' }} />
                </Form.Item>

                <Form.Item
                    name="urlForm"
                    label={<span style={{ fontFamily: 'Poppins, Helvetica, sans-serif'}}>Link de Cadastro</span>}
                    rules={[{ required: true, message: 'Por favor, insira uma URL' }]}
                >
                    <Input style={{ fontFamily: 'Poppins, Helvetica, sans-serif' }} />
                </Form.Item>

                <Form.Item
                    name="tags"
                    label={<span style={{ fontFamily: 'Poppins, Helvetica, sans-serif'}}>Tags</span>}
                    rules={[{ required: true, message: 'Por favor, selecione ao menos uma tag!' }]}
                >
                    <Select mode="multiple" placeholder="Selecione as tags" style={{ fontFamily: 'Poppins, Helvetica, sans-serif' }}>
                        {tags.map(tag => (
                            <Option key={tag.id} value={tag.id}>
                                {tag.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ backgroundColor: '#66bb6a', borderColor: '#66bb6a', fontFamily: 'Poppins, Helvetica, sans-serif' }}>
                        Cadastrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
