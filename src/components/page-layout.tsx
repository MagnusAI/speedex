import { Layout, Typography, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { LockOutlined } from '@ant-design/icons';

const { Content, Header, Footer } = Layout;

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return <Layout style={{ minHeight: '100vh', background: theme.colors.background }}>
        <PageHeader />
        <Content style={{
            padding: `${theme.spacing.xxl}px ${theme.spacing.xl}px`,
            marginTop: 64,
        }}>
            {children}
        </Content>
        <PageFooter />
    </Layout>
}

export function PageHeader() {
    const navigate = useNavigate();

    return <Header style={{
        background: theme.colors.primary,
        padding: `0 ${theme.spacing.xl}px`,
        position: 'fixed',
        width: '100%',
        zIndex: 1,
    }}>
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
            <Col>
                <Typography.Title level={3} style={{ color: theme.colors.lightText, margin: 0 }}>
                    Kennel Speedex
                </Typography.Title>
            </Col>
            <Col>
                <Row gutter={theme.spacing.md}>
                    <Col>
                        <Button 
                            type="link" 
                            onClick={() => navigate('/dogs')} 
                            style={{ color: theme.colors.lightText }}
                        >
                            Our Dogs
                        </Button>
                    </Col>
                    <Col>
                        <Button 
                            type="link" 
                            onClick={() => navigate('/login')} 
                            style={{ color: theme.colors.lightText }}
                            icon={<LockOutlined style={{ fontSize: '1.2rem' }} />}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    </Header>
}

export function PageFooter() {
    return <Footer style={{ 
        background: theme.colors.primary,
        color: theme.colors.lightText,
        textAlign: 'center',
        padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,
    }}>
        © {new Date().getFullYear()} Kennel Speedex. All rights reserved.
    </Footer>
}
