import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, message } from 'antd';
import { supabase } from '../utils/supabase';
import PageLayout from '../components/page-layout';
import DogCard from '../components/DogCard';
import { Dog } from '../types/dog';
import { theme } from '../styles/theme';

const Dogs: React.FC = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(true);

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
        <PageLayout>
            <Row gutter={[theme.spacing.lg, theme.spacing.lg]}>
                {dogs.map((dog) => (
                    <Col 
                        key={dog.id} 
                        xs={24} 
                        sm={12} 
                        md={8} 
                        lg={6}
                    >
                        <DogCard dog={dog} />
                    </Col>
                ))}
            </Row>
        </PageLayout>
    );
};

export default Dogs;

