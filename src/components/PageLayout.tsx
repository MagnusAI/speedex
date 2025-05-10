import { Layout, Typography, Menu, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { LockOutlined, UnlockOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const { Content, Header, Footer } = Layout;
const { Title, Text } = Typography;

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return <Layout style={{ minHeight: '100vh', background: theme.colors.background }}>
        <PageHeader />
        <Content style={{
            padding: `${theme.spacing.xxl}px ${theme.spacing.md}px`,
            marginTop: 64,
        }}>
            {children}
        </Content>
        <Footer style={{
            background: theme.colors.primary,
            color: theme.colors.lightText,
            textAlign: 'center',
            padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,
        }}>
            <Text style={{ color: theme.colors.lightText }}>
                © {new Date().getFullYear()} Kennel Speedex. All rights reserved.
            </Text>
        </Footer>
    </Layout>
}

export function PageHeader() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };

        checkAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const menuItems = [
        {
            key: 'posts',
            label: 'Posts',
            onClick: () => {
                navigate('/posts');
                setMobileMenuVisible(false);
            },
        },
        {
            key: 'dogs',
            label: 'Our Dogs',
            onClick: () => {
                navigate('/dogs');
                setMobileMenuVisible(false);
            },
        },
        {
            key: 'auth',
            label: isAuthenticated ? 'Logout' : 'Login',
            icon: isAuthenticated ? <UnlockOutlined /> : <LockOutlined />,
            onClick: isAuthenticated ? handleLogout : () => {
                navigate('/login');
                setMobileMenuVisible(false);
            },
        },
    ];

    return (
        <Header style={{
            background: theme.colors.primary,
            padding: `0 ${theme.spacing.xl}px`,
            position: 'fixed',
            width: '100%',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <Space>
                <Button
                    type="link"
                    onClick={() => navigate('/')}
                    style={{ padding: 0 }}
                >
                    <Title level={3} style={{ color: theme.colors.lightText, margin: 0 }}>
                        Kennel Speedex
                    </Title>
                </Button>
            </Space>

            {/* Desktop Menu */}
            <Menu
                mode="horizontal"
                items={menuItems}
                style={{
                    background: 'transparent',
                    border: 'none',
                    flex: 1,
                    justifyContent: 'flex-end',
                }}
                className="desktop-menu"
            />

            {/* Mobile Menu Button */}
            <Button
                type="text"
                icon={mobileMenuVisible ? 
                    <CloseOutlined style={{ color: theme.colors.lightText, fontSize: '24px' }} /> : 
                    <MenuOutlined style={{ color: theme.colors.lightText, fontSize: '24px' }} />
                }
                onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
                style={{
                    display: 'none',
                }}
                className="mobile-menu-button"
            />

            {/* Mobile Menu */}
            <Menu
                mode="vertical"
                items={menuItems}
                style={{
                    background: theme.colors.primary,
                    border: 'none',
                    display: 'none',
                    position: 'fixed',
                    top: 64,
                    left: 0,
                    right: 0,
                }}
                className="mobile-menu"
            />

            <style>
                {`
                    @media (min-width: 768px) {
                        .desktop-menu {
                            display: flex !important;
                        }
                        .mobile-menu-button,
                        .mobile-menu {
                            display: none !important;
                        }
                    }
                    @media (max-width: 767px) {
                        .desktop-menu {
                            display: none !important;
                        }
                        .mobile-menu-button {
                            display: block !important;
                        }
                        .mobile-menu {
                            display: ${mobileMenuVisible ? 'block' : 'none'} !important;
                        }
                    }
                    .ant-menu-item {
                        color: ${theme.colors.lightText} !important;
                    }
                    .ant-menu-item:hover {
                        color: ${theme.colors.lightText} !important;
                        background: rgba(255, 255, 255, 0.1) !important;
                    }
                    .ant-menu-item-selected {
                        background: rgba(255, 255, 255, 0.1) !important;
                    }
                `}
            </style>
        </Header>
    );
}
