import React, { useState, useEffect } from 'react';
import { Card, Spin, Pagination } from 'antd';
const { Meta } = Card;

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Vagas = () => {
    const [loading, setLoading] = useState(true);
    const [vacancies, setVacancies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchVacancies = async () => {
            setLoading(true);

            try {
                const token = localStorage.getItem('token');
                const user: any = JSON.parse(localStorage.getItem('user') || '{}');
                const userId = user.id;

                const response = await fetch(BASE_URL + '/vacancy/load-vacancys-by-tags?userId=' + userId, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                setVacancies(data);
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

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentVacancies = vacancies.slice(startIndex, endIndex);

    return (
        <div style={{ padding: '20px', fontFamily: 'Poppins, Helvetica, sans-serif' }}>
            <h1>Vagas</h1>
            {loading ? (
                <Spin tip="Carregando..." />
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontFamily: 'Poppins, Helvetica, sans-serif' }}>
                    {currentVacancies.map((vacancy: any) => (
                        <Card
                            key={vacancy.id}
                            hoverable
                            style={{ width: 400, borderColor: '#B6DE83', borderWidth: '2px', borderStyle: 'solid', fontFamily: 'Poppins, Helvetica, sans-serif' }}
                        >
                            <Meta
                                title={vacancy.title}
                                description={
                                    <div>
                                        <p>{vacancy.description}</p>
                                        <p style={{ fontSize: 10 }}>Tags: {vacancy.tags.map(tag => tag.label).join(', ')}</p>
                                        <p>Data de Criação: {vacancy.createdAt.split("-").reverse().join("/")}</p>
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
                total={vacancies.length}
                onChange={handlePageChange}
                style={{ marginTop: '20px' }}
            />
        </div>
    );
};

export default Vagas;
