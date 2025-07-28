import { Button, Form, FormProps, Input, notification } from "antd";
import "./LoginForm.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FRONTEND_ROUTES from "../../../app/common/constants/frontend-routes.constants";

type FieldType = {
    username?: string;
    password?: string;
};

export default function LoginForm(){
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    
    const openErrorNotification = (title:string, description: string) => {
        api["error"]({
            message: title,
            description: description,
            className: "error-notification-box"
        });
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            // Make the GET request to the Flask backend
            await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                values,
            }, {
                withCredentials: true
            });

            navigate('/')
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const notificationTitle = `Log in request returned ${error.response.status}`;
                let notificationMessage = error.response.data.error;
                if (error.response.status == 403) {
                    notificationMessage = "You have no access to products!";
                }

                openErrorNotification(notificationTitle, notificationMessage)
                return;
            }

            openErrorNotification("Error while loggin in", (error ?? "").toString());
        }
    };
      
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
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
                <Form.Item<FieldType>
                    label={"Username"}
                    name="username"
                    rules={[{ required: true, message: "Please Input Your Username" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label={"Password"}
                    name="password"
                    rules={[{ required: true, message: "Please Inout Password" }]}
                >
                    <Input.Password />
                </Form.Item>

                <div>
                    Have no account? <Link to={FRONTEND_ROUTES.PAGES.LOGIN} className="register-suggestion">Register</Link>
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