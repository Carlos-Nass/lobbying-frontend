import React, { useEffect, useState } from 'react';
import { Steps, Button, Form, Radio, message } from 'antd';
import { questionsMock } from './Questions';

const { Step } = Steps;

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function PersonalityTest() {
    const [current, setCurrent] = useState(0);
    const [form] = Form.useForm();
    const [questions, setQuestions] = useState(questionsMock);
    const [answers, setAnswers] = useState<any>([]);

    const handleAnswerChange = (e) => {
        const updatedAnswers = [...answers];
        updatedAnswers[current] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const next = () => {
        if (!answers[current]) {
            message.error('Por favor, responda à pergunta antes de continuar.');
            return;
        }

        setCurrent((prev) => Math.min(prev + 1, questions.length - 1));
    };

    const prev = () => {
        setCurrent((prev) => Math.max(prev - 1, 0));
    };

    const onFinish = async () => {
        if (!answers[current]) {
            message.error('Por favor, responda à pergunta antes de continuar.');
            return;
        }

        const hasAwnsers = answers.some((answer) => answer !== null);
        if (!hasAwnsers) {
            message.error('Por favor, responda todas as questões.');
            return;
        }

        console.log('Respostas: ', answers);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
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
            const response = await fetch(BASE_URL + '/personality-test/generate-personality', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            message.success('Respostas enviadas com sucesso!');
        } catch (error) {
            message.error('Erro ao enviar as respostas.');
            console.error('Erro:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Steps current={current} style={{ marginBottom: '40px' }}>
                {questions.map((_, index) => (
                    <Step key={index} style={{ color: '#66bb6a', fontFamily: 'Poppins, Helvetica, sans-serif' }} />
                ))}
            </Steps>

            <Form form={form}>
                <h3 style={{ marginBottom: '24px', fontFamily: 'Poppins, Helvetica, sans-serif' }}>{questions[current].question}</h3>
                <Form.Item
                    name={`question-${current}`}
                    rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    style={{ marginBottom: '24px' }}
                >
                    <Radio.Group onChange={handleAnswerChange} value={answers[current]}>
                        {questions[current].options.map((option, index) => (
                            <Radio key={index} value={option} style={{ display: 'block', marginBottom: '8px', fontFamily: 'Poppins, Helvetica, sans-serif' }}>{option}</Radio>
                        ))}
                    </Radio.Group>
                </Form.Item>

                <div style={{ marginTop: '24px' }}>
                    {current < questions.length - 1 && (
                        <Button
                            type="primary"
                            onClick={next}
                            style={{ backgroundColor: '#66bb6a', borderColor: '#66bb6a', marginRight: '8px', fontFamily: 'Poppins, Helvetica, sans-serif' }}
                        >
                            Próximo
                        </Button>
                    )}
                    {current === questions.length - 1 && (
                        <Button
                            type="primary"
                            onClick={onFinish}
                            style={{ backgroundColor: '#66bb6a', borderColor: '#66bb6a', marginRight: '8px', fontFamily: 'Poppins, Helvetica, sans-serif' }}
                        >
                            Finalizar
                        </Button>
                    )}
                    {current > 0 && (
                        <Button
                            style={{ backgroundColor: '#fff', borderColor: '#B6DE83', fontFamily: 'Poppins, Helvetica, sans-serif' }}
                            onClick={prev}
                        >
                            Anterior
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    );
}
