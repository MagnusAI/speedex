import React, { useState, useEffect } from 'react';
import { Form, Input, Upload, Button, message, Card, Select, Row, Col, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { supabase } from '../utils/supabase';
import PageLayout from '../components/PageLayout';
import { Dog } from '../types/dog';
import { useNavigate, useParams } from 'react-router-dom';
import { theme } from '../styles/theme';

const { Option } = Select;

const DogsEdit: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]);
    const [breedType, setBreedType] = useState<string>('Jack Russell Terrier');
    const [currentDog, setCurrentDog] = useState<Dog | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchDog = async () => {
            try {
                // Decode the registration ID from the URL
                const registrationId = decodeURIComponent(id || '');

                const { data, error } = await supabase
                    .from('dogs')
                    .select('*')
                    .eq('id', registrationId)
                    .single();

                if (error) throw error;
                setCurrentDog(data);
                
                // Set form values
                form.setFieldsValue({
                    id: data.id,
                    name: data.name,
                    nickname: data.nickname,
                    breed: data.breed,
                    breeder: data.breeder,
                });

                // Set breed type
                setBreedType(data.breed);

                // Set current image
                if (data.image) {
                    setFileList([{
                        uid: '-1',
                        name: 'current-image',
                        status: 'done',
                        url: data.image,
                    }]);
                }
            } catch (error: any) {
                message.error(`Failed to fetch dog: ${error.message}`);
                navigate('/dogs');
            } finally {
                setInitialLoading(false);
            }
        };

        if (id) {
            fetchDog();
        }
    }, [id, form, navigate]);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            let imageUrl = currentDog?.image;

            // Handle image upload if a new image was selected
            if (fileList.length > 0 && fileList[0].originFileObj) {
                const file = fileList[0].originFileObj;
                const fileExt = file.name.split('.').pop();
                const fileName = `${values.id}.${fileExt}`;
                const filePath = `${fileName}`;

                // Upload image to storage
                const { error: uploadError } = await supabase.storage
                    .from('dog_images')
                    .upload(filePath, file, {
                        upsert: true,
                        cacheControl: '3600',
                    });

                if (uploadError) {
                    throw new Error(`Failed to upload image: ${uploadError.message}`);
                }

                // Get the public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('dog_images')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            // Update dog record
            const dog: Partial<Dog> = {
                name: values.name,
                nickname: values.nickname,
                breed: breedType === 'Other' ? values.otherBreed : breedType,
                image: imageUrl,
                breeder: values.breeder,
            };

            const { error: updateError } = await supabase
                .from('dogs')
                .update(dog)
                .eq('id', values.id);

            if (updateError) {
                throw new Error(`Failed to update dog record: ${updateError.message}`);
            }

            message.success('Dog updated successfully!');
            // Encode the registration ID for the URL
            navigate(`/dogs/${encodeURIComponent(values.id)}`);
        } catch (error: any) {
            console.error('Error details:', error);
            message.error(`Failed to update dog: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const beforeUpload = (file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
            return Upload.LIST_IGNORE;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
            return Upload.LIST_IGNORE;
        }
        return false;
    };

    const handleChange = ({ fileList }: { fileList: any[] }) => {
        setFileList(fileList);
    };

    if (initialLoading) {
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

    if (!currentDog) {
        return (
            <PageLayout>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '50vh'
                }}>
                    <Card>
                        <h2>Dog not found</h2>
                        <Button type="primary" onClick={() => navigate('/dogs')}>
                            Back to Dogs
                        </Button>
                    </Card>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <Row justify="center">
                <Col xs={24} sm={20} md={16} lg={12} xl={10}>
                    <Card 
                        title="Edit Dog" 
                        style={{ 
                            margin: `${theme.spacing.xl}px auto`,
                            maxWidth: 800,
                        }}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            autoComplete="off"
                            size="large"
                        >
                            <Form.Item
                                name="id"
                                label="Registration ID"
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please input the dog\'s name!' }]}
                            >
                                <Input placeholder="Enter dog's name" />
                            </Form.Item>

                            <Form.Item
                                name="nickname"
                                label="Nickname"
                            >
                                <Input placeholder="Enter dog's nickname (optional)" />
                            </Form.Item>

                            <Form.Item
                                name="breed"
                                label="Breed"
                                rules={[{ required: true, message: 'Please select the breed!' }]}
                            >
                                <Select
                                    value={breedType}
                                    onChange={setBreedType}
                                    placeholder="Select breed"
                                >
                                    <Option value="Jack Russell Terrier">Jack Russell Terrier</Option>
                                    <Option value="Norfolk Terrier">Norfolk Terrier</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            </Form.Item>

                            {breedType === 'Other' && (
                                <Form.Item
                                    name="otherBreed"
                                    label="Specify Breed"
                                    rules={[{ required: true, message: 'Please specify the breed!' }]}
                                >
                                    <Input placeholder="Enter breed name" />
                                </Form.Item>
                            )}

                            <Form.Item
                                name="breeder"
                                label="Breeder"
                                rules={[{ required: true, message: 'Please input the breeder\'s name!' }]}
                            >
                                <Input placeholder="Enter breeder's name" />
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Profile Image"
                                extra="Upload a new image to replace the current one"
                            >
                                <Upload
                                    listType="picture"
                                    maxCount={1}
                                    fileList={fileList}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    customRequest={({ onSuccess }) => {
                                        setTimeout(() => {
                                            onSuccess?.("ok");
                                        }, 0);
                                    }}
                                >
                                    <Button icon={<UploadOutlined />} block>
                                        Upload New Image
                                    </Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    loading={loading}
                                    block
                                    size="large"
                                >
                                    Update Dog
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </PageLayout>
    );
};

export default DogsEdit; 