import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { supabase } from '@/utils/supabase';
import { theme } from '@/styles/theme';
import ImagePreview from './ImagePreview';

const { TextArea } = Input;

interface Post {
    id: string;
    title: string;
    description: string;
    image: string | null;
    image_position: number;
    tags: string[];
}

interface EditPostFormProps {
    postId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ postId, onSuccess, onCancel }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState<Post | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imagePosition, setImagePosition] = useState(50);
    const [fileList, setFileList] = useState<any[]>([]);

    // Fetch post data
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', postId)
                    .single();

                if (error) throw error;

                setPost(data);
                form.setFieldsValue({
                    title: data.title,
                    description: data.description,
                    tags: data.tags.join(', ')
                });

                if (data.image) {
                    setPreviewUrl(data.image);
                    // Set initial file list with existing image
                    setFileList([{
                        uid: '-1',
                        name: 'current-image',
                        status: 'done',
                        url: data.image
                    }]);
                }
                setImagePosition(data.image_position || 50);
            } catch (error: any) {
                console.error('Error fetching post:', error);
                message.error('Failed to load post');
                onCancel();
            }
        };

        fetchPost();
    }, [postId, form, onCancel]);

    const handleSubmit = async (values: any) => {
        setLoading(true);

        try {
            const tags = values.tags
                .split(',')
                .map((tag: string) => tag.trim())
                .filter((tag: string) => tag.length > 0);

            const updateData: any = {
                title: values.title,
                description: values.description,
                tags,
                image_position: imagePosition
            };

            // Handle image updates
            if (fileList.length > 0 && fileList[0].originFileObj) {
                const file = fileList[0].originFileObj;
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `post-images/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('post_images')
                    .upload(filePath, file, {
                        upsert: true,
                        cacheControl: '3600'
                    });

                if (uploadError) throw uploadError;

                // Get the public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('post_images')
                    .getPublicUrl(filePath);

                // Delete old image
                if (post?.image) {
                    const oldImagePath = post.image.split('/').pop();
                    if (oldImagePath) {
                        await supabase.storage
                            .from('post_images')
                            .remove([`post-images/${oldImagePath}`]);
                    }
                }

                updateData.image = publicUrl;
            }

            const { error: updateError } = await supabase
                .from('posts')
                .update(updateData)
                .eq('id', postId);

            if (updateError) throw updateError;

            message.success('Post updated successfully');
            onSuccess();
        } catch (error: any) {
            console.error('Error updating post:', error);
            message.error('Failed to update post');
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
            } else if (file.url) {
                setPreviewUrl(file.url);
            }
        } else {
            setPreviewUrl(null);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

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
                                <UploadOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                    {previewUrl && (
                        <ImagePreview
                            imageUrl={previewUrl}
                            onPositionChange={setImagePosition}
                            initialPosition={post.image_position}
                        />
                    )}
                </Space>
            </Form.Item>

            <Form.Item>
                <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Update Post
                    </Button>
                    <Button onClick={onCancel}>
                        Cancel
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default EditPostForm; 