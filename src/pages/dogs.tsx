import React, { useEffect, useState } from 'react';
import { Spin, message } from 'antd';
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
            <div style={{ 
                maxWidth: '1600px', 
                margin: '0 auto',
                padding: `0 ${theme.spacing.md}px`
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: theme.spacing.xl,
                    justifyContent: 'flex-start',
                    alignItems: 'stretch'
                }}>
                    {dogs.map((dog) => (
                        <div 
                            key={dog.id}
                            style={{ 
                                width: '300px',
                                flexShrink: 0,
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <DogCard dog={dog} />
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
};

export default Dogs;

