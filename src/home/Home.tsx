import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import PersonalityTest from "../personalityTEst/PersonalityTest.tsx"
import VisualizarVagas from "../vacancys/Vacancys.tsx";
import VacancyForm from "../vacancys/create/VacancyForm.tsx";

const { Header, Sider, Content } = Layout;

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
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    selectedKeys={[currentComponent]}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={handleMenuClick}
                >
                    <Menu.Item key="teste-de-personalidade">Teste de Personalidade</Menu.Item>
                    <Menu.Item key="visualizar-vagas">Visualizar Vagas</Menu.Item>
                    {isAdmin && <Menu.Item key="cadastro-vagas">Cadastrar Vagas</Menu.Item>}
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Button onClick={logout} style={{ float: 'right', margin: '16px' }}>
                        Logout
                    </Button>
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {renderComponent()}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
