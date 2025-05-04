import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, message, Typography, Button, Form, Input, Upload, Card, Row, Col, Divider, Collapse, Image } from 'antd';
import { ArrowLeftOutlined, SaveOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { supabase } from '../utils/supabase';
import PageLayout from '../components/PageLayout';
import { Dog } from '../types/dog';
import { theme } from '../styles/theme';
import { Ancestor, AncestryTree } from '@/types/ancestry';
import { buildAncestryTree } from '@/services/ancestry';

/**
 * Developer Log:
 * 2024-04-22: Implemented ancestor profile image upload functionality
 * - Created dedicated 'ancestor-images' storage bucket with appropriate security policies
 * - Added image upload support with proper validation (JPG/PNG, max 2MB)
 * - Implemented preview for existing images with option to replace
 * - Added proper loading states during upload process
 * - Used structured filepath with ancestor prefix and timestamps
 * - Maintained clean state management and form integration
 */

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
  const [uploading, setUploading] = useState<{[key: string]: boolean}>({});
  const [fileList, setFileList] = useState<{[key: string]: any[]}>({});

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
          
          // Initialize file lists based on existing images
          const newFileList: {[key: string]: any[]} = {};
          Object.keys(initialValues).forEach(key => {
            const url = initialValues[key as keyof DogAncestryForm].profile_image_url;
            if (url) {
              newFileList[key] = [{
                uid: `-1-${key}`,
                name: `${key}-image.jpg`,
                status: 'done',
                url: url
              }];
            } else {
              newFileList[key] = [];
            }
          });
          setFileList(newFileList);
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
  const saveAncestor = async (dogId: string, ancestor: AncestorFormData | undefined | null, relation: string) => {
    // Skip if ancestor is undefined, null, or has no name and registration_id
    if (!ancestor || (!ancestor.name && !ancestor.registration_id)) {
      console.log(`Skipping empty ancestor for relation: ${relation}`);
      return;
    }

    try {
      // Check if ancestor already exists for this dog and relation
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
        // Insert new ancestor - ancestor_id is the registration ID of the ancestor
        const { error } = await supabase
          .from('ancestors')
          .insert({
            dog_id: dogId,
            ancestor_id: ancestor.registration_id,
            relation,
            name: ancestor.name,
            profile_image_url: ancestor.profile_image_url || '',
            champion_titles: championTitles,
          });

        if (error) {
          console.error(`Error inserting ancestor (${relation}) for dog ${dogId}:`, error);
          throw error;
        }
      } else {
        // Update existing ancestor - use UUID as the primary key for updates
        const { error } = await supabase
          .from('ancestors')
          .update({
            ancestor_id: ancestor.registration_id,
            name: ancestor.name,
            profile_image_url: ancestor.profile_image_url || '',
            champion_titles: championTitles,
          })
          .eq('id', existingAncestor.id);

        if (error) {
          console.error(`Error updating ancestor (${relation}) with ID ${existingAncestor.id}:`, error);
          throw error;
        }
      }
    } catch (error) {
      console.error(`Error saving ${relation} for dog ${dogId}:`, error);
      throw error;
    }
  };

  const handleSubmit = async (values: DogAncestryForm) => {
    if (!dog) return;
    
    // Main dog ID from URL - this is the only dog_id we'll use
    const dogId = decodeURIComponent(id || '');
    
    setSubmitting(true);
    try {
      // Helper function to validate registration ID
      const isValidRegistrationId = (id?: string): boolean => {
        return !!id && id !== 'undefined' && id !== 'null' && id.trim() !== '';
      };

      // IMPORTANT: All ancestors are attached directly to the main dog
      // We use the 'relation' field to indicate the relationship
      
      // Save direct parents with relation 'mother' and 'father'
      console.log('Saving direct parents for dog ID:', dogId);
      await saveAncestor(dogId, values.mother, 'mother');
      await saveAncestor(dogId, values.father, 'father');
      
      // Save grandparents with specific relation identifiers
      console.log('Saving grandparents for dog ID:', dogId);
      
      // Only attempt to save ancestors that have data
      // Wrap each call in a try/catch to prevent one failure from stopping the others
      try { await saveAncestor(dogId, values.mothersMother, 'mothers_mother'); } catch (e) { console.error(e); }
      try { await saveAncestor(dogId, values.mothersFather, 'mothers_father'); } catch (e) { console.error(e); }
      try { await saveAncestor(dogId, values.fathersMother, 'fathers_mother'); } catch (e) { console.error(e); }
      try { await saveAncestor(dogId, values.fathersFather, 'fathers_father'); } catch (e) { console.error(e); }
      
      // Save great-grandparents with specific relation identifiers
      console.log('Saving great-grandparents for dog ID:', dogId);
      
      // Mother's side - with error handling for each ancestor
      try { await saveAncestor(dogId, values.mothersMothersMother, 'mothers_mothers_mother'); } catch (e) { console.error(e); }
      try { await saveAncestor(dogId, values.mothersMothersFather, 'mothers_mothers_father'); } catch (e) { console.error(e); }
      try { await saveAncestor(dogId, values.mothersFathersMother, 'mothers_fathers_mother'); } catch (e) { console.error(e); }
      try { await saveAncestor(dogId, values.mothersFathersFather, 'mothers_fathers_father'); } catch (e) { console.error(e); }
      
      // Father's side - with error handling for each ancestor
      try { await saveAncestor(dogId, values.fathersMothersMother, 'fathers_mothers_mother'); } catch (e) { console.error(e); }
      try { await saveAncestor(dogId, values.fathersMothersFather, 'fathers_mothers_father'); } catch (e) { console.error(e); }
      try { await saveAncestor(dogId, values.fathersFathersMother, 'fathers_fathers_mother'); } catch (e) { console.error(e); }
      try { await saveAncestor(dogId, values.fathersFathersFather, 'fathers_fathers_father'); } catch (e) { console.error(e); }

      message.success('Ancestry updated successfully');
      navigate(`/dogs/${encodeURIComponent(dog.id)}`);
    } catch (error) {
      message.error('Failed to update ancestry');
      console.error('Error updating ancestry:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle image upload to Supabase storage
  const handleImageUpload = async (file: File, fieldPrefix: string): Promise<string> => {
    try {
      // Mark this field as uploading
      setUploading(prev => ({ ...prev, [fieldPrefix]: true }));
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${fieldPrefix}-${Date.now()}.${fileExt}`;
      const filePath = `ancestor-images/${fileName}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('ancestor-images')
        .upload(filePath, file, {
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('ancestor-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Failed to upload image');
      throw error;
    } finally {
      // Mark as no longer uploading
      setUploading(prev => ({ ...prev, [fieldPrefix]: false }));
    }
  };

  // Handle file list change for uploads
  const handleFileChange = async (info: any, fieldPrefix: string) => {
    // Update the file list in state
    const newFileList = [...info.fileList].slice(-1); // Only keep the last file
    setFileList(prev => ({ ...prev, [fieldPrefix]: newFileList }));
    
    // Handle different file statuses
    const { status, originFileObj } = info.file;
    
    if (status === 'removed') {
      // Clear the image URL in form when file is removed
      const currentValues = form.getFieldValue(fieldPrefix) || {};
      form.setFieldsValue({
        [fieldPrefix]: {
          ...currentValues,
          profile_image_url: ''
        }
      });
      return;
    }
    
    if (status === 'done' || status === 'uploading') {
      if (originFileObj && !uploading[fieldPrefix]) {
        try {
          // Upload the file and get the URL
          const url = await handleImageUpload(originFileObj, fieldPrefix);
          
          // Update form with the new URL
          const currentValues = form.getFieldValue(fieldPrefix) || {};
          form.setFieldsValue({
            [fieldPrefix]: {
              ...currentValues,
              profile_image_url: url
            }
          });
        } catch (error) {
          console.error('Error handling file:', error);
        }
      }
    }
  };

  // Custom upload request to handle our own upload logic
  const customRequest = ({ file, onSuccess, onError }: any) => {
    // We handle the actual upload in handleFileChange
    // This is just to keep the Ant Design Upload component happy
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const renderAncestorForm = (ancestorName: string, fieldPrefix: string, required: boolean = false) => {
    const currentValue = form.getFieldValue(fieldPrefix) || {};
    const imageUrl = currentValue.profile_image_url;
    const currentFileList = fileList[fieldPrefix] || [];
    const isUploading = uploading[fieldPrefix];

    return (
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

        {/* Hidden field to store the image URL */}
        <Form.Item 
          name={[fieldPrefix, 'profile_image_url']} 
          hidden
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Profile Image"
        >
          {imageUrl && (
            <div style={{ marginBottom: 16 }}>
              <Image
                src={imageUrl}
                alt={`${ancestorName}'s profile`}
                style={{ maxHeight: 150, maxWidth: '100%' }}
              />
            </div>
          )}
          <Upload
            listType="picture-card"
            fileList={currentFileList}
            onChange={(info) => handleFileChange(info, fieldPrefix)}
            customRequest={customRequest}
            maxCount={1}
            beforeUpload={(file) => {
              // Validate file type and size
              const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
              if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG files!');
                return false;
              }
              const isLt2M = file.size / 1024 / 1024 < 2;
              if (!isLt2M) {
                message.error('Image must be smaller than 2MB!');
                return false;
              }
              return true;
            }}
          >
            {currentFileList.length < 1 && (
              <div>
                {isUploading ? <Spin /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
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