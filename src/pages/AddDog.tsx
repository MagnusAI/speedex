import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Typography,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  Space,
  Card,
  message,
  Row,
  Col,
} from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { theme } from '../styles/theme';
import { supabase } from '../utils/supabase';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile } from 'antd/es/upload';
import type { Dayjs } from 'dayjs';

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

interface Achievement {
  title: string;
  date: Dayjs;
  description?: string;
}

interface DogFormData {
  name: string;
  breed: string;
  description?: string;
  birthDate: Dayjs;
  achievements?: Achievement[];
  pedigree?: {
    father_id?: string;
    mother_id?: string;
  };
}

const AddDog: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const onFinish = async (values: DogFormData) => {
    setLoading(true);
    try {
      console.log('[AddDog] Starting form submission with values:', values);

      // Upload image if present
      let imageUrl = '';
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj as RcFile;
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `dog-images/${fileName}`;

        console.log('[AddDog] Uploading image:', filePath);
        const { error: uploadError } = await supabase.storage
          .from('dog-images')
          .upload(filePath, file);

        if (uploadError) {
          console.error('[AddDog] Error uploading image:', uploadError);
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('dog-images')
          .getPublicUrl(filePath);
        imageUrl = publicUrl;
        console.log('[AddDog] Image uploaded successfully:', publicUrl);
      }

      // Calculate age from birth date
      if (!values.birthDate) {
        throw new Error('Birth date is required');
      }
      const birthDate = values.birthDate.format('YYYY-MM-DD');
      const age = calculateAge(birthDate);

      // Insert dog record
      console.log('[AddDog] Inserting dog record');
      const { data: dog, error: dogError } = await supabase
        .from('dogs')
        .insert({
          name: values.name,
          breed: values.breed,
          description: values.description,
          image: imageUrl,
          age: age,
        })
        .select()
        .single();

      if (dogError) {
        console.error('[AddDog] Error inserting dog:', dogError);
        throw dogError;
      }
      console.log('[AddDog] Dog record created:', dog);

      // Insert achievements if any
      if (values.achievements && values.achievements.length > 0) {
        console.log('[AddDog] Inserting achievements');
        const achievements = values.achievements.map(achievement => ({
          dog_id: dog.id,
          title: achievement.title,
          date: achievement.date.format('YYYY-MM-DD'),
          description: achievement.description,
        }));

        const { error: achievementError } = await supabase
          .from('dog_achievements')
          .insert(achievements);

        if (achievementError) {
          console.error('[AddDog] Error inserting achievements:', achievementError);
          throw achievementError;
        }
        console.log('[AddDog] Achievements inserted successfully');
      }

      // Insert pedigree information if provided
      if (values.pedigree) {
        console.log('[AddDog] Inserting pedigree information');
        const { error: pedigreeError } = await supabase
          .from('dog_parents')
          .insert({
            dog_id: dog.id,
            father_id: values.pedigree.father_id ? parseInt(values.pedigree.father_id) : null,
            mother_id: values.pedigree.mother_id ? parseInt(values.pedigree.mother_id) : null,
          });

        if (pedigreeError) {
          console.error('[AddDog] Error inserting pedigree:', pedigreeError);
          throw pedigreeError;
        }
        console.log('[AddDog] Pedigree information inserted successfully');
      }

      message.success('Dog added successfully!');
      navigate('/dogs');
    } catch (error) {
      console.error('[AddDog] Error in form submission:', error);
      message.error('Failed to add dog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: theme.colors.background }}>
      <Content style={{ padding: '24px' }}>
        <Card>
          <Title level={2}>Add New Dog</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            disabled={loading}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input the dog\'s name!' }]}
                  >
                    <Input placeholder="Enter dog's name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="breed"
                    label="Breed"
                    rules={[{ required: true, message: 'Please select the breed!' }]}
                  >
                    <Select placeholder="Select breed">
                      <Select.Option value="Jack Russell Terrier">Jack Russell Terrier</Select.Option>
                      <Select.Option value="Norfolk Terrier">Norfolk Terrier</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="birthDate"
                    label="Birth Date"
                    rules={[{ required: true, message: 'Please select the birth date!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="image"
                    label="Photo"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                      if (Array.isArray(e)) {
                        return e;
                      }
                      return e?.fileList;
                    }}
                  >
                    <Upload
                      listType="picture-card"
                      maxCount={1}
                      beforeUpload={() => false}
                      onChange={({ fileList }) => setFileList(fileList)}
                    >
                      <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="description"
                label="Description"
              >
                <TextArea rows={4} placeholder="Enter a brief description" />
              </Form.Item>

              <Form.List name="achievements">
                {(fields, { add, remove }) => (
                  <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} style={{ background: theme.colors.background }}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                          <Row gutter={[16, 16]}>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, 'title']}
                                label="Title"
                                rules={[{ required: true, message: 'Missing title' }]}
                              >
                                <Input placeholder="Enter achievement title" />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, 'date']}
                                label="Date"
                                rules={[{ required: true, message: 'Missing date' }]}
                              >
                                <DatePicker style={{ width: '100%' }} />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Form.Item
                            {...restField}
                            name={[name, 'description']}
                            label="Description"
                          >
                            <TextArea rows={2} placeholder="Enter achievement description" />
                          </Form.Item>
                          <Button
                            type="text"
                            danger
                            onClick={() => remove(name)}
                            icon={<MinusCircleOutlined />}
                          >
                            Remove Achievement
                          </Button>
                        </Space>
                      </Card>
                    ))}
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Achievement
                    </Button>
                  </Space>
                )}
              </Form.List>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name={['pedigree', 'father_id']}
                    label="Father"
                  >
                    <Select
                      placeholder="Select father"
                      style={{ width: '100%' }}
                      showSearch
                      optionFilterProp="children"
                    >
                      {/* Options will be populated dynamically */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name={['pedigree', 'mother_id']}
                    label="Mother"
                  >
                    <Select
                      placeholder="Select mother"
                      style={{ width: '100%' }}
                      showSearch
                      optionFilterProp="children"
                    >
                      {/* Options will be populated dynamically */}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Add Dog
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default AddDog; 