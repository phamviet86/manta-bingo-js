"use client";

import { useState } from "react";
import { Card, Space, Typography, Divider, message } from "antd";
import { AntPage, AntForm, AntButton } from "@/component/common";
import { useForm } from "@/component/hook";

const { Title, Paragraph } = Typography;

export default function Page() {
  const [messageApi, contextHolder] = message.useMessage();

  // Form hooks for different demo forms
  const basicFormHook = useForm();
  const modalFormHook = useForm();
  const drawerFormHook = useForm();

  // Sample data for demonstration
  const sampleUserData = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    role: "admin",
    isActive: true,
  };

  // Demo form columns configuration
  const userFormColumns = [
    {
      title: "Personal Information",
      dataIndex: "personal",
      valueType: "group",
      columns: [
        {
          title: "First Name",
          dataIndex: "firstName",
          formItemProps: {
            rules: [{ required: true, message: "Please enter first name" }],
          },
          colProps: { span: 12 },
        },
        {
          title: "Last Name",
          dataIndex: "lastName",
          formItemProps: {
            rules: [{ required: true, message: "Please enter last name" }],
          },
          colProps: { span: 12 },
        },
      ],
    },
    {
      title: "Contact Information",
      dataIndex: "contact",
      valueType: "group",
      columns: [
        {
          title: "Email",
          dataIndex: "email",
          valueType: "text",
          formItemProps: {
            rules: [
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter valid email" },
            ],
          },
        },
        {
          title: "Phone",
          dataIndex: "phone",
          valueType: "text",
          formItemProps: {
            rules: [{ required: true, message: "Please enter phone number" }],
          },
        },
      ],
    },
    {
      title: "User Settings",
      dataIndex: "settings",
      valueType: "group",
      columns: [
        {
          title: "Role",
          dataIndex: "role",
          valueType: "select",
          valueEnum: {
            admin: { text: "Administrator" },
            user: { text: "User" },
            guest: { text: "Guest" },
          },
          formItemProps: {
            rules: [{ required: true, message: "Please select a role" }],
          },
          colProps: { span: 12 },
        },
        {
          title: "Active",
          dataIndex: "isActive",
          valueType: "switch",
          colProps: { span: 12 },
        },
      ],
    },
  ];

  // Mock API functions for demo
  const mockApiRequest = async (params) => {
    messageApi.info("Fetching data...");
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "Data loaded successfully",
      data: [sampleUserData],
    };
  };

  const mockApiSubmit = async (values) => {
    messageApi.info("Submitting data...");
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Submitted values:", values);
    return {
      success: true,
      message: "Data saved successfully",
      data: [values],
    };
  };

  const mockApiDelete = async (params) => {
    messageApi.info("Deleting data...");
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: "Data deleted successfully",
      data: [],
    };
  };

  // Event handlers
  const handleRequestSuccess = (result) => {
    console.log("Request success:", result);
  };

  const handleSubmitSuccess = (result) => {
    console.log("Submit success:", result);
    // Close modals/drawers after successful submit
    modalFormHook.close();
    drawerFormHook.close();
  };

  const handleDeleteSuccess = (result) => {
    console.log("Delete success:", result);
  };

  return (
    <>
      {contextHolder}
      <AntPage
        items={[{ title: "Home", path: "/dev" }]}
        title="Dev Page - Schema Form Demo"
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Card>
            <Title level={2}>AntForm Component Demo</Title>
            <Paragraph>
              This page demonstrates the AntForm component (schema-form.js) with
              various configurations and layout types. The component supports
              different form layouts, data handling, and CRUD operations.
            </Paragraph>
          </Card>

          {/* Basic Form Demo */}
          <Card title="1. Basic Form Layout" size="small">
            <Paragraph>
              Standard form layout with data loading, submit, and delete
              functionality.
            </Paragraph>
            <AntForm
              formHook={basicFormHook}
              layoutType="Form"
              columns={userFormColumns}
              onRequest={mockApiRequest}
              onRequestSuccess={handleRequestSuccess}
              onSubmit={mockApiSubmit}
              onSubmitSuccess={handleSubmitSuccess}
              onDelete={mockApiDelete}
              onDeleteSuccess={handleDeleteSuccess}
              requestParams={{ id: 1 }}
              deleteParams={{ id: 1 }}
              showDeleteBtn={true}
            />
          </Card>

          {/* Modal Form Demo */}
          <Card title="2. Modal Form Layout" size="small">
            <Paragraph>
              Form displayed in a modal dialog. Click the button below to open
              the modal form.
            </Paragraph>
            <Space>
              <AntButton
                label="Open Modal Form"
                type="primary"
                onClick={() => {
                  modalFormHook.setRequestParams({ id: 1 });
                  modalFormHook.setDeleteParams({ id: 1 });
                  modalFormHook.open();
                }}
              />
            </Space>
            <AntForm
              formHook={modalFormHook}
              layoutType="ModalForm"
              title="Edit User (Modal)"
              width={900}
              columns={userFormColumns}
              onRequest={mockApiRequest}
              onRequestSuccess={handleRequestSuccess}
              onSubmit={mockApiSubmit}
              onSubmitSuccess={handleSubmitSuccess}
              onDelete={mockApiDelete}
              onDeleteSuccess={handleDeleteSuccess}
              showDeleteBtn={true}
            />
          </Card>

          {/* Drawer Form Demo */}
          <Card title="3. Drawer Form Layout" size="small">
            <Paragraph>
              Form displayed in a drawer panel. Click the button below to open
              the drawer form.
            </Paragraph>
            <Space>
              <AntButton
                label="Open Drawer Form"
                type="primary"
                onClick={() => {
                  drawerFormHook.setRequestParams({ id: 1 });
                  drawerFormHook.setDeleteParams({ id: 1 });
                  drawerFormHook.open();
                }}
              />
            </Space>
            <AntForm
              formHook={drawerFormHook}
              layoutType="DrawerForm"
              title="Edit User (Drawer)"
              width={500}
              columns={userFormColumns}
              onRequest={mockApiRequest}
              onRequestSuccess={handleRequestSuccess}
              onSubmit={mockApiSubmit}
              onSubmitSuccess={handleSubmitSuccess}
              onDelete={mockApiDelete}
              onDeleteSuccess={handleDeleteSuccess}
              showDeleteBtn={true}
            />
          </Card>

          {/* Form without Delete Button */}
          <Card title="4. Form without Delete Button" size="small">
            <Paragraph>Form configuration with delete button hidden.</Paragraph>
            <AntForm
              layoutType="Form"
              columns={userFormColumns.slice(0, 2)} // Only show first 2 groups
              onSubmit={mockApiSubmit}
              onSubmitSuccess={handleSubmitSuccess}
              showDeleteBtn={false}
            />
          </Card>

          {/* Feature Overview */}
          <Card title="Component Features" size="small">
            <Title level={4}>Key Features:</Title>
            <ul>
              <li>
                <strong>Multiple Layout Types:</strong> Form, ModalForm,
                DrawerForm, StepsForm, StepForm
              </li>
              <li>
                <strong>Data Operations:</strong> Request (load), Submit (save),
                Delete
              </li>
              <li>
                <strong>Error Handling:</strong> Built-in error handling with
                message notifications
              </li>
              <li>
                <strong>Form Hook Integration:</strong> Works with useForm hook
                for state management
              </li>
              <li>
                <strong>Customizable UI:</strong> Configurable buttons, layouts,
                and validation
              </li>
              <li>
                <strong>Ant Design Integration:</strong> Built on
                @ant-design/pro-components
              </li>
            </ul>

            <Divider />

            <Title level={4}>Props Overview:</Title>
            <ul>
              <li>
                <strong>Data Handlers:</strong> onRequest, onSubmit, onDelete
                with success/error callbacks
              </li>
              <li>
                <strong>Configuration:</strong> layoutType, columns,
                showDeleteBtn, extra
              </li>
              <li>
                <strong>Parameters:</strong> requestParams, deleteParams for API
                calls
              </li>
              <li>
                <strong>Form Hook:</strong> formHook for form state and actions
              </li>
            </ul>
          </Card>
        </Space>
      </AntPage>
    </>
  );
}
