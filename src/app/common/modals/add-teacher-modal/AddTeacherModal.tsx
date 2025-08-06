import { Button, Form, GetProp, Input, message, Modal, Select, Upload, UploadProps } from "antd";
import "./AddTeacherModal.scss"
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import { ApisContext, NotificationApiContext } from "../../../layout/app/App";
import { AcademicDegree, AcademicRank, TeacherCreate } from "../../../../models/Teacher";
import { useNavigate } from "react-router";
type AddDepartmentModalProps = {
    departmentId: number;
    isOpen: boolean;
    closeHandler: () => void;
}

const defaultTeacher: TeacherCreate = { firstName: "", lastName: "", academicRank: -1, academicDegree: -1, photoUrl: "", departmentId: -1 };

export default function AddTeacherModal(props: AddDepartmentModalProps){
    const uploadName = 'deptIcon';
    const academicDegreeKeys = Object.keys(AcademicDegree).filter(item => !isNaN(Number(item))).filter(k => +k !== -1);
    const academicRankKeys = Object.keys(AcademicRank).filter(item => !isNaN(Number(item))).filter(k => +k !== -1);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [teacher, setTeacher] = useState<TeacherCreate>(defaultTeacher);
    const { teacherApi } = useContext(ApisContext);
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

        if (teacher?.photoUrl) {
            await teacherApi.unloadIcon(teacher?.photoUrl);
        }

        await teacherApi.uploadIcon(uploadName, file)
            .then(res => {
                console.log("Upload: " + res);
                if (!res) return;

                setTeacher({ ...teacher, photoUrl:res });
                // Get this url from response in real world.
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
                        message: `Unexpected error ocurred while uploading icon for Teacher`,
                        className: "error-notification-box"
                    });
            });

        return false;
    };

    const cancel = async () => {
        setImageUrl(undefined);
        setLoading(false);
        setTeacher(defaultTeacher);
        form.resetFields();
        props.closeHandler();
    };

    const createTeacher = async (event: any) => {
        teacher.departmentId = props.departmentId;

        if (!teacher.photoUrl) {
            alert("Please upload teacher's photo");
            return;
        }

        if (teacher.academicDegree === -1) {
            alert("Please input Academic Degree");
            return;
        }
        
        if (teacher.academicRank === -1) {
            alert("Please input Academic Rank");
            return;
        }

        const teacherCreate: TeacherCreate = {
            ...teacher!
        }

        console.log(teacher);

        await teacherApi.create(teacherCreate)
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
                    message: `Unexpected error ocurred while creating teacher`,
                    className: "error-notification-box"
                });
            });
        cancel();
    }

    const academicDegreeOptions: any[] | undefined = academicDegreeKeys.map(key => {
        return {
            value: key,
            label: AcademicDegree[+key],
        }
    });
    const academicRankOptions: any[] | undefined = academicRankKeys.map(key => {
        return {
            value: key,
            label: AcademicRank[+key],
        }
    });

    return (
        <Modal
            className="add-teacher-modal"
            open={props.isOpen}
            centered={true}
            cancelText="Cancel"
            footer={[]}
            >
            <Form
                layout="vertical"
                className="create-teacher-form" 
                onFinish={(event) => createTeacher(event)}
                form={form}
                >
                <div className="inputs-holder">
                    <div className="main-info-holder">
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
                        <div className="name-input-holder">
                            <Form.Item name="firstName" label={'First name'}
                            rules={
                                [
                                    { 
                                        required: true, message: 'Please input the first name!' 
                                    },
                                    () =>({
                                        validator(_, value){
                                            if(!value) return Promise.resolve();

                                            if(value && (value.length < 2 || value.length > 10)){
                                                return Promise.reject(new Error("First name must be between 2 and 10"));
                                            }
                                            
                                            // const validDeptNameRegexp = /^[A-Z]+$/g;
                                            // if (!validDeptNameRegexp.test(value)) {
                                            //     return Promise.reject(new Error("First name is not of allowed format"));
                                            // }

                                            return Promise.resolve();
                                        }
                                    })
                                ]
                            }>
                                <Input value={teacher?.firstName} onChange={(e) => setTeacher({ ...teacher, firstName: e.target.value})}/>
                            </Form.Item>
                            <Form.Item name="lastName" label={'Last name'}
                                rules={
                                    [
                                        { 
                                            required: true, message: 'Please input the last name!' 
                                        },
                                        () =>({
                                            validator(_, value){
                                                if(!value) return Promise.resolve();

                                                if(value && (value.length < 2 || value.length > 10)){
                                                    return Promise.reject(new Error("First name must be between 2 and 10"));
                                                }
                                                
                                                // const validDeptNameRegexp = /^[A-Z]+$/g;
                                                // if (!validDeptNameRegexp.test(value)) {
                                                //     return Promise.reject(new Error("First name is not of allowed format"));
                                                // }

                                                return Promise.resolve();
                                            }
                                        })
                                    ]
                                }>
                                <Input value={teacher?.lastName} onChange={(e) => setTeacher({ ...teacher, lastName: e.target.value})}/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="academic-input-holder">
                        <Select
                            defaultValue="-- Select Academic Degree --"
                            onChange={(val) => setTeacher({ ...teacher!, academicDegree: +val!})}
                            options={academicDegreeOptions}
                        />
                        <Select
                            defaultValue="-- Select Academic Rank --"
                            onChange={(val) => setTeacher({ ...teacher!, academicRank: +val!})}
                            options={academicRankOptions}
                        />
                    </div>
                </div>

                <div className="buttons-holder">
                    <Button className="button create-button" type="primary" htmlType="submit">Add</Button>
                    <Button className="button cancel-button" onClick={async (e) => {
                        e.preventDefault();
                        if(teacher?.photoUrl)
                            await teacherApi.unloadIcon(teacher?.photoUrl);
                        cancel();
                    }}>Cancel</Button>
                </div>
            </Form>
        </Modal>
    )   
}