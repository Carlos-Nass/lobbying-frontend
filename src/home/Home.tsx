import React, { useState } from "react";
import { Button, Layout, Menu, Image } from "antd";
import PersonalityTest from "../personalityTEst/PersonalityTest";
import VisualizarVagas from "../vacancys/Vacancys";
import VacancyForm from "../vacancys/create/VacancyForm";

const { Sider, Content } = Layout;

export function Home() {
    const [currentComponent, setCurrentComponent] = useState("default");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const role = Number(user.role);
    const isAdmin = role === 1;

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.reload();
    };

    const handleMenuClick = (e) => {
        setCurrentComponent(e.key);
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case "teste-de-personalidade":
                return <PersonalityTest />;
            case "visualizar-vagas":
                return <VisualizarVagas />;
            case "cadastro-vagas":
                return <VacancyForm />;
            default:
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontFamily: 'Poppins, Helvetica, sans-serif' }}>
                        <h2>Bem-vindo! Realize o teste de personalidade para ver as vagas disponíveis.</h2>
                    </div>
                );
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #B6DE83, #66bb6a)' }}>
            <Sider width={350} style={{ background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '3px solid #B6DE83' }}>
                <div>
                    <div style={{ padding: '16px', textAlign: 'center' }}>
                        <Image
                            src={require('../assets/login-image.png')}
                            alt="Logo"
                            preview={false}
                            style={{ width: '100%', height: 'auto', borderBottom: '1px solid #000' }}
                        />
                    </div>
                    <Menu
                        mode="inline"
                        selectedKeys={[currentComponent]}
                        style={{ background: '#fff', color: '#000', fontFamily: 'Poppins, Helvetica, sans-serif' }}
                        onClick={handleMenuClick}
                    >
                        <Menu.Item key="teste-de-personalidade" style={{ background: currentComponent === "teste-de-personalidade" ? '#B6DE83' : 'inherit', color: '#000', fontFamily: 'Poppins, Helvetica, sans-serif' }}>
                            Teste de Personalidade
                        </Menu.Item>
                        <Menu.Item key="visualizar-vagas" style={{ background: currentComponent === "visualizar-vagas" ? '#B6DE83' : 'inherit', color: '#000', fontFamily: 'Poppins, Helvetica, sans-serif' }}>
                            Visualizar Vagas
                        </Menu.Item>
                        {isAdmin && (
                            <Menu.Item key="cadastro-vagas" style={{ background: currentComponent === "cadastro-vagas" ? '#B6DE83' : 'inherit', color: '#000', fontFamily: 'Poppins, Helvetica, sans-serif' }}>
                                Cadastrar Vagas
                            </Menu.Item>
                        )}
                    </Menu>
                </div>
                <div style={{ padding: '16px', position: 'absolute', bottom: '20px', width: '100%' }}>
                    <Button onClick={logout} style={{ width: '90%', backgroundColor: '#B6DE83', borderColor: '#B6DE83', color: '#000', marginLeft: '5%', fontFamily: 'Poppins, Helvetica, sans-serif' }}>
                        Logout
                    </Button>
                </div>
            </Sider>
            <Layout>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {renderComponent()}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
