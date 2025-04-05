import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Typography, Row, Col, Card, Image, Button, Divider, Timeline } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { theme } from '../styles/theme';
import { mockDogs } from '../data/mockDogs';

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const DogProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the dog by ID
  const dog = mockDogs.find(d => d.id === parseInt(id || '0'));
  
  if (!dog) {
    return (
      <Layout style={{ minHeight: '100vh', background: theme.colors.background }}>
        <Content style={{ padding: theme.spacing.xxl, textAlign: 'center' }}>
          <Title>Dog Not Found</Title>
          <Button onClick={() => navigate('/dogs')}>Back to Dogs</Button>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: theme.colors.background }}>
      <Header style={{ 
        background: theme.colors.primary,
        padding: `0 ${theme.spacing.xl}px`,
        position: 'fixed',
        width: '100%',
        zIndex: 1,
      }}>
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/dogs')}
              style={{ color: theme.colors.lightText }}
            >
              Back to Dogs
            </Button>
          </Col>
          <Col>
            <Title level={3} style={{ color: theme.colors.lightText, margin: 0 }}>
              {dog.name}'s Profile
            </Title>
          </Col>
        </Row>
      </Header>

      <Content style={{ 
        padding: `${theme.spacing.xxl}px ${theme.spacing.xl}px`,
        marginTop: 64,
      }}>
        <Row gutter={[theme.spacing.xl, theme.spacing.xl]}>
          {/* Main Info Section */}
          <Col xs={24} lg={12}>
            <Card>
              <Image.PreviewGroup>
                <Row gutter={[theme.spacing.md, theme.spacing.md]}>
                  {dog.images.map((image, index) => (
                    <Col key={index} xs={24} sm={12} md={8}>
                      <Image 
                        src={image} 
                        alt={`${dog.name} photo ${index + 1}`}
                        style={{ borderRadius: 8 }}
                      />
                    </Col>
                  ))}
                </Row>
              </Image.PreviewGroup>
              
              <Divider />
              
              <Title level={2}>{dog.name}</Title>
              <Paragraph>
                <Text strong>Breed:</Text> {dog.breed}
              </Paragraph>
              <Paragraph>
                <Text strong>Age:</Text> {dog.age} years
              </Paragraph>
              <Paragraph>
                <Text strong>Description:</Text> {dog.description}
              </Paragraph>
            </Card>
          </Col>

          {/* Achievements Section */}
          <Col xs={24} lg={12}>
            <Card title="Achievements">
              <Timeline
                items={dog.achievements?.map((achievement, index) => ({
                  key: index,
                  children: (
                    <>
                      <Text strong>{achievement.title}</Text>
                      <br />
                      <Text type="secondary">{achievement.date}</Text>
                      <br />
                      <Text>{achievement.description}</Text>
                    </>
                  )
                }))}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default DogProfile; 