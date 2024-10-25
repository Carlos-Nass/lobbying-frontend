import React, { useState } from "react";
import { Button, Layout, Menu, Image } from "antd";
import PersonalityTest from "../personalityTEst/PersonalityTest.tsx";
import VisualizarVagas from "../vacancys/Vacancys.tsx";
import VacancyForm from "../vacancys/create/VacancyForm.tsx";
import logo from '../assets/login-image.png'; // Importe a imagem

const { Sider, Content } = Layout;

export function Home() {
    const [currentComponent, setCurrentComponent] = useState("teste-de-personalidade");
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
                return <h2>Bem-vindo! Selecione um teste no menu.</h2>;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #B6DE83, #66bb6a)' }}>
            <Sider width={200} style={{ background: '#66bb6a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ padding: '16px', textAlign: 'center' }}>
                        <Image
                            src={logo} // Use a imagem importada
                            alt="Logo"
                            preview={false} // Desativa o preview
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                    <Menu
                        mode="inline"
                        selectedKeys={[currentComponent]}
                        style={{ background: '#66bb6a', color: '#000' }}
                        onClick={handleMenuClick}
                    >
                        <Menu.Item key="teste-de-personalidade" style={{ background: currentComponent === "teste-de-personalidade" ? '#B6DE83' : 'inherit', color: '#000' }}>Teste de Personalidade</Menu.Item>
                        <Menu.Item key="visualizar-vagas" style={{ background: currentComponent === "visualizar-vagas" ? '#B6DE83' : 'inherit', color: '#000' }}>Visualizar Vagas</Menu.Item>
                        {isAdmin && <Menu.Item key="cadastro-vagas" style={{ background: currentComponent === "cadastro-vagas" ? '#B6DE83' : 'inherit', color: '#000' }}>Cadastrar Vagas</Menu.Item>}
                    </Menu>
                </div>
                <Button onClick={logout} style={{ margin: '16px', backgroundColor: '#B6DE83', borderColor: '#B6DE83', color: '#000', alignSelf: 'flex-end' }}>
                    Logout
                </Button>
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
