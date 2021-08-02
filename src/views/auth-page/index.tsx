import React from "react";
import {Button, Form, Input, Upload, Tabs, Layout, Typography} from "antd";
import {UploadChangeParam} from "antd/lib/upload/interface";

import {useAuthHook} from "./use-auth-hook";
import {AuthFormData, InitUser} from "./interfaces";

interface Props {
    initUser: InitUser;
}

const Auth: React.FC<Props> = ({ initUser }) => {
   const {
       onChangeForm,
       onChangeTab,
       onFinish,
       isFormValid,
       isExistingForm,
   } = useAuthHook(initUser);

    return (
        <Layout.Content
            className="site-layout-background"
            style={{ padding: "30px 20px 1px", width: 500, margin: "auto", marginTop: "20vh" }}
        >
            <Tabs
                defaultActiveKey="1"
                onChange={onChangeTab}
            >
                <Tabs.TabPane tab="Upload contacts from a file" key="existing" />
                <Tabs.TabPane tab="Create new contacts" key="new" />
            </Tabs>
            <Form<AuthFormData>
                name="auth"
                labelCol={{ span: 6 }}
                onFinish={onFinish}
                onChange={onChangeForm}
            >
                {isExistingForm && (
                    <Form.Item
                        label="File"
                        name="files"
                        required
                        rules={[{ required: true, message: 'Please select your file!' }]}
                        valuePropName="fileList"
                        getValueFromEvent={(event: UploadChangeParam) => event.fileList}
                    >
                        <Upload.Dragger
                            customRequest={({ file, onSuccess }) => {
                                setTimeout(() => {
                                    if (onSuccess) {
                                        // @ts-ignore
                                        onSuccess("ok", null);
                                    }
                                }, 0);
                            }}
                            accept=".json"
                            multiple={false}
                            maxCount={1}
                            showUploadList={{ showRemoveIcon: false }}
                        >
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        </Upload.Dragger>
                    </Form.Item>
                )}

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                {!isFormValid && (
                    <Typography.Paragraph style={{ textAlign: "center" }}>
                        <Typography.Text type="danger">Either the password is wrong or the file is broken!</Typography.Text>
                    </Typography.Paragraph>
                )}

                <Form.Item wrapperCol={{ offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        {isExistingForm ? "Upload" : "Create"}
                    </Button>
                </Form.Item>
            </Form>
        </Layout.Content>
    )
}

export default Auth;
