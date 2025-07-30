import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { Typography, Button } from 'antd';
import RecentPosts from '../components/RecentPosts';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme'

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <PageLayout style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    backgroundImage: 'url(./dogs/images/dogs_bubbles_169.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '360px',
                    width: '100%',
                    maxWidth: '720px',
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '24px'
                    }}>
                        <Typography.Title style={{
                            color: '#ffffff',
                            textAlign: 'center',
                            marginBottom: '16px',
                            fontSize: 'clamp(1rem, 4vw, 2.5rem)',
                            lineHeight: '1.2'
                        }}>
                            Welcome to Our Terrier Family
                        </Typography.Title>
                        <Typography.Text style={{
                            color: '#ffffff',
                            fontSize: 'clamp(0.75rem, 2.5vw, 1.125rem)',
                            textAlign: 'center',
                            maxWidth: '800px',
                            lineHeight: '1.5'
                        }}>
                            Kennel Speedex is a small, dedicated Terrier breeding kennel based in Gilleleje.
                            Through our website, you can follow our daily journey with our beloved dogs and stay updated on our latest news.
                            We hope you enjoy exploring our world of terriers!
                        </Typography.Text>
                        <Button
                            onClick={() => { navigate('/dogs'); }}
                            size="large"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{
                                backgroundColor: isHovered ? theme.colors.accentHover : theme.colors.accent,
                                margin: '12px',
                                padding: '16px',
                                fontSize: '0.875rem',
                                border: 'none',
                                transition: 'background-color 0.2s ease',
                            }}
                        >
                            Meet Our Dogs
                        </Button>
                    </div>
                </div>
            </div>

            <div style={{
                display: 'flex',
            }}>
                <div style={{
                    width: '100%',
                }}>
                    <Typography.Title level={3}>
                        Om Kennel Speedex
                    </Typography.Title>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
                        <Typography.Paragraph style={{
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            lineHeight: '1.5',
                            color: '#4a5568',
                            textAlign: 'justify'
                        }}>
                            Kennel Speedex er et lille, seriøst og passioneret opdræt beliggende i smukke Gilleleje.
                            Bag kennelen står Tine Arnild, som har været aktiv opdrætter siden 2005 og er uddannet
                            og certificeret gennem Dansk Kennel Klub (DKK).
                        </Typography.Paragraph>

                        <Typography.Paragraph style={{
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            lineHeight: '1.5',
                            color: '#4a5568',
                            textAlign: 'justify'
                        }}>
                            Gennem årene har vi specialiseret os i opdræt af terriere – herunder bl.a. West Highland
                            White Terriers, Jack Russell Terriers og senest Norfolk Terriers, som i dag er vores
                            primære fokus. Med stor kærlighed til racerne og et stærkt fagligt fundament arbejder vi
                            målrettet for at fremavle sunde, velfungerende og racetypiske hunde med et godt og stabilt temperament.
                        </Typography.Paragraph>

                        <Typography.Paragraph style={{
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            lineHeight: '1.5',
                            color: '#4a5568',
                            textAlign: 'justify'
                        }}>
                            Vores opdræt bygger på kvalitet, sundhed og et stærkt netværk af erfarne og ansvarlige
                            opdrættere. Hver hvalp fra Kennel Speedex vokser op i trygge rammer og får den bedst
                            mulige start på livet – både fysisk og mentalt.
                        </Typography.Paragraph>

                        <Typography.Paragraph style={{
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            lineHeight: '1.7',
                            color: '#4a5568',
                            marginBottom: '8px',
                            fontWeight: '500'
                        }}>
                            Har du spørgsmål, eller ønsker du at høre mere om kommende hvalpe, er du altid velkommen til at kontakte os på e-mail: <a href="mailto:tinearnild@hotmail.com">tinearnild@hotmail.com</a>
                        </Typography.Paragraph>
                    </div>
                </div>
            </div>
            <RecentPosts title="Latest News" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '12px',
                    padding: '24px 24px 0 24px',
                    flexWrap: 'wrap',
                    borderTop: `1px solid ${theme.colors.border}`,
                }}>
                    <Button
                        type="link"
                        onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.accentHover}
                        onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.secondary}
                        onClick={() => navigate('/')}
                        style={{
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            fontWeight: '500',
                            transition: 'transform 0.2s ease',
                            color: theme.colors.secondary,
                        }}
                    >
                        Home
                    </Button>
                    <Button
                        type="link"
                        onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.accentHover}
                        onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.secondary}
                        onClick={() => navigate('/posts')}
                        style={{
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            fontWeight: '500',
                            transition: 'transform 0.2s ease',
                            color: theme.colors.secondary,
                        }}
                    >
                        Posts
                    </Button>
                    <Button
                        type="link"
                        onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.accentHover}
                        onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.secondary}
                        onClick={() => navigate('/dogs')}
                        style={{
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            fontWeight: '500',
                            transition: 'transform 0.2s ease',
                            color: theme.colors.secondary,
                        }}
                    >
                        Our Dogs
                    </Button>
                    <Button
                        type="link"
                        onMouseEnter={(e) => e.currentTarget.style.color = theme.colors.accentHover}
                        onMouseLeave={(e) => e.currentTarget.style.color = theme.colors.secondary}
                        onClick={() => navigate('/puppies')}
                        style={{
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                            fontWeight: '500',
                            transition: 'transform 0.2s ease',
                            color: theme.colors.secondary,
                        }}
                    >
                        Puppies
                    </Button>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap'
                }}>
                    <a
                        href="https://dkk.dk"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.2s ease',
                            backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img
                            src="/speedex/dkk-uddannet.png"
                            alt="DKK Uddannet - Dansk Kennel Klub"
                            style={{
                                height: '60px',
                                width: 'auto'
                            }}
                        />
                    </a>
                    <a
                        href="https://www.facebook.com/KennelSpeedex"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'transform 0.2s ease',
                            backgroundColor: 'transparent',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <img
                            src="/speedex/facebook-logo.svg"
                            alt="Facebook"
                            style={{
                                height: '80px',
                                width: '80px',
                            }}
                        />
                    </a>
                </div>
            </div>

        </PageLayout>
    );
};

export default Home; 
