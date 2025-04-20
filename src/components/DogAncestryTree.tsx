import React from 'react';
import { Typography, Row, Col } from 'antd';
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
                aspectRatio: '1/1',
                width: '100%',
                margin: '0 auto',
            }}>
                <Row style={{ height: '100%', width: '100%' }}>
                    {/* Parents Column - 2 cards */}
                    <Col style={{
                        height: '100%',
                        width: '40%',
                        padding: `0 ${theme.spacing.xs}px`,
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            gap: theme.spacing.md,
                        }}>
                            {tree.mother && (
                                <div style={{ flex: 1, width: '100%' }}>
                                    <DogAncestryCard
                                        ancestor={{ ...tree.mother, relation: 'Mother' }} layout='vertical'
                                    />
                                </div>
                            )}
                            {tree.father && (
                                <div style={{ flex: 1, width: '100%' }}>
                                    <DogAncestryCard
                                        ancestor={{ ...tree.father, relation: 'Father' }} layout='vertical'
                                    />
                                </div>
                            )}
                        </div>
                    </Col>

                    {/* Grandparents Column - 4 cards */}
                    <Col style={{
                        height: '100%',
                        width: '30%',
                        padding: `0 ${theme.spacing.xs}px`,
                    }}>
                        {tree.grandparents && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                gap: theme.spacing.md,
                            }}>
                                {tree.grandparents.mothersMother && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.grandparents.mothersMother, relation: 'Maternal Grandmother' }} layout='vertical'
                                        />
                                    </div>
                                )}
                                {tree.grandparents.mothersFather && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.grandparents.mothersFather, relation: 'Maternal Grandfather' }} layout='vertical'
                                        />
                                    </div>
                                )}
                                {tree.grandparents.fathersMother && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.grandparents.fathersMother, relation: 'Paternal Grandmother' }} layout='vertical'
                                        />
                                    </div>
                                )}
                                {tree.grandparents.fathersFather && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.grandparents.fathersFather, relation: 'Paternal Grandfather' }} layout='vertical'
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </Col>

                    {/* Great Grandparents Column - 8 cards */}
                    <Col style={{
                        height: '100%',
                        width: '30%',
                        padding: `0 ${theme.spacing.xs}px`,
                    }}>
                        {tree.greatGrandparents && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                gap: theme.spacing.md,
                            }}>
                                {tree.greatGrandparents.mothersMothersParents?.mother && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.mothersMothersParents.mother, relation: 'Maternal Great Grandmother' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.mothersMothersParents?.father && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.mothersMothersParents.father, relation: 'Maternal Great Grandfather' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.mothersFathersParents?.mother && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.mothersFathersParents.mother, relation: 'Maternal Great Grandmother' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.mothersFathersParents?.father && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.mothersFathersParents.father, relation: 'Maternal Great Grandfather' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.fathersMothersParents?.mother && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.fathersMothersParents.mother, relation: 'Paternal Great Grandmother' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.fathersMothersParents?.father && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.fathersMothersParents.father, relation: 'Paternal Great Grandfather' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.fathersFathersParents?.mother && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.fathersFathersParents.mother, relation: 'Paternal Great Grandmother' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.fathersFathersParents?.father && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.fathersFathersParents.father, relation: 'Paternal Great Grandfather' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DogAncestryTree;