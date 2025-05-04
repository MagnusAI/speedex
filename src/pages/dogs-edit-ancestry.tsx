import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, message, Typography, Button, Form, Input, Upload, Card, Row, Col, Divider, Collapse } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { supabase } from '../utils/supabase';
import PageLayout from '../components/PageLayout';
import { Dog } from '../types/dog';
import { theme } from '../styles/theme';
import { Ancestor, AncestryTree } from '@/types/ancestry';
import { buildAncestryTree } from '@/services/ancestry';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

interface AncestorFormData {
  id: string;
  name: string;
  profile_image_url: string;
  champion_titles: string;
  registration_id: string;
}

interface DogAncestryForm {
  mother: AncestorFormData;
  father: AncestorFormData;
  mothersMother: AncestorFormData;
  mothersFather: AncestorFormData;
  fathersMother: AncestorFormData;
  fathersFather: AncestorFormData;
  // Great grandparents - mother's side
  mothersMothersMother: AncestorFormData;
  mothersMothersFather: AncestorFormData;
  mothersFathersMother: AncestorFormData;
  mothersFathersFather: AncestorFormData;
  // Great grandparents - father's side
  fathersMothersMother: AncestorFormData;
  fathersMothersFather: AncestorFormData;
  fathersFathersMother: AncestorFormData;
  fathersFathersFather: AncestorFormData;
}

