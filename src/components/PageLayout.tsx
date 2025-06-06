import { Layout, Typography, Menu, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { theme } from '../styles/theme';
import { LockOutlined, UnlockOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const { Content, Header, Footer } = Layout;
const { Title, Text } = Typography;

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return <Layout style={{ minHeight: '100vh', background: theme.colors.primary }}>
        <PageHeader style={{ marginTop: `${theme.spacing.sm}px`, borderRadius: `16px 16px 0 0` }} />
        <Content style={{
            padding: `${theme.spacing.xl}px ${theme.spacing.xxl}px`,
            backgroundColor: theme.colors.background,
            borderRadius: `0 0 16px 16px`,
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

export function PageHeader({ style }: { style?: React.CSSProperties }) {
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
            background: theme.colors.background,
            padding: `0 ${theme.spacing.xl}px`,
            borderBottom: `1px solid ${theme.colors.border}`,
            width: '100%',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: `${theme.borderRadius.md}px ${theme.borderRadius.md}px 0 0`,
            ...style
        }}>
            <Space>
                <Button
                    type="link"
                    onClick={() => navigate('/')}
                    style={{ padding: 0 }}
                >
                    <Title level={4} style={{ color: theme.colors.text, margin: 0 }}>
                        Kennel Speedex
                    </Title>
                </Button>
            </Space>

            {/* Desktop Menu */}
            <Menu
                mode="inline"
                items={menuItems}
                style={{ 
                    borderInlineEnd: `0px solid ${theme.colors.border}`,
                    justifyContent: 'flex-end',
                }}
                className="desktop-menu"
            />

            {/* Mobile Menu Button */}
            <Button
                type="text"
                icon={mobileMenuVisible ? 
                    <CloseOutlined style={{ color: theme.colors.text, fontSize: '24px' }} /> : 
                    <MenuOutlined style={{ color: theme.colors.text, fontSize: '24px' }} />
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
                    borderInlineEnd: `0px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.primary,
                    position: 'absolute',
                    top: 88,
                    left: 0,
                    width: '100%',
                    height: 'auto',
                    zIndex: 1000,
                    boxShadow: theme.shadows.md,
                    border: `1px solid ${theme.colors.border}`,
                }}
                className="mobile-menu"
            />

            <style>
                {`
                    .mobile-menu {
                        background-color: ${theme.colors.primary} !important;
                        font-weight: bold;
                    }

                    .desktop-menu {
                        & li {
                            width: 124px !important;
                            text-align: center;
                            font-weight: bold;
                        }
                        
                        & li:hover {
                            background-color: ${theme.colors.primary} !important;
                        }
                    }
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
                `}
            </style>
        </Header>
    );
}
