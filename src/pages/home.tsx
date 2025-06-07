import React from 'react';
import PageLayout from '../components/PageLayout';
import { Typography } from 'antd';
import RecentPosts from '../components/RecentPosts';

const Home: React.FC = () => {
    return (
        <PageLayout>
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
                            marginBottom: '16px'
                        }}>
                            Welcome to Our Terrier Family
                        </Typography.Title>
                        <Typography.Text style={{
                            color: '#ffffff',
                            fontSize: '1rem',
                            textAlign: 'center',
                            maxWidth: '800px'
                        }}>
                            Specializing in Jack Russell and Norfolk Terriers, we breed healthy,
                            friendly family dogs in a loving home environment while maintaining
                            excellence in competition standards.
                        </Typography.Text>
                    </div>
                </div>
            </div>
            <RecentPosts title="Latest News" />
        </PageLayout>
    );
};

export default Home; 
