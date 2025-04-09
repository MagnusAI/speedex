import React from 'react';
import { Card, Typography } from 'antd';
import { Dog } from '../types/dog';

const { Text } = Typography;

interface FamilyTreeProps {
  dog: Dog;
}

interface FamilyMember {
  id: number;
  name: string;
  parents?: {
    father?: FamilyMember;
    mother?: FamilyMember;
  };
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ dog }) => {
  const renderFamilyMember = (member: FamilyMember | null, relationship: string) => {
    if (!member) return null;
    
    return (
      <Card size="small" style={{ marginBottom: '8px' }}>
        <Text strong>{member.name}</Text>
        <br />
        <Text type="secondary">{relationship}</Text>
      </Card>
    );
  };

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <Text strong>Parents:</Text>
        <div style={{ marginLeft: '16px' }}>
          {dog.parents?.father && renderFamilyMember(dog.parents.father, 'Father')}
          {dog.parents?.mother && renderFamilyMember(dog.parents.mother, 'Mother')}
        </div>
      </div>

      {(dog.parents?.father?.parents || dog.parents?.mother?.parents) && (
        <div style={{ marginBottom: '16px' }}>
          <Text strong>Grandparents:</Text>
          <div style={{ marginLeft: '32px' }}>
            {dog.parents?.father?.parents?.father && renderFamilyMember(dog.parents.father.parents.father, 'Paternal Grandfather')}
            {dog.parents?.father?.parents?.mother && renderFamilyMember(dog.parents.father.parents.mother, 'Paternal Grandmother')}
            {dog.parents?.mother?.parents?.father && renderFamilyMember(dog.parents.mother.parents.father, 'Maternal Grandfather')}
            {dog.parents?.mother?.parents?.mother && renderFamilyMember(dog.parents.mother.parents.mother, 'Maternal Grandmother')}
          </div>
        </div>
      )}

      {(dog.parents?.father?.parents?.father?.parents || 
        dog.parents?.father?.parents?.mother?.parents || 
        dog.parents?.mother?.parents?.father?.parents || 
        dog.parents?.mother?.parents?.mother?.parents) && (
        <div>
          <Text strong>Great-Grandparents:</Text>
          <div style={{ marginLeft: '48px' }}>
            {dog.parents?.father?.parents?.father?.parents?.father && renderFamilyMember(dog.parents.father.parents.father.parents.father, 'Paternal Great-Grandfather (Father\'s Side)')}
            {dog.parents?.father?.parents?.father?.parents?.mother && renderFamilyMember(dog.parents.father.parents.father.parents.mother, 'Paternal Great-Grandmother (Father\'s Side)')}
            {dog.parents?.father?.parents?.mother?.parents?.father && renderFamilyMember(dog.parents.father.parents.mother.parents.father, 'Paternal Great-Grandfather (Mother\'s Side)')}
            {dog.parents?.father?.parents?.mother?.parents?.mother && renderFamilyMember(dog.parents.father.parents.mother.parents.mother, 'Paternal Great-Grandmother (Mother\'s Side)')}
            {dog.parents?.mother?.parents?.father?.parents?.father && renderFamilyMember(dog.parents.mother.parents.father.parents.father, 'Maternal Great-Grandfather (Father\'s Side)')}
            {dog.parents?.mother?.parents?.father?.parents?.mother && renderFamilyMember(dog.parents.mother.parents.father.parents.mother, 'Maternal Great-Grandmother (Father\'s Side)')}
            {dog.parents?.mother?.parents?.mother?.parents?.father && renderFamilyMember(dog.parents.mother.parents.mother.parents.father, 'Maternal Great-Grandfather (Mother\'s Side)')}
            {dog.parents?.mother?.parents?.mother?.parents?.mother && renderFamilyMember(dog.parents.mother.parents.mother.parents.mother, 'Maternal Great-Grandmother (Mother\'s Side)')}
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyTree; 