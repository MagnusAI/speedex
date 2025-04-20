import React from 'react';
import { Row, Col, Typography } from 'antd';
import { AncestryTree } from '../types/ancestry';
import DogAncestryCard from './DogAncestryCard';
import { theme } from '../styles/theme';

const { Title } = Typography;

interface DogAncestryTreeProps {
  tree: AncestryTree;
}

const DogAncestryTree: React.FC<DogAncestryTreeProps> = ({ tree }) => {
  return (
    <div style={{ 
      padding: theme.spacing.lg,
      overflowX: 'auto',
    }}>
      <Title level={3} style={{ marginBottom: theme.spacing.lg }}>Ancestry</Title>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.xl,
        minWidth: 'fit-content',
      }}>
        {/* Parents Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: theme.spacing.xl * 2,
        }}>
          {tree.mother && (
            <div style={{ width: '300px' }}>
              <DogAncestryCard 
                ancestor={{ ...tree.mother, relation: 'Mother' }}
              />
            </div>
          )}
          {tree.father && (
            <div style={{ width: '300px' }}>
              <DogAncestryCard 
                ancestor={{ ...tree.father, relation: 'Father' }}
              />
            </div>
          )}
        </div>

        {/* Grandparents Row */}
        {tree.grandparents && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: theme.spacing.xl,
          }}>
            {tree.grandparents.mothersMother && (
              <div style={{ width: '250px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.grandparents.mothersMother, relation: 'Maternal Grandmother' }}
                />
              </div>
            )}
            {tree.grandparents.mothersFather && (
              <div style={{ width: '250px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.grandparents.mothersFather, relation: 'Maternal Grandfather' }}
                />
              </div>
            )}
            {tree.grandparents.fathersMother && (
              <div style={{ width: '250px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.grandparents.fathersMother, relation: 'Paternal Grandmother' }}
                />
              </div>
            )}
            {tree.grandparents.fathersFather && (
              <div style={{ width: '250px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.grandparents.fathersFather, relation: 'Paternal Grandfather' }}
                />
              </div>
            )}
          </div>
        )}

        {/* Great Grandparents Row */}
        {tree.greatGrandparents && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: theme.spacing.lg,
          }}>
            {tree.greatGrandparents.mothersMothersParents?.mother && (
              <div style={{ width: '200px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.greatGrandparents.mothersMothersParents.mother, relation: 'Maternal Great Grandmother' }}
                />
              </div>
            )}
            {tree.greatGrandparents.mothersMothersParents?.father && (
              <div style={{ width: '200px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.greatGrandparents.mothersMothersParents.father, relation: 'Maternal Great Grandfather' }}
                />
              </div>
            )}
            {tree.greatGrandparents.mothersFathersParents?.mother && (
              <div style={{ width: '200px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.greatGrandparents.mothersFathersParents.mother, relation: 'Maternal Great Grandmother' }}
                />
              </div>
            )}
            {tree.greatGrandparents.mothersFathersParents?.father && (
              <div style={{ width: '200px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.greatGrandparents.mothersFathersParents.father, relation: 'Maternal Great Grandfather' }}
                />
              </div>
            )}
            {tree.greatGrandparents.fathersMothersParents?.mother && (
              <div style={{ width: '200px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.greatGrandparents.fathersMothersParents.mother, relation: 'Paternal Great Grandmother' }}
                />
              </div>
            )}
            {tree.greatGrandparents.fathersMothersParents?.father && (
              <div style={{ width: '200px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.greatGrandparents.fathersMothersParents.father, relation: 'Paternal Great Grandfather' }}
                />
              </div>
            )}
            {tree.greatGrandparents.fathersFathersParents?.mother && (
              <div style={{ width: '200px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.greatGrandparents.fathersFathersParents.mother, relation: 'Paternal Great Grandmother' }}
                />
              </div>
            )}
            {tree.greatGrandparents.fathersFathersParents?.father && (
              <div style={{ width: '200px' }}>
                <DogAncestryCard 
                  ancestor={{ ...tree.greatGrandparents.fathersFathersParents.father, relation: 'Paternal Great Grandfather' }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DogAncestryTree; 