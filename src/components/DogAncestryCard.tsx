import React, { useState } from 'react';
import { Card, Typography, Tag, Space, Modal } from 'antd';
import { Ancestor } from '../types/ancestry';
import { theme } from '../styles/theme';

const { Text, Title } = Typography;

interface DogAncestryCardProps {
  ancestor: Ancestor;
}

const DogAncestryCard: React.FC<DogAncestryCardProps> = ({ ancestor }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleImageClick = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Card
        style={{
          width: '100%',
          borderRadius: theme.borderRadius.lg,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }}
        bodyStyle={{
          padding: theme.spacing.md,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.sm,
        }}
      >
        <div 
          style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: theme.borderRadius.md,
            overflow: 'hidden',
            cursor: 'pointer',
          }}
          onClick={handleImageClick}
        >
          <img
            alt={ancestor.name}
            src={ancestor.profile_image_url}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.xs,
        }}>
          {ancestor.relation && (
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {ancestor.relation}
            </Text>
          )}
          <Title level={5} style={{ margin: 0 }}>
            {ancestor.name}
          </Title>
          <Text style={{ fontSize: '12px' }}>
            {ancestor.registration_id}
          </Text>
          {ancestor.champion_titles && ancestor.champion_titles.length > 0 && (
            <Space wrap>
              {ancestor.champion_titles.map((title, index) => (
                <Tag 
                  key={index}
                  color="gold"
                  style={{ 
                    margin: 0,
                    fontSize: '10px',
                    padding: '0 4px'
                  }}
                >
                  {title}
                </Tag>
              ))}
            </Space>
          )}
        </div>
      </Card>

      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <img
          alt={ancestor.name}
          src={ancestor.profile_image_url}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </Modal>
    </>
  );
};

export default DogAncestryCard; 