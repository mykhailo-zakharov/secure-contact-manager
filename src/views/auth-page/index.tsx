import React from "react";
import {Button, Col, Form, Input, Row, Upload} from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";

import {readFileAsync} from "../../helpers/read-file-async";
import {parseJsonAsync} from "../../helpers/parse-json-async";

const Auth = () => {
    const onFinish = async (values: any) => {
        const fileContent = (await readFileAsync(values.files[0].originFileObj as Blob)) as string;
        const fileData = await parseJsonAsync(fileContent);
        const password = values.password;
        console.log('Success:', {
            password, fileData
        });
    };

    return (
        <>
            <Form
                name="auth"
                labelCol={{ span: 6 }}
                onFinish={onFinish}
                className="site-layout-background"
                style={{ padding: "30px 20px 1px", width: 500, margin: "auto", marginTop: "20vh" }}
            >
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
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6 }}>
                    <Row justify="space-between">
                        <Col>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Col>
                        <Col>
                            <Button>
                                Create New
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </>
    )
}

export default Auth;
