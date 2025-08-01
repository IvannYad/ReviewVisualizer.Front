import { Button, Form, FormProps, Input, notification } from "antd";
import "./RegisterForm.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthApiContext } from "../../../app/layout/app/App";
import { LoginRequest, RegisterRequest, RegisterResponse } from "../../../models/AuthModels";

export default function RegisterForm(){
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const authApi = useContext(AuthApiContext);
    
    const openErrorNotification = (title:string, description: string) => {
        api["error"]({
            message: title,
            description: description,
            className: "error-notification-box"
        });
    };

    const onFinish: FormProps<RegisterRequest>['onFinish'] = async (values) => {
        try {
            const request: RegisterRequest = values;
            await authApi.registerAync(request)
                .then(async (data: RegisterResponse | void) => {
                    console.log(data);
                    if (!data) throw "Login returned with an error";

                    const loginRequest: LoginRequest = {
                        username: data.userName ?? undefined,
                        password: data.password,
                    }

                    await authApi.loginAsync(loginRequest)
                        .then(() => {navigate('/')})
                });

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.log(error.response.data.errors);
                const notificationTitle = `Register request returned ${error.response.status}`;
                let notificationMessage = error.response.data.title;
                
                openErrorNotification(notificationTitle, notificationMessage)
                return;
            }

            openErrorNotification("Error while loggin in", (error ?? "").toString());
        }
    };
      
    const onFinishFailed: FormProps<RegisterRequest>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="register-form-holder">
            {contextHolder}
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                layout="vertical"
                className="register-form"
            >
                <Form.Item<RegisterRequest>
                    label={"Username"}
                    name="username"
                    rules={[{ required: true, message: "Please Input Your Username" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<RegisterRequest>
                    label={"Password"}
                    name="password"
                    rules={[{ required: true, message: "Please Inout Password" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<RegisterRequest>
                    label={"Password Confirmation"}
                    name="passwordConfirmation"
                    rules={[{ required: true, message: "Please Input Password Confirmation" }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )   
}