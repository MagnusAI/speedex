import React, { useEffect, useState } from 'react';
import { Spin, message, Layout, Typography, Card, Row, Col, Button, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { supabase } from '../utils/supabase';
import PageLayout from '../components/page-layout';
import DogCard from '../components/DogCard';
import { Dog } from '../types/dog';
import { theme } from '../styles/theme';

const { Content } = Layout;
const { Title } = Typography;

const Dogs: React.FC = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };

        checkAuth();
    }, []);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const { data, error } = await supabase
                    .from('dogs')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setDogs(data || []);
            } catch (error) {
                message.error('Failed to fetch dogs');
                console.error('Error fetching dogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDogs();
    }, []);

    if (loading) {
        return (
            <PageLayout>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '50vh' 
                }}>
                    <Spin size="large" />
                </div>
            </PageLayout>
        );
    }

    return (
        <Layout>
            <PageLayout>
                <Content style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
                    <Row gutter={[24, 24]} justify="center">
                        {dogs.map((dog) => (
                            <Col key={dog.id} xs={24} sm={12} md={8} lg={6}>
                                <DogCard dog={dog} />
                            </Col>
                        ))}
                        {isAuthenticated && (
                            <Col xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    hoverable
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        textAlign: 'center'
                                    }}
                                    onClick={() => navigate('/dogs/add')}
                                >
                                    <div style={{ marginBottom: '16px' }}>
                                        <PlusOutlined style={{ fontSize: '48px' }} />
                                    </div>
                                    <Title level={4} style={{ margin: 0 }}>New Dog</Title>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Content>
            </PageLayout>
        </Layout>
    );
};

export default Dogs;

