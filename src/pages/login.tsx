import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout';

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: { email: string; password: string }) => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) {
                throw error;
            }

            message.success('Successfully logged in!');
            navigate('/');
        } catch (error: any) {
            message.error(`Login failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageLayout>
            <Card title="Login" style={{ maxWidth: 400, margin: '0 auto' }}>
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </PageLayout>
    );
};

export default Login; 