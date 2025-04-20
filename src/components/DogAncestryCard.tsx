import React, { useState } from 'react';
import { Card, Typography, Tag, Space, Modal } from 'antd';
import { Ancestor } from '../types/ancestry';
import { theme } from '../styles/theme';

const { Text, Title } = Typography;

interface DogAncestryCardProps {
  ancestor: Ancestor;
  layout?: 'vertical' | 'horizontal';
  simple?: boolean;
}

const DogAncestryCard: React.FC<DogAncestryCardProps> = ({ 
  ancestor,
  layout = 'horizontal',
  simple = false
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCardClick = () => {
    setIsModalVisible(true);
  };

  const renderContent = (isModal = false) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      flex: 1,
      minWidth: 0,
      justifyContent: 'center',
      paddingTop: layout === 'vertical' ? theme.spacing.sm : 0,
      paddingLeft: layout === 'vertical' ? theme.spacing.sm : theme.spacing.sm,
    }}>
      {ancestor.relation && (
        <Text type="secondary" style={{ fontSize: '10px' }}>
          {ancestor.relation}
        </Text>
      )}
      <Title level={5} style={{ margin: 0, fontSize: '14px' }}>
        {ancestor.name}
      </Title>
      {(!simple || isModal) && (
        <>
          <Text style={{ fontSize: '10px' }}>
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
                    fontSize: '8px',
                    padding: '0 4px',
                    lineHeight: '14px',
                  }}
                >
                  {title}
                </Tag>
              ))}
            </Space>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      <Card
        onClick={handleCardClick}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: theme.borderRadius.lg,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
        }}
        bodyStyle={{
          padding: theme.spacing.sm,
          height: '100%',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: layout === 'vertical' ? 'column' : 'row',
          height: '100%',
          width: '100%',
          gap: theme.spacing.sm,
        }}>
          {!simple && (
            <div 
              style={{
                width: layout === 'vertical' ? '100%' : '50%',
                height: layout === 'vertical' ? '60%' : '100%',
                flexShrink: 0,
                borderRadius: theme.borderRadius.md,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                alt={ancestor.name}
                src={ancestor.profile_image_url}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}

          {/* Content container */}
          {renderContent()}
        </div>
      </Card>

      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
          <img
            alt={ancestor.name}
            src={ancestor.profile_image_url}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: theme.borderRadius.md,
            }}
          />
          <div style={{ padding: theme.spacing.md }}>
            {renderContent(true)}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DogAncestryCard; 