import { Button, Form, GetProp, Input, message, Modal, Upload, UploadProps } from "antd";
import "./AddDepartmentModal.scss"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import { ApisContext, NotificationApiContext } from "../../../layout/app/App";
import { DepartmentCreate } from "../../../../models/Department";
import { useNavigate } from "react-router";

type AddDepartmentModalProps = {
    isOpen: boolean;
    closeHandler: () => void;
}

export default function AddDepartmentModal(props: AddDepartmentModalProps){
    const uploadName = 'deptIcon';
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [imageName, setImageName] = useState<string>();
    const [deptName, setDeptName] = useState<string>();
    const { departmentApi } = useContext(ApisContext);
    const [form] = Form.useForm();
    const notificationAPi = useContext(NotificationApiContext)
    const navigate = useNavigate();
    
    if(!props.isOpen) return null;

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        console.log("Image");
        console.log(img);
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = async (file: FileType) => {
        const isJpgOrPng = file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload PNG file!');
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
            return false;
        }

        if (imageName) {
            await departmentApi.unloadIcon(imageName);
        }

        await departmentApi.uploadIcon(uploadName, file)
            .then(res => {
                console.log("Upload: " + res);
                if (!res) return;

                setImageName(res);
                
                getBase64(file as FileType, (url) => {
                    setLoading(false);
                    setImageUrl(url);
                });
            })
            .catch(e => {
                if (e.status === 401){
                    navigate("/login");
                    return;
                } else if (e.status === 403){
                    notificationAPi && notificationAPi["error"]({
                        message: `You have no "Analyst" access to perform following operation`,
                        className: "error-notification-box"
                    });
                    
                    return;
                }

                notificationAPi && notificationAPi["error"]({
                        message: `Unexpected error ocurred while uploading icon for Department`,
                        className: "error-notification-box"
                    });
            });

        return false;
    };

    const cancel = async () => {
        setImageUrl(undefined);
        setImageName(undefined);
        setLoading(false);
        setDeptName(undefined);
        form.resetFields();
        props.closeHandler();
    };

    const createDepartment = async (event: any) => {
        if (!imageName) {
            alert("Please upload image");
            return;
        }

        const departmentCreate: DepartmentCreate = {
            logoUrl: imageName,
            name: deptName!,
        }

        await departmentApi.create(departmentCreate)
            .catch(e => {
                    if (e.status === 401){
                        navigate("/login");
                        return;
                    } else if (e.status === 403){
                        notificationAPi && notificationAPi["error"]({
                            message: `You have no "Analyst" access to perform following operation`,
                            className: "error-notification-box"
                        });
                        
                        return;
                    }

                    notificationAPi && notificationAPi["error"]({
                            message: `Unexpected error ocurred while creating department`,
                            className: "error-notification-box"
                        });
                });
        cancel();
    }

    console.log(deptName);
    return (
        <Modal
            className="add-department-modal"
            open={props.isOpen}
            centered={true}
            cancelText="Cancel"
            footer={[]}
            >
            <Form
                layout="vertical"
                className="create-departments-form" 
                onFinish={(event) => createDepartment(event)}
                form={form}
                >
                <div className="inputs-holder">
                    <Upload
                        name={uploadName}
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : 
                            <button style={{ border: 0, background: 'none' }} type="button">
                                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                    }
                    </Upload>
                    <Form.Item name="deptName" label={'Department name'}
                        rules={
                            [
                                { 
                                    required: true, message: 'Please input the department name!' 
                                },
                                () =>({
                                    validator(_, value){
                                        if(value && (value.length < 2 || value.length > 10)){
                                            return Promise.reject(new Error("Department name must be between 2 and 10"));
                                        }
                                        
                                        const validDeptNameRegexp = /^[A-Z]+$/g;
                                        if (!validDeptNameRegexp.test(value)) {
                                            return Promise.reject(new Error("Department name is not of allowed format"));
                                        }

                                        return Promise.resolve();
                                    }
                                })
                            ]
                        }>
                        <Input value={deptName} onChange={(e) => setDeptName(e.target.value)}/>
                    </Form.Item>
                </div>

                <div className="buttons-holder">
                    <Button className="button create-button" type="primary" htmlType="submit">Add</Button>
                    <Button className="button cancel-button" onClick={async (e) => {
                        e.preventDefault();
                        if(imageName)
                            await departmentApi.unloadIcon(imageName);
                        cancel();
                    }}>Cancel</Button>
                </div>
            </Form>
        </Modal>
    )   
}