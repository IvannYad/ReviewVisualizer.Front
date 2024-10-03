import { Button, Form, GetProp, Input, message, Modal, Upload, UploadProps } from "antd";
import "./AddDepartmentModal.scss"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import { RcFile } from "antd/es/upload";
import { DepartmentApiContext } from "../../../layout/app/App";

type AddDepartmentModalProps = {
    isOpen: boolean;
    closeHandler: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export default function AddDepartmentModal(props: AddDepartmentModalProps){
    const uploadName = 'deptIcon';
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [imageName, setImageName] = useState<string>();
    const [deptName, setDeptName] = useState<string>();
    const api = useContext(DepartmentApiContext);
    const [form] = Form.useForm();

    if(!props.isOpen) return null;

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
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

        setLoading(true);
        if (imageName) {
            await api.unloadIcon(imageName);
        }

        await api.uploadIcon(uploadName, file)
        .then(res => {
            if (!res) return;

            setImageName(res);
            // Get this url from response in real world.
            getBase64(file as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        })

        return false;
    };

    const cancel = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();

        setImageUrl(undefined);
        if(imageName)
            await api.unloadIcon(imageName);
        setImageName(undefined);
        setLoading(false);
        props.closeHandler(event);
    };

    return (
        <Modal
            className="add-department-modal"
            open={props.isOpen}
            centered={true}
            cancelText="Cancel"
            footer={[
                <Button className="button create-button" >Add</Button>,
                <Button className="button cancel-button" onClick={cancel}>Cancel</Button>
            ]}
            >
            <Form
                layout="vertical"
                className="create-departments-form" 
                onFinish={(event) => {}}
                form={form}
                >
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
                <Form.Item name="deptName" label={'Department name'}>
                    <Input value={deptName}/>
                </Form.Item>
            </Form>
        </Modal>
    )   
}