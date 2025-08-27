import { Button, Form, FormProps, Input, notification } from "antd";
import "./LoginForm.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FRONTEND_ROUTES from "../../../app/common/constants/frontend-routes.constants";
import { LoginRequest } from "../../../models/AuthModels";
import { useContext } from "react";
import { ApisContext, UserContext } from "../../../app/layout/app/App";

export default function LoginForm(){
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const { authApi } = useContext(ApisContext);
    const userCtx = useContext(UserContext);
    
    const openErrorNotification = (title:string, description: string) => {
        api["error"]({
            message: title,
            description: description,
            className: "error-notification-box"
        });
    };

    const onFinish: FormProps<LoginRequest>['onFinish'] = async (values) => {
        try {
            await authApi.loginAsync(values)
                        .then(() => {
                            if (!userCtx) return;
                            userCtx.setUser({ userName: values.username! });
                            navigate('/');
                        })
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const notificationTitle = `Log in request returned ${error.response.status}`;
                let notificationMessage = error.response.data.error;
                
                openErrorNotification(notificationTitle, notificationMessage)
                return;
            }

            openErrorNotification("Error while loggin in", (error ?? "").toString());
        }
    };
      
    const onFinishFailed: FormProps<LoginRequest>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-form-holder">
            {contextHolder}
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                layout="vertical"
                className="login-form"
            >
                <Form.Item<LoginRequest>
                    label={"Username"}
                    name="username"
                    rules={[{ required: true, message: "Please Input Your Username" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<LoginRequest>
                    label={"Password"}
                    name="password"
                    rules={[{ required: true, message: "Please Inout Password" }]}
                >
                    <Input.Password />
                </Form.Item>

                <div>
                    Have no account? <Link to={FRONTEND_ROUTES.PAGES.REGISTER} className="register-suggestion">Register</Link>
                </div>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Log In
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )   
}