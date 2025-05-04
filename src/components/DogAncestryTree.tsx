import React from 'react';
import { Typography, Row, Col, Skeleton, Card } from 'antd';
import { AncestryTree } from '../types/ancestry';
import DogAncestryCard from './DogAncestryCard';
import { theme } from '../styles/theme';

/**
 * Developer Log:
 * 2024-04-22: Implemented ancestor profile image upload functionality
 * - Created dedicated 'ancestor-images' storage bucket with appropriate security policies
 * - Added image upload support with proper validation (JPG/PNG, max 2MB)
 * - Implemented preview for existing images with option to replace
 * 
 * 2024-05-15: Added loading skeleton for ancestry tree visualization
 * - Created dimension-accurate skeleton UI that matches the layout of the loaded tree
 * - Used appropriate skeleton elements for different types of ancestor cards
 * - Implemented responsive layout that maintains proportions across all ancestry levels
 * - Added different card styles for parents (vertical), grandparents (horizontal) and great-grandparents (simple)
 */

const { Title } = Typography;

interface DogAncestryTreeProps {
    tree: AncestryTree | null;
}

const DogAncestryTree: React.FC<DogAncestryTreeProps> = ({ tree }) => {
    // If tree is null, show skeleton UI
    if (!tree) {
        return (
            <div style={{
                padding: theme.spacing.lg,
                overflow: 'hidden',
            }}>
                <Title level={3} style={{ marginBottom: theme.spacing.lg }}>Ancestry</Title>
                
                <div style={{
                    overflow: 'auto',
                    width: '100%',
                    maxWidth: '1100px',
                    minHeight: '680px',
                }}>
                    <Row style={{ minWidth: '600px' }}>
                        {/* Parents Column - 2 skeleton cards */}
                        <Col style={{
                            width: '100%',
                            maxWidth: '244px',
                            padding: `0 ${theme.spacing.xs}px`,
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                gap: theme.spacing.md,
                            }}>
                                <div style={{ flex: 1, width: '100%' }}>
                                    <Card 
                                        style={{ 
                                            width: '100%',
                                            borderRadius: theme.borderRadius.lg,
                                            height: '180px'
                                        }}
                                        bodyStyle={{ padding: theme.spacing.sm, height: '100%' }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                            <Skeleton.Image style={{ width: '100%', height: '60%' }} active />
                                            <div style={{ marginTop: theme.spacing.sm }}>
                                                <Skeleton.Input style={{ width: '30%', height: 16 }} active size="small" />
                                                <Skeleton.Input style={{ width: '70%', height: 20, marginTop: 8 }} active size="small" />
                                                <Skeleton.Input style={{ width: '50%', height: 16, marginTop: 8 }} active size="small" />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                                <div style={{ flex: 1, width: '100%' }}>
                                    <Card 
                                        style={{ 
                                            width: '100%',
                                            borderRadius: theme.borderRadius.lg,
                                            height: '180px'
                                        }}
                                        bodyStyle={{ padding: theme.spacing.sm, height: '100%' }}
                                    >
                                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                            <Skeleton.Image style={{ width: '100%', height: '60%' }} active />
                                            <div style={{ marginTop: theme.spacing.sm }}>
                                                <Skeleton.Input style={{ width: '30%', height: 16 }} active size="small" />
                                                <Skeleton.Input style={{ width: '70%', height: 20, marginTop: 8 }} active size="small" />
                                                <Skeleton.Input style={{ width: '50%', height: 16, marginTop: 8 }} active size="small" />
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </Col>

                        {/* Grandparents Column - 4 skeleton cards */}
                        <Col style={{
                            width: '100%',
                            maxWidth: '37%',
                            padding: `0 ${theme.spacing.xs}px`,
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                gap: theme.spacing.md,
                            }}>
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} style={{ flex: 1, width: '100%' }}>
                                        <Card 
                                            style={{ 
                                                width: '100%',
                                                borderRadius: theme.borderRadius.lg,
                                                height: '100px'
                                            }}
                                            bodyStyle={{ padding: theme.spacing.sm, height: '100%' }}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                                                <div style={{ width: '40%', height: '100%' }}>
                                                    <Skeleton.Image style={{ width: '100%', height: '100%' }} active />
                                                </div>
                                                <div style={{ width: '60%', paddingLeft: theme.spacing.sm }}>
                                                    <Skeleton.Input style={{ width: '40%', height: 14 }} active size="small" />
                                                    <Skeleton.Input style={{ width: '70%', height: 18, marginTop: 8 }} active size="small" />
                                                    <Skeleton.Input style={{ width: '50%', height: 14, marginTop: 8 }} active size="small" />
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Col>

                        {/* Great Grandparents Column - 8 skeleton cards */}
                        <Col style={{
                            width: '100%',
                            maxWidth: '20%',
                            padding: `0 ${theme.spacing.xs}px`,
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                gap: theme.spacing.md,
                            }}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                    <div key={item} style={{ flex: 1, width: '100%' }}>
                                        <Card 
                                            style={{ 
                                                width: '100%',
                                                borderRadius: theme.borderRadius.lg,
                                                height: '50px'
                                            }}
                                            bodyStyle={{ padding: theme.spacing.xs, height: '100%' }}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                                                <Skeleton.Input style={{ width: '40%', height: 12 }} active size="small" />
                                                <Skeleton.Input style={{ width: '70%', height: 16, marginTop: 4 }} active size="small" />
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            padding: theme.spacing.lg,
            overflow: 'hidden',
        }}>
            <Title level={3} style={{ marginBottom: theme.spacing.lg }}>Ancestry</Title>

            <div style={{
                overflow: 'auto',
                width: '100%',
                maxWidth: '1100px',
                minHeight: '680px',
            }}>
                <Row style={{ minWidth: '600px' }}>
                    {/* Parents Column - 2 cards */}
                    <Col style={{
                        width: '100%',
                        maxWidth: '244px',
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
                        width: '100%',
                        maxWidth: '37%',
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
                                            ancestor={{ ...tree.grandparents.mothersMother, relation: 'Maternal Grandmother' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                                {tree.grandparents.mothersFather && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.grandparents.mothersFather, relation: 'Maternal Grandfather' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                                {tree.grandparents.fathersMother && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.grandparents.fathersMother, relation: 'Paternal Grandmother' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                                {tree.grandparents.fathersFather && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.grandparents.fathersFather, relation: 'Paternal Grandfather' }} layout='horizontal'
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </Col>

                    {/* Great Grandparents Column - 8 cards */}
                    <Col style={{
                        width: '100%',
                        maxWidth: '20%',
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
                                            ancestor={{ ...tree.greatGrandparents.mothersMothersParents.mother, relation: 'Maternal Great Grandmother' }} simple
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.mothersMothersParents?.father && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.mothersMothersParents.father, relation: 'Maternal Great Grandfather' }} simple
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.mothersFathersParents?.mother && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.mothersFathersParents.mother, relation: 'Maternal Great Grandmother' }} simple
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.mothersFathersParents?.father && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.mothersFathersParents.father, relation: 'Maternal Great Grandfather' }} simple
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.fathersMothersParents?.mother && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.fathersMothersParents.mother, relation: 'Paternal Great Grandmother' }} simple
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.fathersMothersParents?.father && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.fathersMothersParents.father, relation: 'Paternal Great Grandfather' }} simple
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.fathersFathersParents?.mother && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.fathersFathersParents.mother, relation: 'Paternal Great Grandmother' }} simple
                                        />
                                    </div>
                                )}
                                {tree.greatGrandparents.fathersFathersParents?.father && (
                                    <div style={{ flex: 1, width: '100%' }}>
                                        <DogAncestryCard
                                            ancestor={{ ...tree.greatGrandparents.fathersFathersParents.father, relation: 'Paternal Great Grandfather' }} simple
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