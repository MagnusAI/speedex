import React from 'react';
import { Layout, Typography } from 'antd';
import { theme } from '@/styles/theme';
import { APP_NAME } from '@/constants';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

interface FooterProps {
  style?: React.CSSProperties;
}

export const Footer: React.FC<FooterProps> = ({ style }) => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter style={{
      background: theme.colors.primary,
      color: theme.colors.lightText,
      textAlign: 'center',
      padding: `${theme.spacing.md}px ${theme.spacing.xl}px`,
      ...style,
    }}>
      <Text style={{ color: theme.colors.lightText }}>
        © {currentYear} {APP_NAME}. All rights reserved.
      </Text>
    </AntFooter>
  );
};