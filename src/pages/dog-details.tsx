import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, message, Typography, Button, Image } from 'antd';
import { ArrowLeftOutlined, EditOutlined, BranchesOutlined } from '@ant-design/icons';
import { supabase } from '../utils/supabase';
import PageLayout from '../components/PageLayout';
import { Dog } from '../types/dog';
import { theme } from '../styles/theme';
import { mockAncestryTree } from '../mocks/ancestry';
import DogAncestryTree from '../components/DogAncestryTree';
import { buildAncestryTree } from '@/services/ancestry';
import { AncestryTree } from '@/types/ancestry';

const { Title, Text } = Typography;

const DogDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [dog, setDog] = useState<Dog | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [ancestryTree, setAncestryTree] = useState<AncestryTree | null>(null);

    useEffect(() => {
        const fetchAncestryTree = async () => {
            const registrationId = decodeURIComponent(id || '');

            if (registrationId) {
                const tree = await buildAncestryTree(registrationId);
                setAncestryTree(tree);
            }
        };

        if (id) {
            fetchAncestryTree();
        }
    }, [id]);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };

        checkAuth();
    }, []);

    useEffect(() => {
        const fetchDog = async () => {
            try {
                // Decode the registration ID from the URL
                const registrationId = decodeURIComponent(id || '');

                const { data, error } = await supabase
                    .from('dogs')
                    .select('*')
                    .eq('id', registrationId)
                    .single();

                if (error) throw error;
                setDog(data);
            } catch (error) {
                message.error('Failed to fetch dog details');
                console.error('Error fetching dog:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDog();
        }
    }, [id]);

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

    if (!dog) {
        return (
            <PageLayout>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '50vh',
                    gap: theme.spacing.md
                }}>
                    <Title level={3}>Dog not found</Title>
                    <Button
                        type="primary"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/dogs')}
                    >
                        Back to Dogs
                    </Button>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            {isAuthenticated && (
                <div style={{ position: 'absolute', top: 80, right: 40, display: 'flex', gap: theme.spacing.md }}>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/dogs/${encodeURIComponent(dog.id)}/edit`)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="primary"
                        icon={<BranchesOutlined />}
                        onClick={() => navigate(`/dogs/${encodeURIComponent(dog.id)}/edit-ancestry`)}
                    >
                        Edit Ancestry
                    </Button>
                </div>
            )}
            <div style={{ padding: theme.spacing.xl, display: 'flex', flexWrap: 'wrap', gap: theme.spacing.xl }}>
                <div style={{
                    borderRadius: theme.borderRadius.md,
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    flex: 1,
                    minWidth: '300px',
                    maxWidth: '480px',
                    maxHeight: '360px'
                }}>
                    <Image
                        src={dog.image}
                        alt={dog.name}
                        style={{ width: '100%' }}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: theme.spacing.md,
                    minWidth: '200px',
                    flex: 1
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Title level={2}>{dog.name}</Title>
                    </div>
                    {dog.nickname && (
                        <div>
                            <Text strong>Nickname:</Text>
                            <Text style={{ marginLeft: theme.spacing.sm }}>{dog.nickname}</Text>
                        </div>
                    )}
                    <div>
                        <Text strong style={{ whiteSpace: 'nowrap' }}>Registration ID:</Text>
                        <Text style={{ marginLeft: theme.spacing.sm, whiteSpace: 'nowrap' }}>{dog.id}</Text>
                    </div>
                    <div>
                        <Text strong>Breed:</Text>
                        <Text style={{ marginLeft: theme.spacing.sm }}>{dog.breed}</Text>
                    </div>
                    {dog.breeder && (
                        <div>
                            <Text strong>Breeder:</Text>
                            <Text style={{ marginLeft: theme.spacing.sm }}>{dog.breeder}</Text>
                        </div>
                    )}
                </div>
            </div>
            {ancestryTree && <DogAncestryTree tree={ancestryTree} />}
        </PageLayout>
    );
};

export default DogDetails; 