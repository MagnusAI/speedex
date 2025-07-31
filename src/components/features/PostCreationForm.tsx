import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, Space } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { supabase } from '@/utils/supabase';
import { theme } from '@/styles/theme';
import type { UploadFile } from 'antd/es/upload/interface';
import ImagePreview from './ImagePreview';

const { TextArea } = Input;

interface PostCreationFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const PostCreationForm: React.FC<PostCreationFormProps> = ({ onSuccess, onCancel }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]);
    const [imagePosition, setImagePosition] = useState(50);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            // Upload image first
            if (fileList.length === 0) {
                throw new Error('Please upload an image');
            }

            const file = fileList[0].originFileObj;
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `post-images/${fileName}`;

            // Upload image to storage
            const { error: uploadError } = await supabase.storage
                .from('post_images')
                .upload(filePath, file, {
                    upsert: true,
                    cacheControl: '3600'
                });

            if (uploadError) {
                console.error('Upload error details:', uploadError);
                throw new Error(`Failed to upload image: ${uploadError.message}`);
            }

            // Get the public URL
            const { data: { publicUrl } } = supabase.storage
                .from('post_images')
                .getPublicUrl(filePath);

            // Create post record with image position
            const { error: insertError } = await supabase
                .from('posts')
                .insert([{
                    title: values.title,
                    description: values.description,
                    image: publicUrl,
                    image_position: imagePosition,
                    tags: values.tags ? values.tags.split(',').map((tag: string) => tag.trim()) : []
                }]);

            if (insertError) {
                throw new Error(`Failed to create post: ${insertError.message}`);
            }

            message.success('Post created successfully!');
            form.resetFields();
            setFileList([]);
            setPreviewUrl(null);
            onSuccess();
        } catch (error: any) {
            console.error('Error details:', error);
            message.error(`Failed to create post: ${error.message}`);
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
        if (fileList.length > 0) {
            const file = fileList[0];
            if (file.originFileObj) {
                const url = URL.createObjectURL(file.originFileObj);
                setPreviewUrl(url);
            }
        } else {
            setPreviewUrl(null);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ maxWidth: 600, margin: '0 auto', padding: theme.spacing.lg }}
        >
            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter a title' }]}
            >
                <Input placeholder="Enter post title" />
            </Form.Item>

            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter a description' }]}
            >
                <TextArea
                    placeholder="Enter post description"
                    autoSize={{ minRows: 4, maxRows: 8 }}
                />
            </Form.Item>

            <Form.Item
                name="tags"
                label="Tags"
                help="Enter tags separated by commas"
            >
                <Input placeholder="tag1, tag2, tag3" />
            </Form.Item>

            <Form.Item
                name="image"
                label="Image"
                rules={[{ required: true, message: 'Please upload an image!' }]}
            >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Upload
                        listType="picture-card"
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
                        {fileList.length >= 1 ? null : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                    {previewUrl && (
                        <ImagePreview
                            imageUrl={previewUrl}
                            onPositionChange={setImagePosition}
                        />
                    )}
                </Space>
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create Post
                    </Button>
                    <Button onClick={onCancel}>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default PostCreationForm; 