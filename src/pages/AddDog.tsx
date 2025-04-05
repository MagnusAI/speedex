import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Typography,
  Steps,
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

const { Header, Content } = Layout;
const { Title } = Typography;
const { Step } = Steps;
const { TextArea } = Input;

const AddDog: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // In a real application, this would send data to your backend
    console.log('Form values:', values);
    message.success('Dog added successfully!');
    navigate('/dogs');
  };

  const steps = [
    {
      title: 'Basic Information',
      content: (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the dog\'s name!' }]}
          >
            <Input placeholder="Enter dog's name" />
          </Form.Item>

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

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select the gender!' }]}
          >
            <Select placeholder="Select gender">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="birthDate"
            label="Birth Date"
            rules={[{ required: true, message: 'Please select the birth date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input a description!' }]}
          >
            <TextArea rows={4} placeholder="Enter a description of the dog" />
          </Form.Item>
        </Space>
      ),
    },
    {
      title: 'Images',
      content: (
        <Form.Item
          name="images"
          label="Dog Photos"
          rules={[{ required: true, message: 'Please upload at least one photo!' }]}
        >
          <Upload
            listType="picture-card"
            multiple
            beforeUpload={() => false} // Prevent automatic upload
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
      ),
    },
    {
      title: 'Achievements',
      content: (
        <Form.List name="achievements">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Achievement ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item
                    label="Title"
                    name={[field.name, 'title']}
                    rules={[{ required: true, message: 'Missing title' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Date"
                    name={[field.name, 'date']}
                    rules={[{ required: true, message: 'Missing date' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name={[field.name, 'description']}
                    rules={[{ required: true, message: 'Missing description' }]}
                  >
                    <TextArea rows={2} />
                  </Form.Item>
                  <Form.Item
                    label="Competition"
                    name={[field.name, 'competition']}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Placement"
                    name={[field.name, 'placement']}
                  >
                    <Input />
                  </Form.Item>
                </Card>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                + Add Achievement
              </Button>
            </div>
          )}
        </Form.List>
      ),
    },
    {
      title: 'Pedigree',
      content: (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Form.Item
            name={['pedigree', 'father']}
            label="Father"
            rules={[{ required: true, message: 'Please input the father\'s name!' }]}
          >
            <Input placeholder="Enter father's name" />
          </Form.Item>

          <Form.Item
            name={['pedigree', 'mother']}
            label="Mother"
            rules={[{ required: true, message: 'Please input the mother\'s name!' }]}
          >
            <Input placeholder="Enter mother's name" />
          </Form.Item>

          <Form.Item
            name={['pedigree', 'registrationNumber']}
            label="Registration Number"
          >
            <Input placeholder="Enter registration number" />
          </Form.Item>

          <Form.Item
            name={['pedigree', 'kennelClub']}
            label="Kennel Club"
          >
            <Input placeholder="Enter kennel club" />
          </Form.Item>
        </Space>
      ),
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: theme.colors.background }}>
      <Header style={{ 
        background: theme.colors.primary,
        padding: `0 ${theme.spacing.xl}px`,
        position: 'fixed',
        width: '100%',
        zIndex: 1,
      }}>
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Title level={3} style={{ color: theme.colors.lightText, margin: 0 }}>
              Add New Dog
            </Title>
          </Col>
        </Row>
      </Header>

      <Content style={{ 
        padding: `${theme.spacing.xxl}px ${theme.spacing.xl}px`,
        marginTop: 64,
      }}>
        <Card>
          <Steps current={currentStep} style={{ marginBottom: theme.spacing.xxl }}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 800, margin: '0 auto' }}
          >
            <div style={{ minHeight: 400 }}>{steps[currentStep].content}</div>

            <div style={{ marginTop: theme.spacing.xl }}>
              {currentStep > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              )}
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default AddDog; 