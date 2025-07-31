import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import { Card } from '@/components/ui/Card';
import { Image } from '@/components/ui/Image';
import { Flex } from '@/components/ui/Grid';
import { Dog } from '@/types/dog';
import { UI, ROUTES } from '@/constants';

const { Title } = Typography;

interface DogCardProps {
  dog: Dog;
  onClick?: (dog: Dog) => void;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(dog);
    } else {
      const encodedId = encodeURIComponent(dog.id);
      navigate(ROUTES.DOG_DETAILS(encodedId));
    }
  };

  return (
    <Card
      hoverable
      onClick={handleClick}
      variant="elevated"
      style={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <Image
        src={dog.image}
        alt={dog.name}
        aspectRatio="square"
        style={{
          height: UI.DOG_CARD_IMAGE_HEIGHT,
          marginBottom: '12px',
        }}
      />
      <Flex justify="center" align="center" style={{ padding: '8px 0' }}>
        <Title level={4} style={{ margin: 0, textAlign: 'center' }}>
          {dog.name}
        </Title>
      </Flex>
    </Card>
  );
};

export default DogCard; 