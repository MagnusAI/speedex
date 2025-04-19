import AppBar from "./app-bar";
import { Layout } from 'antd';
import { theme } from '../styles/theme';

export default function PageLayout({ children }: { children: React.ReactNode }) {
    return <Layout style={{ minHeight: '100vh', background: theme.colors.background }}>
        <AppBar />
        {children}
    </Layout>
}