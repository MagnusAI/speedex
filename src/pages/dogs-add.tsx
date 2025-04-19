import React, { useState } from 'react';
import { Form, Input, Upload, Button, message, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { supabase } from '../utils/supabase';
import PageLayout from '../components/page-layout';
import { Dog } from '../types/dog';
import { useNavigate } from 'react-router-dom';

const DogsAdd: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // Upload image first
            if (fileList.length === 0) {
                throw new Error('Please upload an image');
            }

            const file = fileList[0].originFileObj;
            const fileExt = file.name.split('.').pop();
            const fileName = `${values.id}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload image to storage
            const { error: uploadError } = await supabase.storage
                .from('dog_images')
                .upload(filePath, file, {
                    upsert: true, // Allow overwriting if file exists
                    cacheControl: '3600',
                });

            if (uploadError) {
                console.error('Upload error details:', uploadError);
                throw new Error(`Failed to upload image: ${uploadError.message}`);
            }

            // Get the public URL
            const { data: { publicUrl } } = supabase.storage
                .from('dog_images')
                .getPublicUrl(filePath);

            // Create dog record
            const dog: Omit<Dog, 'created_at' | 'updated_at'> = {
                id: values.id,
                name: values.name,
                nickname: values.nickname,
                breed: values.breed,
                image: publicUrl,
                breeder: values.breeder,
            };

            const { error: insertError } = await supabase
                .from('dogs')
                .insert([dog]);

            if (insertError) {
                throw new Error(`Failed to create dog record: ${insertError.message}`);
            }

            message.success('Dog added successfully!');
            form.resetFields();
            setFileList([]);
            navigate('/dogs');
        } catch (error: any) {
            console.error('Error details:', error);
            message.error(`Failed to add dog: ${error.message}`);
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
        return false; // Prevent automatic upload
    };

    const handleChange = ({ fileList }: { fileList: any[] }) => {
        setFileList(fileList);
    };

    return (
        <PageLayout>
            <Card title="Add New Dog" style={{ maxWidth: 800, margin: '0 auto' }}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="id"
                        label="Registration ID"
                        rules={[{ required: true, message: 'Please input the registration ID!' }]}
                    >
                        <Input placeholder="Enter official registration ID" />
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
                        rules={[{ required: true, message: 'Please input the breed!' }]}
                    >
                        <Input placeholder="Enter breed" />
                    </Form.Item>

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
                        rules={[{ required: true, message: 'Please upload an image!' }]}
                    >
                        <Upload
                            listType="picture"
                            maxCount={1}
                            fileList={fileList}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            customRequest={({ onSuccess }) => {
                                // This is a no-op since we handle upload in form submission
                                setTimeout(() => {
                                    onSuccess?.("ok");
                                }, 0);
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Add Dog
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </PageLayout>
    );
};

export default DogsAdd;