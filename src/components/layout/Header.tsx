import React, { useState } from 'react';
import { Layout, Typography, Menu, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UnlockOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { theme } from '@/styles/theme';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES, APP_NAME } from '@/constants';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  style?: React.CSSProperties;
}

export const Header: React.FC<HeaderProps> = ({ style }) => {
  const navigate = useNavigate();
  const { isAuthenticated, signOut } = useAuth();
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate(ROUTES.HOME);
  };

  const menuItems = [
    {
      key: 'home',
      label: 'Home',
      onClick: () => {
        navigate(ROUTES.HOME);
        setMobileMenuVisible(false);
      },
    },
    {
      key: 'posts',
      label: 'Posts',
      onClick: () => {
        navigate(ROUTES.POSTS);
        setMobileMenuVisible(false);
      },
    },
    {
      key: 'dogs',
      label: 'Our Dogs',
      onClick: () => {
        navigate(ROUTES.DOGS);
        setMobileMenuVisible(false);
      },
    },
    {
      key: 'puppies',
      label: 'Puppies',
      onClick: () => {
        navigate(ROUTES.PUPPIES);
        setMobileMenuVisible(false);
      },
    },
    {
      key: 'auth',
      label: isAuthenticated ? 'Logout' : 'Login',
      icon: isAuthenticated ? <UnlockOutlined /> : <LockOutlined />,
      onClick: isAuthenticated ? handleLogout : () => {
        navigate(ROUTES.LOGIN);
        setMobileMenuVisible(false);
      },
    },
  ];

  return (
    <AntHeader style={{
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
          onClick={() => navigate(ROUTES.HOME)}
          style={{ padding: 0 }}
        >
          <Title level={4} style={{ color: theme.colors.text, margin: 0 }}>
            {APP_NAME}
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
    </AntHeader>
  );
};