import React, { useEffect, useState } from 'react';
import { Typography, Spin, Alert, Image, Card, Button } from 'antd';
import { CalendarOutlined, EditOutlined, LinkOutlined, HeartOutlined } from '@ant-design/icons';
import PageLayout from '../components/PageLayout';
import { theme } from '../styles/theme';
import { getPuppiesStatus, getPuppyPosts, formatDate, PuppyPost, PuppiesStatus } from '../services/puppies';
import { supabase } from '../utils/supabase';
import ExpectedDateEditor from '@/components/ExpectedDateEditor';

const { Title, Paragraph, Text } = Typography;

const Puppies: React.FC = () => {
    const [posts, setPosts] = useState<PuppyPost[]>([]);
    const [puppiesStatus, setPuppiesStatus] = useState<PuppiesStatus>({
        expectedDate: null,
        listingUrl: null,
        displayStatus: 'hidden'
    });
    const [loading, setLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showSettingsEditor, setShowSettingsEditor] = useState(false);

    useEffect(() => {
        checkAuth();
        fetchPuppiesStatus();
        fetchPuppyPosts();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
    };

    const fetchPuppiesStatus = async () => {
        setLoading(true);
        try {
            const status = await getPuppiesStatus();
            setPuppiesStatus(status);
        } catch (error) {
            console.error('Error fetching puppies status:', error);
            setError('Failed to load puppies status');
        } finally {
            setLoading(false);
        }
    };

    const fetchPuppyPosts = async () => {
        setPostsLoading(true);
        try {
            const puppyPosts = await getPuppyPosts();
            setPosts(puppyPosts);
        } catch (error) {
            console.error('Error fetching puppy posts:', error);
        } finally {
            setPostsLoading(false);
        }
    };

    const handleSettingsUpdated = () => {
        setShowSettingsEditor(false);
        fetchPuppiesStatus();
    };

    const renderPuppiesStatusCard = () => {
        // Hidden status - don't render the status card at all
        if (puppiesStatus.displayStatus === 'hidden') {
            // Only show for authenticated users (admin)
            if (isAuthenticated) {
                return (
                    <Card style={{
                        marginBottom: '48px',
                        textAlign: 'center',
                        border: `2px dashed ${theme.colors.border}`
                    }}>
                        <Text style={{ color: theme.colors.secondary, marginBottom: '16px', display: 'block' }}>
                            Status komponent er skjult for besøgende
                        </Text>
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => setShowSettingsEditor(true)}
                        >
                            Rediger indstillinger
                        </Button>
                    </Card>
                );
            }
            // For public users, don't render anything
            return null;
        }

        if (loading) {
            return (
                <Card style={{
                    marginBottom: '48px',
                    textAlign: 'center'
                }}>
                    <Spin size="large" />
                </Card>
            );
        }

        // Case 1: Puppies have arrived (URL is set)
        if (puppiesStatus.listingUrl) {
            return (
                <Card style={{
                    marginBottom: '48px',
                    border: `2px solid ${theme.colors.accent}`,
                    borderRadius: '12px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <HeartOutlined style={{
                                fontSize: '32px',
                                color: theme.colors.accent
                            }} />
                            <div>
                                <Title level={3} style={{
                                    margin: 0,
                                    color: theme.colors.accent,
                                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                                    marginBottom: '4px'
                                }}>
                                    Hvalpe er ankommet! 🎉
                                </Title>
                                <Text style={{
                                    fontSize: '16px',
                                    color: theme.colors.secondary,
                                    display: 'block'
                                }}>
                                    Se vores tilgængelige hvalpe på hvalpelisten
                                </Text>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <Button
                                type="primary"
                                size="large"
                                icon={<LinkOutlined />}
                                href={puppiesStatus.listingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    backgroundColor: theme.colors.accent,
                                    borderColor: theme.colors.accent,
                                    fontWeight: '600'
                                }}
                            >
                                Se hvalpelisten
                            </Button>
                            {isAuthenticated && (
                                <Button
                                    type="default"
                                    icon={<EditOutlined />}
                                    onClick={() => setShowSettingsEditor(true)}
                                    style={{
                                        borderColor: theme.colors.accent,
                                        color: theme.colors.accent
                                    }}
                                >
                                    Rediger
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            );
        }

        // Case 2: Active status with expected date
        if (puppiesStatus.displayStatus === 'active' && puppiesStatus.expectedDate) {
            return (
                <Card style={{
                    marginBottom: '48px',
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '12px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <CalendarOutlined style={{
                                fontSize: '24px',
                                color: theme.colors.accent
                            }} />
                            <div>
                                <Text style={{
                                    fontSize: '16px',
                                    color: theme.colors.secondary,
                                    display: 'block'
                                }}>
                                    Næste hvalpe forventes:
                                </Text>
                                <Title level={3} style={{
                                    margin: 0,
                                    color: theme.colors.accent,
                                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)'
                                }}>
                                    {formatDate(puppiesStatus.expectedDate)}
                                </Title>
                            </div>
                        </div>
                        {isAuthenticated && (
                            <Button
                                type="default"
                                icon={<EditOutlined />}
                                onClick={() => setShowSettingsEditor(true)}
                                style={{
                                    borderColor: theme.colors.accent,
                                    color: theme.colors.accent
                                }}
                            >
                                Rediger
                            </Button>
                        )}
                    </div>
                </Card>
            );
        }

        // Case 3: Active status without date
        if (puppiesStatus.displayStatus === 'active') {
            return (
                <Card style={{
                    marginBottom: '48px',
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '12px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '16px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <CalendarOutlined style={{
                                fontSize: '24px',
                                color: theme.colors.secondary
                            }} />
                            <div>
                                <Title level={3} style={{
                                    margin: 0,
                                    color: theme.colors.text,
                                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)'
                                }}>
                                    Planlagt hvalpekuld
                                </Title>
                                <Text style={{
                                    fontSize: '16px',
                                    color: theme.colors.secondary,
                                    display: 'block'
                                }}>
                                    Dato er endnu ikke fastsat
                                </Text>
                            </div>
                        </div>
                        {isAuthenticated && (
                            <Button
                                type="default"
                                icon={<EditOutlined />}
                                onClick={() => setShowSettingsEditor(true)}
                                style={{
                                    borderColor: theme.colors.accent,
                                    color: theme.colors.accent
                                }}
                            >
                                Rediger
                            </Button>
                        )}
                    </div>
                </Card>
            );
        }

        // Case 4: Inactive status
        return (
            <Card style={{
                marginBottom: '48px',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '12px'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <CalendarOutlined style={{
                            fontSize: '24px',
                            color: theme.colors.secondary
                        }} />
                        <div>
                            <Title level={3} style={{
                                margin: 0,
                                color: theme.colors.text,
                                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)'
                            }}>
                                Ingen planlagte hvalpe
                            </Title>
                            <Text style={{
                                fontSize: '16px',
                                color: theme.colors.secondary,
                                display: 'block'
                            }}>
                                Der er ikke planlagt hvalpe på nuværende tidspunkt
                            </Text>
                        </div>
                    </div>
                    {isAuthenticated && (
                        <Button
                            type="default"
                            icon={<EditOutlined />}
                            onClick={() => setShowSettingsEditor(true)}
                            style={{
                                borderColor: theme.colors.accent,
                                color: theme.colors.accent
                            }}
                        >
                            Rediger
                        </Button>
                    )}
                </div>
            </Card>
        );
    };

    return (
        <PageLayout>
            <div style={{ maxWidth: '1200px', padding: '0 24px' }}>
                {/* Status Section - Conditionally rendered based on status */}
                {renderPuppiesStatusCard()}

                {/* Main Content - Always visible */}
                <div>
                    <Title level={1} style={{
                        color: theme.colors.text,
                        fontSize: 'clamp(1.75rem, 4vw, 2.5rem)'
                    }}>
                        Hvalpe hos Kennel Speedex
                    </Title>
                    <div style={{
                        lineHeight: '1.7'
                    }}>
                        <Paragraph style={{
                            fontSize: 'clamp(0.75, 2.5vw, 1rem)',
                            textAlign: 'justify',
                            color: theme.colors.text
                        }}>
                            Hos Kennel Speedex er målet med hvert kuld at fremavle sunde, racetypiske og mentalt
                            velfungerende terriere, som kan blive vigtige familiemedlemmer i mange år frem.
                        </Paragraph>

                        <Paragraph style={{
                            fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
                            textAlign: 'justify',
                            color: theme.colors.text
                        }}>
                            Terriere er kendt for deres livsglæde, mod og loyalitet. De knytter sig tæt til deres
                            familie og deltager gerne i alt, hvad der sker – med stor energi og entusiasme. Derfor
                            er det vigtigt med en tydelig, kærlig og konsekvent opdragelse, hvor hunden mærker
                            trygge rammer og tydelig ledelse. Med respekt og kærlighed trives en terrier også godt
                            sammen med børn.
                        </Paragraph>

                        <Title level={3} style={{
                            marginTop: '32px',
                            marginBottom: '16px',
                            color: theme.colors.text
                        }}>
                            Alle hvalpe fra Kennel Speedex:
                        </Title>

                        <ul style={{
                            display: 'flex',
                            flexDirection: 'column',
                            fontSize: 'clamp(0.75rem, 2vw, 1rem)',
                            color: theme.colors.text,
                            lineHeight: '1.6',
                            paddingLeft: '20px',
                            gap: '12px'
                        }}>
                            <li>
                                Kan tidligst flytte hjemmefra ved 8 ugers alderen
                            </li>
                            <li>
                                Bliver udvalgt af os, med udgangspunkt i hvalpens temperament og den enkelte families ønsker og behov
                            </li>
                            <li>
                                Sælges med en DKK-købsaftale og har DKK-stambog
                            </li>
                            <li>
                                Er dyrlægekontrolleret, vaccineret, chippet, har fået ormekur
                            </li>
                            <li>
                                Medfølger EU-pas samt foder til den første tid i deres nye hjem
                            </li>
                        </ul>

                        <Paragraph style={{
                            fontSize: 'clamp(0.75rem, 2.5vw, 1rem)',
                            textAlign: 'justify',
                            color: theme.colors.text
                        }}>
                            Hvis du ønsker at komme i betragtning til en hvalp fra os, så skriv gerne en mail til os
                            med lidt information om dig/jer, jeres hverdag og jeres ønsker til en hund.
                        </Paragraph>

                        <div style={{
                            textAlign: 'center',
                            padding: '20px',
                            backgroundColor: theme.colors.background,
                            border: `1px solid ${theme.colors.border}`,
                            marginTop: '32px',
                            marginBottom: '48px',
                            borderRadius: '8px',
                        }}>
                            <Text style={{
                                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                                fontWeight: '500',
                                color: theme.colors.text
                            }}>
                                E-mail: <a href="mailto:tinearnild@hotmail.com" style={{ color: theme.colors.accent }}>
                                    tinearnild@hotmail.com
                                </a>
                            </Text>
                        </div>
                    </div>
                </div>

                {/* Gallery Section - Always visible */}
                <div style={{ marginBottom: '48px' }}>
                    <Title level={2} style={{
                        marginBottom: '32px',
                        color: theme.colors.text,
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)'
                    }}>
                        Billeder af vores hvalpe
                    </Title>

                    {postsLoading ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '40px'
                        }}>
                            <Spin size="large" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px',
                            color: theme.colors.secondary
                        }}>
                            <Text>Ingen billeder tilgængelige endnu</Text>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                            gap: '16px',
                            justifyContent: 'center'
                        }}>
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    style={{
                                        aspectRatio: '1',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        boxShadow: theme.shadows.sm,
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.boxShadow = theme.shadows.md;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = theme.shadows.sm;
                                    }}
                                >
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                        preview={{
                                            mask: <div style={{
                                                background: 'rgba(0, 0, 0, 0.6)',
                                                color: 'white',
                                                padding: '4px 8px',
                                                fontSize: '12px',
                                                textAlign: 'center'
                                            }}>
                                                {post.title}
                                            </div>
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Settings Editor Modal */}
                {showSettingsEditor && (
                    <ExpectedDateEditor
                        currentStatus={puppiesStatus}
                        onStatusUpdated={handleSettingsUpdated}
                        onCancel={() => setShowSettingsEditor(false)}
                    />
                )}

                {error && (
                    <Alert
                        message="Error"
                        description={error}
                        type="error"
                        closable
                        style={{ marginTop: '16px' }}
                    />
                )}
            </div>
        </PageLayout>
    );
};

export default Puppies;
