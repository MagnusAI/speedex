import React from 'react';
import { Layout, LayoutProps } from 'antd';
import { theme } from '@/styles/theme';
import { Header } from './Header';
import { Footer } from './Footer';

const { Content } = Layout;

interface PageLayoutProps extends Omit<LayoutProps, 'children'> {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  style,
  ...props 
}) => {
  return (
    <Layout style={{ 
      minHeight: '100vh', 
      background: theme.colors.primary 
    }}>
      <Header style={{ 
        marginTop: `${theme.spacing.sm}px`, 
        borderRadius: `16px 16px 0 0` 
      }} />
      <Content 
        style={{
          padding: `${theme.spacing.xl}px ${theme.spacing.xxl}px`,
          backgroundColor: theme.colors.background,
          borderRadius: `0 0 16px 16px`,
          ...style
        }} 
        {...props}
      >
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};

// Keep backward compatibility
export default PageLayout;
