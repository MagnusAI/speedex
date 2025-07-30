import React, { useState } from 'react';
import { Modal, Form, DatePicker, Button, message, Input, Select, Space, Typography } from 'antd';
import { updatePuppiesSettings, PuppiesStatus, isValidUrl } from '../services/puppies';
import dayjs from 'dayjs';

const { Text } = Typography;
const { Option } = Select;

interface ExpectedDateEditorProps {
    currentStatus: PuppiesStatus;
    onStatusUpdated: () => void;
    onCancel: () => void;
}

const ExpectedDateEditor: React.FC<ExpectedDateEditorProps> = ({
    currentStatus,
    onStatusUpdated,
    onCancel
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const settings: {
                expectedDate?: string;
                listingUrl?: string;
                displayStatus?: 'active' | 'inactive' | 'hidden';
            } = {};

            // Handle date
            if (values.date) {
                settings.expectedDate = values.date.format('YYYY-MM-DD');
            } else {
                settings.expectedDate = '';
            }

            // Handle URL
            if (values.listingUrl) {
                if (!isValidUrl(values.listingUrl)) {
                    message.error('Ugyldig URL format');
                    setLoading(false);
                    return;
                }
                settings.listingUrl = values.listingUrl;
            } else {
                settings.listingUrl = '';
            }

            // Handle status
            if (values.displayStatus) {
                settings.displayStatus = values.displayStatus;
            }

            const success = await updatePuppiesSettings(settings);
            
            if (success) {
                message.success('Hvalpe indstillinger opdateret');
                onStatusUpdated();
            } else {
                message.error('Fejl ved opdatering af indstillinger');
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            message.error('Fejl ved opdatering af indstillinger');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Rediger hvalpe indstillinger"
            open={true}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    date: currentStatus.expectedDate ? dayjs(currentStatus.expectedDate) : null,
                    listingUrl: currentStatus.listingUrl || '',
                    displayStatus: currentStatus.displayStatus
                }}
            >
                <Form.Item
                    name="displayStatus"
                    label="Status for hvalpe sektion"
                    rules={[
                        { required: true, message: 'Vælg venligst en status' }
                    ]}
                >
                    <Select placeholder="Vælg status">
                        <Option value="active">Aktiv - Vis forventet dato</Option>
                        <Option value="inactive">Inaktiv - Vis at der ikke kommer hvalpe</Option>
                        <Option value="hidden">Skjult - Vis ikke hvalpe sektion</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="date"
                    label="Forventet dato for næste hvalpe"
                    help="Valgfri - lad tom hvis der ikke er fastsat dato"
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        format="DD/MM/YYYY"
                        placeholder="Vælg dato (valgfri)"
                        allowClear
                    />
                </Form.Item>

                <Form.Item
                    name="listingUrl"
                    label="Link til hvalpeliste (f.eks. DKK hvalpeliste)"
                    help="Når URL er angivet, betyder det at hvalpene er ankommet og kan ses på listen"
                    rules={[
                        {
                            validator: async (_, value) => {
                                if (value && !isValidUrl(value)) {
                                    throw new Error('Indtast venligst en gyldig URL');
                                }
                            }
                        }
                    ]}
                >
                    <Input
                        placeholder="https://www.koebhund.dk/hvalpeliste/..."
                        allowClear
                    />
                </Form.Item>

                <div style={{ 
                    backgroundColor: '#f0f9ff', 
                    padding: '12px', 
                    borderRadius: '6px', 
                    marginBottom: '16px',
                    border: '1px solid #bae6fd'
                }}>
                    <Text style={{ fontSize: '14px', color: '#0369a1' }}>
                        <strong>Vejledning:</strong>
                        <br />
                        • <strong>Aktiv</strong>: Viser forventet dato eller link hvis hvalpe er ankommet
                        <br />
                        • <strong>Inaktiv</strong>: Viser at der ikke kommer hvalpe på nuværende tidspunkt
                        <br />
                        • <strong>Skjult</strong>: Hvalpe sektionen vises slet ikke
                        <br />
                        • Når URL er angivet, vises "Hvalpe er ankommet" med link til listen
                    </Text>
                </div>

                <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                    <Space>
                        <Button onClick={onCancel}>
                            Annuller
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Gem indstillinger
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ExpectedDateEditor; 