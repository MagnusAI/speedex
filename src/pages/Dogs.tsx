import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Row, Col, Card, Input, Select, Button, Space } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { theme } from '../styles/theme';
import { mockDogs } from '../data/mockDogs';
import { Breed } from '../types/dog';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Dogs: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [selectedBreed, setSelectedBreed] = useState<Breed | 'all'>('all');

  const filteredDogs = mockDogs.filter(dog => {
    const matchesSearch = dog.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         dog.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesBreed = selectedBreed === 'all' || dog.breed === selectedBreed;
    return matchesSearch && matchesBreed;
  });

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
            <Title level={3} style={{ color: theme.colors.lightText, margin: 0 }}>
              Our Dogs
            </Title>
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => navigate('/dogs/add')}
            >
              Add New Dog
            </Button>
          </Col>
        </Row>
      </Header>

      <Content style={{ 
        padding: `${theme.spacing.xxl}px ${theme.spacing.xl}px`,
        marginTop: 64,
      }}>
        {/* Filters Section */}
        <Row gutter={[theme.spacing.xl, theme.spacing.xl]} style={{ marginBottom: theme.spacing.xxl }}>
          <Col xs={24} md={12}>
            <Search
              placeholder="Search dogs by name or description"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onChange={e => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} md={12}>
            <Select
              placeholder="Filter by breed"
              style={{ width: '100%' }}
              size="large"
              value={selectedBreed}
              data-testid="breed-selector"
              onChange={value => setSelectedBreed(value as Breed | 'all')}
            >
              <Option value="all" data-testid="all-breeds-option">All Breeds</Option>
              <Option value="Jack Russell Terrier" data-testid="jack-russell-terrier-option">Jack Russell Terrier</Option>
              <Option value="Norfolk Terrier" data-testid="norfolk-terrier-option">Norfolk Terrier</Option>
            </Select>
          </Col>
        </Row>

        {/* Dogs Grid */}
        <Row gutter={[theme.spacing.xl, theme.spacing.xl]}>
          {filteredDogs.map(dog => (
            <Col xs={24} sm={12} md={8} lg={6} key={dog.id}>
              <Card
                hoverable
                onClick={() => navigate(`/dogs/${dog.id}`)}
                cover={
                  <div style={{ 
                    height: '200px', 
                    background: theme.colors.secondary,
                    backgroundImage: `url(${dog.images[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                }
              >
                <Card.Meta
                  title={dog.name}
                  description={
                    <Space direction="vertical">
                      <Text>{dog.breed}</Text>
                      <Text type="secondary">{dog.description}</Text>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        {filteredDogs.length === 0 && (
          <Row justify="center" style={{ marginTop: theme.spacing.xxl }}>
            <Col>
              <Title level={4} style={{ color: theme.colors.text }}>
                No dogs found matching your criteria
              </Title>
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default Dogs; 