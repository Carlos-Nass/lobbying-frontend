import React, { useEffect, useState } from 'react';
import { Steps, Button, Form, Radio, message } from 'antd';
import { questionsMock } from './Questions.ts';

const { Step } = Steps;

export default function PersonalityTest() {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [questions, setQuestions] = useState(questionsMock);
    const [answers, setAnswers] = useState([]);

    const next = () => {
        form.validateFields().then(values => {
            const updatedAnswers: any = [...answers];
            updatedAnswers[current] = values[`question-${current}`];
            setAnswers(updatedAnswers);
            setCurrent(prev => Math.min(prev + 1, questions.length - 1));
        }).catch(info => {
            message.error('Por favor, responda à pergunta antes de continuar.');
        });
    };

    const prev = () => {
        setCurrent(prev => Math.max(prev - 1, 0));
    };

    const onFinish = async () => {
        message.success('Todas as respostas foram enviadas!');
        console.log('Respostas: ', answers);
        const user: any = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user.id;

        const payload = {
            userId: userId,
            questions: questions.map((question, index) => ({
                question: question.question,
                answer: answers[index] || null
            }))
        };

        console.log('Payload:', payload);
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8080/api/personality-test/generate-personality', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            message.success('Respostas enviadas com sucesso!');
            console.log('Resultado: ', result);
        } catch (error) {
            message.error('Erro ao enviar as respostas.');
            console.error('Erro:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Steps current={current} style={{ marginBottom: '20px' }}>
                {questions.map((_, index) => (
                    <Step key={index} />
                ))}
            </Steps>

            <Form form={form} onFinish={onFinish}>
                <h3>{questions[current].question}</h3>
                <Form.Item
                    name={`question-${current}`}
                    rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                >
                    <Radio.Group>
                        {questions[current].options.map((option, index) => (
                            <Radio key={index} value={option}>{option}</Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <div style={{ marginTop: '20px' }}>
                    {current < questions.length - 1 && (
                        <Button type="primary" onClick={next}>
                            Próximo
                        </Button>
                    )}
                    {current === questions.length - 1 && (
                        <Button type="primary" htmlType="submit">
                            Finalizar
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={prev}>
                            Anterior
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    );
}
