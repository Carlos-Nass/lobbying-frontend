import React, { useEffect, useState } from 'react';
import { Card, Pagination, Spin } from 'antd';

const { Meta } = Card;

export default function Vacancys() {
    const [vacancies, setVacancies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalVacancies, setTotalVacancies] = useState(0);
    const itemsPerPage = 20;

    useEffect(() => {
        const fetchVacancies = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const user: any = JSON.parse(localStorage.getItem('user') || '{}');
                const userId = user.id;

                const response = await fetch('http://localhost:8080/vacancy/load-vacancys-by-tags?userId=' + userId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                setVacancies(data);
                setTotalVacancies(data.length);
            } catch (error) {
                console.error('Erro ao buscar vagas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVacancies();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const currentVacancies: any = vacancies?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Vagas</h1>
            {loading ? (
                <Spin tip="Carregando..." />
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {currentVacancies.map((vacancy) => (
                        <Card
                            key={vacancy.id}
                            hoverable
                            style={{ width: 240 }}
                        >
                            <Meta
                                title={vacancy.title}
                                description={
                                    <div>
                                        <p>{vacancy.description}</p>
                                        <p>Tags: {vacancy.tags.map(tag => tag.label).join(', ')}</p>
                                        <p>Data de Criação: {new Date(vacancy.createdAt).toLocaleDateString()}</p>
                                        <p>
                                            URL do Formulário:
                                            <a href={vacancy.urlForm} target="_blank" rel="noopener noreferrer">
                                                {vacancy.urlForm}
                                            </a>
                                        </p>
                                    </div>
                                }
                            />
                        </Card>
                    ))}
                </div>
            )}
            <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={totalVacancies}
                onChange={handlePageChange}
                style={{ marginTop: '20px' }}
            />
        </div>
    );
}
