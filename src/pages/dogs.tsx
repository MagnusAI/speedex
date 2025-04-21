import React, { useEffect, useState } from 'react';
import { Spin, message, Layout, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { supabase } from '../utils/supabase';
import PageLayout from '../components/PageLayout';
import DogCard from '../components/DogCard';
import { Dog } from '../types/dog';

const { Content } = Layout;
const { Title } = Typography;

const Dogs: React.FC = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

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
                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '24px', 
                        justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start'
                    }}>
                        {dogs.map((dog) => (
                            <div key={dog.id} style={{ width: '300px' }}>
                                <DogCard dog={dog} />
                            </div>
                        ))}
                        {isAuthenticated && (
                            <div style={{ width: '300px' }}>
                                <Card
                                    hoverable
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        minHeight: '260px'
                                    }}
                                    onClick={() => navigate('/dogs/add')}
                                >
                                    <div style={{ 
                                        marginBottom: '16px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flex: 1
                                    }}>
                                        <PlusOutlined style={{ fontSize: '48px' }} />
                                        <Title level={4} style={{ margin: '16px 0 0 0' }}>New Dog</Title>
                                    </div>
                                </Card>
                            </div>
                        )}
                    </div>
                </Content>
            </PageLayout>
        </Layout>
    );
};

export default Dogs;

