import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';

const { Option } = Select;

export default function VacancyForm() {
    const [tags, setTags] = useState<any[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:8080/tag', {
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
            creationDate: values.creationDate.format('YYYY-MM-DD'),
            tagIds: values.tags.map(tagId => tagId),
            urlForm: values.urlForm
        };

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8080/vacancy', {
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
        <div style={{ padding: '20px' }}>
            <h1>Cadastrar Vaga</h1>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="title"
                    label="Título"
                    rules={[{ required: true, message: 'Por favor, insira o título da vaga!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Descrição"
                    rules={[{ required: true, message: 'Por favor, insira a descrição da vaga!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="creationDate"
                    label="Data de Criação"
                    rules={[{ required: true, message: 'Por favor, selecione a data de criação!' }]}
                >
                    <DatePicker />
                </Form.Item>

                <Form.Item
                    name="urlForm"
                    label="Link de Cadastro"
                    rules={[{ required: true, message: 'Por favor, insira uma URL' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="tags"
                    label="Tags"
                    rules={[{ required: true, message: 'Por favor, selecione ao menos uma tag!' }]}
                >
                    <Select mode="multiple" placeholder="Selecione as tags">
                        {tags.map(tag => (
                            <Option key={tag.id} value={tag.id}>
                                {tag.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cadastrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
