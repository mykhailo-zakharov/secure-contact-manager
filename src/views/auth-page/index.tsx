import React, {useState} from "react";
import {Button, Form, Input, Upload, Tabs, Layout} from "antd";
import { UploadChangeParam } from "antd/lib/upload/interface";

import {readFileAsync} from "../../helpers/read-file-async";
import {parseJsonAsync} from "../../helpers/parse-json-async";
import {IContact} from "../contact-page/interfaces";

interface Props {
    initUser: (password: string, list: IContact[]) => void;
}

const Auth: React.FC<Props> = ({ initUser }) => {
    const [isExistingForm, setIsExistingForm] = useState(true);

    const onFinish = async (values: any) => {
        const password = values.password;
        let list: IContact[] = [];
        if (isExistingForm) {
            const fileContent = (await readFileAsync(values.files[0].originFileObj as Blob)) as string;
            const fileData = await parseJsonAsync(fileContent);
            // @ts-ignore
            list = fileData.list;
        }
        initUser(password, list);
    };

    return (
        <Layout.Content
            className="site-layout-background"
            style={{ padding: "30px 20px 1px", width: 500, margin: "auto", marginTop: "20vh" }}
        >
            <Tabs
                defaultActiveKey="1"
                onChange={() => setIsExistingForm(!isExistingForm)}
            >
                <Tabs.TabPane tab="Upload contacts from a file" key="existing" />
                <Tabs.TabPane tab="Create new contacts" key="new" />
            </Tabs>
            <Form
                name="auth"
                labelCol={{ span: 6 }}
                onFinish={onFinish}
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
