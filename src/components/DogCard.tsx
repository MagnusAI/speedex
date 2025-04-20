import React from 'react';
import { Card, Typography } from 'antd';
import { Dog } from '../types/dog';
import { theme } from '../styles/theme';

const { Title } = Typography;

interface DogCardProps {
    dog: Dog;
    onClick?: () => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onClick }) => {
    return (
        <Card
            hoverable
            onClick={onClick}
            cover={
                <div style={{
                    height: '200px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: theme.colors.background
                }}>
                    <img
                        alt={dog.name}
                        src={dog.image}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>
            }
            style={{
                width: '100%',
                height: '100%',
                borderRadius: theme.borderRadius.md,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}
            bodyStyle={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: theme.spacing.md
            }}
        >
            <Title level={4} style={{ margin: 0, textAlign: 'center' }}>
                {dog.name}
            </Title>
        </Card>
    );
};

export default DogCard; 