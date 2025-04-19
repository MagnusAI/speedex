import { Layout, Typography, Row, Col, Button } from 'antd';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

export default function AppBar() {
    const navigate = useNavigate();

    return <Header style={{
        background: theme.colors.primary,
        padding: `0 ${theme.spacing.xl}px`,
        position: 'fixed',
        width: '100%',
        zIndex: 1,
    }
    }>
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
            <Col>
                <Typography.Title level={3} style={{ color: theme.colors.lightText, margin: 0 }}>
                    Kennel Speedex
                </Typography.Title>
            </Col>
            < Col >
                <Button type="link" onClick={() => navigate('/dogs')} style={{ color: theme.colors.lightText }}>
                    Our Dogs
                </Button>
            </Col>
        </Row>
    </Header>
}