const DogsEditAncestry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [dog, setDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const registrationId = decodeURIComponent(id || '');

        const { data, error } = await supabase
          .from('dogs')
          .select('*')
          .eq('id', registrationId)
          .single();

        if (error) throw error;
        setDog(data);
      } catch (error) {
        message.error('Failed to fetch dog details');
        console.error('Error fetching dog:', error);
      }
    };

    const fetchAncestryTree = async () => {
      try {
        const registrationId = decodeURIComponent(id || '');

        if (registrationId) {
          const tree = await buildAncestryTree(registrationId);
          
          // Initialize form values from the tree
          const initialValues: DogAncestryForm = {
            // Parents
            mother: {
              id: tree.mother?.id || '',
              name: tree.mother?.name || '',
              profile_image_url: tree.mother?.profile_image_url || '',
              champion_titles: (tree.mother?.champion_titles || []).join(', '),
              registration_id: tree.mother?.registration_id || '',
            },
            father: {
              id: tree.father?.id || '',
              name: tree.father?.name || '',
              profile_image_url: tree.father?.profile_image_url || '',
              champion_titles: (tree.father?.champion_titles || []).join(', '),
              registration_id: tree.father?.registration_id || '',
            },
            // Grandparents
            mothersMother: {
              id: tree.grandparents?.mothersMother?.id || '',
              name: tree.grandparents?.mothersMother?.name || '',
              profile_image_url: tree.grandparents?.mothersMother?.profile_image_url || '',
              champion_titles: (tree.grandparents?.mothersMother?.champion_titles || []).join(', '),
              registration_id: tree.grandparents?.mothersMother?.registration_id || '',
            },
            mothersFather: {
              id: tree.grandparents?.mothersFather?.id || '',
              name: tree.grandparents?.mothersFather?.name || '',
              profile_image_url: tree.grandparents?.mothersFather?.profile_image_url || '',
              champion_titles: (tree.grandparents?.mothersFather?.champion_titles || []).join(', '),
              registration_id: tree.grandparents?.mothersFather?.registration_id || '',
            },
            fathersMother: {
              id: tree.grandparents?.fathersMother?.id || '',
              name: tree.grandparents?.fathersMother?.name || '',
              profile_image_url: tree.grandparents?.fathersMother?.profile_image_url || '',
              champion_titles: (tree.grandparents?.fathersMother?.champion_titles || []).join(', '),
              registration_id: tree.grandparents?.fathersMother?.registration_id || '',
            },
            fathersFather: {
              id: tree.grandparents?.fathersFather?.id || '',
              name: tree.grandparents?.fathersFather?.name || '',
              profile_image_url: tree.grandparents?.fathersFather?.profile_image_url || '',
              champion_titles: (tree.grandparents?.fathersFather?.champion_titles || []).join(', '),
              registration_id: tree.grandparents?.fathersFather?.registration_id || '',
            },
            // Great Grandparents - Mother's side
            mothersMothersMother: {
              id: tree.greatGrandparents?.mothersMothersParents?.mother?.id || '',
              name: tree.greatGrandparents?.mothersMothersParents?.mother?.name || '',
              profile_image_url: tree.greatGrandparents?.mothersMothersParents?.mother?.profile_image_url || '',
              champion_titles: (tree.greatGrandparents?.mothersMothersParents?.mother?.champion_titles || []).join(', '),
              registration_id: tree.greatGrandparents?.mothersMothersParents?.mother?.registration_id || '',
            },
            mothersMothersFather: {
              id: tree.greatGrandparents?.mothersMothersParents?.father?.id || '',
              name: tree.greatGrandparents?.mothersMothersParents?.father?.name || '',
              profile_image_url: tree.greatGrandparents?.mothersMothersParents?.father?.profile_image_url || '',
              champion_titles: (tree.greatGrandparents?.mothersMothersParents?.father?.champion_titles || []).join(', '),
              registration_id: tree.greatGrandparents?.mothersMothersParents?.father?.registration_id || '',
            },
            mothersFathersMother: {
              id: tree.greatGrandparents?.mothersFathersParents?.mother?.id || '',
              name: tree.greatGrandparents?.mothersFathersParents?.mother?.name || '',
              profile_image_url: tree.greatGrandparents?.mothersFathersParents?.mother?.profile_image_url || '',
              champion_titles: (tree.greatGrandparents?.mothersFathersParents?.mother?.champion_titles || []).join(', '),
              registration_id: tree.greatGrandparents?.mothersFathersParents?.mother?.registration_id || '',
            },
            mothersFathersFather: {
              id: tree.greatGrandparents?.mothersFathersParents?.father?.id || '',
              name: tree.greatGrandparents?.mothersFathersParents?.father?.name || '',
              profile_image_url: tree.greatGrandparents?.mothersFathersParents?.father?.profile_image_url || '',
              champion_titles: (tree.greatGrandparents?.mothersFathersParents?.father?.champion_titles || []).join(', '),
              registration_id: tree.greatGrandparents?.mothersFathersParents?.father?.registration_id || '',
            },
            // Great Grandparents - Father's side
            fathersMothersMother: {
              id: tree.greatGrandparents?.fathersMothersParents?.mother?.id || '',
              name: tree.greatGrandparents?.fathersMothersParents?.mother?.name || '',
              profile_image_url: tree.greatGrandparents?.fathersMothersParents?.mother?.profile_image_url || '',
              champion_titles: (tree.greatGrandparents?.fathersMothersParents?.mother?.champion_titles || []).join(', '),
              registration_id: tree.greatGrandparents?.fathersMothersParents?.mother?.registration_id || '',
            },
            fathersMothersFather: {
              id: tree.greatGrandparents?.fathersMothersParents?.father?.id || '',
              name: tree.greatGrandparents?.fathersMothersParents?.father?.name || '',
              profile_image_url: tree.greatGrandparents?.fathersMothersParents?.father?.profile_image_url || '',
              champion_titles: (tree.greatGrandparents?.fathersMothersParents?.father?.champion_titles || []).join(', '),
              registration_id: tree.greatGrandparents?.fathersMothersParents?.father?.registration_id || '',
            },
            fathersFathersMother: {
              id: tree.greatGrandparents?.fathersFathersParents?.mother?.id || '',
              name: tree.greatGrandparents?.fathersFathersParents?.mother?.name || '',
              profile_image_url: tree.greatGrandparents?.fathersFathersParents?.mother?.profile_image_url || '',
              champion_titles: (tree.greatGrandparents?.fathersFathersParents?.mother?.champion_titles || []).join(', '),
              registration_id: tree.greatGrandparents?.fathersFathersParents?.mother?.registration_id || '',
            },
            fathersFathersFather: {
              id: tree.greatGrandparents?.fathersFathersParents?.father?.id || '',
              name: tree.greatGrandparents?.fathersFathersParents?.father?.name || '',
              profile_image_url: tree.greatGrandparents?.fathersFathersParents?.father?.profile_image_url || '',
              champion_titles: (tree.greatGrandparents?.fathersFathersParents?.father?.champion_titles || []).join(', '),
              registration_id: tree.greatGrandparents?.fathersFathersParents?.father?.registration_id || '',
            },
          };
          
          form.setFieldsValue(initialValues);
        }
      } catch (error) {
        console.error('Error fetching ancestry tree:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDog();
      fetchAncestryTree();
    }
  }, [id, form]);

  // Function to save an ancestor to the ancestors table
  const saveAncestor = async (dogId: string, ancestor: AncestorFormData, relation: string) => {
    // Skip if empty ancestor
    if (!ancestor.name && !ancestor.registration_id) {
      return;
    }

    try {
      // Check if ancestor already exists
      const { data: existingAncestor, error: fetchError } = await supabase
        .from('ancestors')
        .select('*')
        .eq('dog_id', dogId)
        .eq('relation', relation)
        .single();

      const championTitles = ancestor.champion_titles
        ? ancestor.champion_titles.split(',').map(title => title.trim())
        : [];

      if (!existingAncestor) {
        // Insert new ancestor
        const { error } = await supabase
          .from('ancestors')
          .insert({
            dog_id: dogId,
            ancestor_id: ancestor.registration_id,
            relation,
            name: ancestor.name,
            profile_image_url: ancestor.profile_image_url,
            champion_titles: championTitles,
          });

        if (error) throw error;
      } else {
        // Update existing ancestor
        const { error } = await supabase
          .from('ancestors')
          .update({
            ancestor_id: ancestor.registration_id,
            name: ancestor.name,
            profile_image_url: ancestor.profile_image_url,
            champion_titles: championTitles,
          })
          .eq('id', existingAncestor.id);

        if (error) throw error;
      }
    } catch (error) {
      console.error(`Error saving ${relation}:`, error);
      throw error;
    }
  };

  const handleSubmit = async (values: DogAncestryForm) => {
    if (!dog) return;
    
    const dogId = decodeURIComponent(id || '');
    
    setSubmitting(true);
    try {
      // Save direct ancestors for the current dog
      await saveAncestor(dogId, values.mother, 'mother');
      await saveAncestor(dogId, values.father, 'father');

      // For the grandparents, we need to create separate entries in the ancestors table
      // using the mother's and father's registration IDs as the dog_id
      
      // Mother's parents (only if mother has a registration ID)
      if (values.mother.registration_id) {
        await saveAncestor(values.mother.registration_id, values.mothersMother, 'mother');
        await saveAncestor(values.mother.registration_id, values.mothersFather, 'father');
        
        // Mother's mother's parents
        if (values.mothersMother.registration_id) {
          await saveAncestor(values.mothersMother.registration_id, values.mothersMothersMother, 'mother');
          await saveAncestor(values.mothersMother.registration_id, values.mothersMothersFather, 'father');
        }
        
        // Mother's father's parents
        if (values.mothersFather.registration_id) {
          await saveAncestor(values.mothersFather.registration_id, values.mothersFathersMother, 'mother');
          await saveAncestor(values.mothersFather.registration_id, values.mothersFathersFather, 'father');
        }
      }

      // Father's parents (only if father has a registration ID)
      if (values.father.registration_id) {
        await saveAncestor(values.father.registration_id, values.fathersMother, 'mother');
        await saveAncestor(values.father.registration_id, values.fathersFather, 'father');
        
        // Father's mother's parents
        if (values.fathersMother.registration_id) {
          await saveAncestor(values.fathersMother.registration_id, values.fathersMothersMother, 'mother');
          await saveAncestor(values.fathersMother.registration_id, values.fathersMothersFather, 'father');
        }
        
        // Father's father's parents
        if (values.fathersFather.registration_id) {
          await saveAncestor(values.fathersFather.registration_id, values.fathersFathersMother, 'mother');
          await saveAncestor(values.fathersFather.registration_id, values.fathersFathersFather, 'father');
        }
      }

      message.success('Ancestry updated successfully');
      navigate(`/dogs/${encodeURIComponent(dog.id)}`);
    } catch (error) {
      message.error('Failed to update ancestry');
      console.error('Error updating ancestry:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  if (loading) {
    return (
      <PageLayout>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh'
        }}>
          <Spin size="large" />
        </div>
      </PageLayout>
    );
  }

  if (!dog) {
    return (
      <PageLayout>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
          gap: theme.spacing.md
        }}>
          <Title level={3}>Dog not found</Title>
          <Button
            type="primary"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dogs')}
          >
            Back to Dogs
          </Button>
        </div>
      </PageLayout>
    );
  }

  const renderAncestorForm = (ancestorName: string, fieldPrefix: string, required: boolean = false) => (
    <Card
      variant="outlined"
      title={ancestorName}
      style={{ marginBottom: theme.spacing.md }}
    >
      <Form.Item
        name={[fieldPrefix, 'registration_id']}
        label="Registration ID"
        rules={[{ required, message: 'Please input the registration ID' }]}
      >
        <Input placeholder="Registration ID" />
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'name']}
        label="Name"
        rules={[{ required, message: 'Please input the name' }]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'profile_image_url']}
        label="Profile Image URL"
      >
        <Input placeholder="Image URL" />
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'champion_titles']}
        label="Champion Titles"
        help="Separate multiple titles with commas"
      >
        <Input placeholder="Champion titles (comma separated)" />
      </Form.Item>
    </Card>
  );

  return (
    <PageLayout>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <Title level={2}>Edit Ancestry: {dog.name}</Title>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(`/dogs/${encodeURIComponent(dog.id)}`)}
          >
            Back to Details
          </Button>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ marginBottom: theme.spacing.xl }}
        >
          <Divider orientation="left">Parents</Divider>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              {renderAncestorForm('Mother', 'mother', true)}
            </Col>
            <Col xs={24} md={12}>
              {renderAncestorForm('Father', 'father', true)}
            </Col>
          </Row>

          <Divider orientation="left">Grandparents (Mother's Side)</Divider>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              {renderAncestorForm('Grandmother (Mother\'s Mother)', 'mothersMother')}
            </Col>
            <Col xs={24} md={12}>
              {renderAncestorForm('Grandfather (Mother\'s Father)', 'mothersFather')}
            </Col>
          </Row>

          <Divider orientation="left">Grandparents (Father's Side)</Divider>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              {renderAncestorForm('Grandmother (Father\'s Mother)', 'fathersMother')}
            </Col>
            <Col xs={24} md={12}>
              {renderAncestorForm('Grandfather (Father\'s Father)', 'fathersFather')}
            </Col>
          </Row>

          <Collapse 
            style={{ marginTop: theme.spacing.lg, marginBottom: theme.spacing.lg }}
            defaultActiveKey={[]}
            items={[
              {
                key: '1',
                label: "Great Grandparents (Mother's Mother's Side)",
                children: (
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      {renderAncestorForm('Great Grandmother', 'mothersMothersMother')}
                    </Col>
                    <Col xs={24} md={12}>
                      {renderAncestorForm('Great Grandfather', 'mothersMothersFather')}
                    </Col>
                  </Row>
                )
              },
              {
                key: '2',
                label: "Great Grandparents (Mother's Father's Side)",
                children: (
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      {renderAncestorForm('Great Grandmother', 'mothersFathersMother')}
                    </Col>
                    <Col xs={24} md={12}>
                      {renderAncestorForm('Great Grandfather', 'mothersFathersFather')}
                    </Col>
                  </Row>
                )
              },
              {
                key: '3',
                label: "Great Grandparents (Father's Mother's Side)",
                children: (
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      {renderAncestorForm('Great Grandmother', 'fathersMothersMother')}
                    </Col>
                    <Col xs={24} md={12}>
                      {renderAncestorForm('Great Grandfather', 'fathersMothersFather')}
                    </Col>
                  </Row>
                )
              },
              {
                key: '4',
                label: "Great Grandparents (Father's Father's Side)",
                children: (
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      {renderAncestorForm('Great Grandmother', 'fathersFathersMother')}
                    </Col>
                    <Col xs={24} md={12}>
                      {renderAncestorForm('Great Grandfather', 'fathersFathersFather')}
                    </Col>
                  </Row>
                )
              }
            ]}
          />

          <Form.Item style={{ marginTop: theme.spacing.xl }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={submitting}
              style={{ minWidth: '120px' }}
            >
              Save Ancestry
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  );
};

export default DogsEditAncestry; 