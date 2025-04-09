import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Timeline, Spin, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { dogService } from '../services/dogService';
import { Dog } from '../types/dog';
import FamilyTree from '../components/FamilyTree';

const { Title, Text, Paragraph } = Typography;

const DogProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dog, setDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        if (!id) return;
        const data = await dogService.getDogById(parseInt(id));
        if (data) {
          setDog(data);
        } else {
          message.error('Dog not found');
          navigate('/dogs');
        }
      } catch (error) {
        console.error('Error fetching dog:', error);
        message.error('Failed to load dog profile');
        navigate('/dogs');
      } finally {
        setLoading(false);
      }
    };

    fetchDog();
  }, [id, navigate]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!dog) {
    return null;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/dogs')}
        style={{ marginBottom: '24px' }}
      >
        Back to Dogs
      </Button>

      <Card>
        <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
          <img
            src={dog.image}
            alt={dog.name}
            style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
          />
          <div>
            <Title level={2}>{dog.name}</Title>
            <Text strong>{dog.breed}</Text>
            {dog.age && <Text> • {dog.age} years old</Text>}
            <Paragraph style={{ marginTop: '16px' }}>{dog.description}</Paragraph>
          </div>
        </div>

        {dog.parents && (
          <Card title="Ancestry Lineage" style={{ marginBottom: '24px' }}>
            <FamilyTree dog={dog} />
          </Card>
        )}

        {dog.achievements && dog.achievements.length > 0 && (
          <Card title="Achievements">
            <Timeline>
              {dog.achievements.map((achievement, index) => (
                <Timeline.Item key={index}>
                  <Text strong>{achievement.title}</Text>
                  <br />
                  <Text type="secondary">{achievement.date}</Text>
                  <br />
                  <Text>{achievement.description}</Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default DogProfile; 