import React from 'react';
import { Layout, Typography, Row, Col, Card, Button } from 'antd';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout style={{ minHeight: '100vh', background: theme.colors.background }}>
            <Header style={{
                background: theme.colors.primary,
                padding: `0 ${theme.spacing.xl}px`,
                position: 'fixed',
                width: '100%',
                zIndex: 1,
            }}>
                <Row justify="space-between" align="middle" style={{ height: '100%' }}>
                    <Col>
                        <Title level={3} style={{ color: theme.colors.lightText, margin: 0 }}>
                            Terrier Kennel
                        </Title>
                    </Col>
                    <Col>
                        <Button type="link" onClick={() => navigate('/dogs')} style={{ color: theme.colors.lightText }}>
                            Our Dogs
                        </Button>
                    </Col>
                </Row>
            </Header>

            <Content style={{
                padding: `${theme.spacing.xxl}px ${theme.spacing.xl}px`,
                marginTop: 64,
            }}>
                {/* Hero Section */}
                <Row gutter={[theme.spacing.xl, theme.spacing.xl]} style={{ marginBottom: theme.spacing.xxl }}>
                    <Col xs={24} lg={12}>
                        <Title level={1} style={{ color: theme.colors.text }}>
                            Welcome to Our Terrier Family
                        </Title>
                        <Paragraph style={{ fontSize: '1.2rem', color: theme.colors.text }}>
                            Specializing in Jack Russell and Norfolk Terriers, we breed healthy,
                            friendly family dogs in a loving home environment while maintaining
                            excellence in competition standards.
                        </Paragraph>
                        <Button type="primary" size="large">
                            Learn More About Our Dogs
                        </Button>
                    </Col>
                    <Col xs={24} lg={12}>
                        {/* Hero image will go here */}
                        <div style={{
                            height: '400px',
                            background: theme.colors.secondary,
                            borderRadius: '8px',
                        }} />
                    </Col>
                </Row>

                {/* Breeds Section */}
                <Row gutter={[theme.spacing.xl, theme.spacing.xl]}>
                    <Col xs={24} md={12}>
                        <Card
                            hoverable
                            cover={
                                <div style={{
                                    height: '200px',
                                    background: theme.colors.secondary,
                                }} />
                            }
                        >
                            <Card.Meta
                                title="Jack Russell Terriers"
                                description="Energetic, intelligent, and full of character, our Jack Russells are perfect family companions."
                            />
                        </Card>
                    </Col>
                    <Col xs={24} md={12}>
                        <Card
                            hoverable
                            cover={
                                <div style={{
                                    height: '200px',
                                    background: theme.colors.secondary,
                                }} />
                            }
                        >
                            <Card.Meta
                                title="Norfolk Terriers"
                                description="Loyal, affectionate, and adaptable, our Norfolk Terriers bring joy to every home."
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Achievements Section */}
                <Row style={{ marginTop: theme.spacing.xxl }}>
                    <Col span={24}>
                        <Title level={2} style={{ textAlign: 'center', color: theme.colors.text }}>
                            Our Achievements
                        </Title>
                        <Paragraph style={{ textAlign: 'center', fontSize: '1.1rem' }}>
                            Proud participants in national and international terrier competitions
                        </Paragraph>
                        {/* Achievement cards will go here */}
                    </Col>
                </Row>
            </Content>

            <Footer style={{
                textAlign: 'center',
                background: theme.colors.primary,
                color: theme.colors.lightText,
                padding: `${theme.spacing.xl}px`,
            }}>
                Terrier Kennel ©{new Date().getFullYear()} - All Rights Reserved
            </Footer>
        </Layout>
    );
};

export default Home; 