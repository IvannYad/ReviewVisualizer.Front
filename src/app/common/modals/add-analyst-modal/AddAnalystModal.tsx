import "./AddAnalystModal.scss";
import { useContext, useState } from "react";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { AnalystApiContext } from "../../../layout/app/App";
import { Analyst, AnalystCreate } from "../../../../models/Analyst";

type AddAnalystModalProps = {
    isOpen: boolean;
    closeHandler: () => void;
}

const defaultAnalyst: AnalystCreate = { 
    name: "",
    processingDurationMiliseconds: 1000,
    isStopped: true,
};

export default function AddAnalystModal(props: AddAnalystModalProps){
    const api = useContext(AnalystApiContext);
    const [intervalValue, setIntervalValue] = useState(1000); 
    const [form] = Form.useForm();
    
    const cancel = async () => {
        form.resetFields();
        props.closeHandler();
    };

    const createAnalyst = async (values: any) => {
        console.log(values);
        const isFormValid = () => form.getFieldsError().some((item) => item.errors.length > 0);
        
        var analyst: AnalystCreate = {
            name: values.name,
            processingDurationMiliseconds: values.interval,
            isStopped: true
        }

        await api.create(analyst)
            .then(res => {
                if (res)
                    cancel();

                return;
            });
    }

    return (
        <Modal
            className="add-analyst-modal"
            open={props.isOpen}
            centered={true}
            cancelText="Cancel"
            footer={[]}
            >
            <Form
                layout="vertical"
                className="create-analyst-form" 
                onFinish={(values) => createAnalyst(values)}
                form={form}
                >
                <div className="main-info-holder">
                    <Form.Item name="name" label={'Name'}
                        rules={
                            [
                                { 
                                    required: true, message: 'Please input the name!' 
                                },
                                () =>({
                                    validator(_, value){
                                        if(!value) return Promise.resolve();
                                        
                                        // const validDeptNameRegexp = /^[A-Z]+$/g;
                                        // if (!validDeptNameRegexp.test(value)) {
                                        //     return Promise.reject(new Error("First name is not of allowed format"));
                                        // }

                                        return Promise.resolve();
                                    }
                                })
                            ]
                    }>
                        <Input onChange={(e) => {
                            e.preventDefault();
                        }}/>
                    </Form.Item>
                    <Form.Item name="interval" label={'Interval(ms)'} initialValue={1000}
                            rules={
                                [
                                    { 
                                        required: true, message: 'Please input the interval!' 
                                    },
                                    () =>({
                                        validator(_, value){
                                            if(!value) return Promise.resolve();
                                            
                                            if(intervalValue < 100) {
                                                return Promise.reject(new Error("Interval is too small, the interval should be > 100 ms"));
                                            }

                                            if(intervalValue > 100_000) {
                                                return Promise.reject(new Error("Interval is too small, the interval should be < 100_000 ms"));
                                            }

                                            if(intervalValue % 100 !== 0) {
                                                return Promise.reject(new Error(`Interval should divide by 100`));
                                            }
    
                                            return Promise.resolve();
                                        }
                                    })
                                ]
                            }
                        >
                        <InputNumber step={100} type="number" onChange={(value) => {
                            setIntervalValue(+value!);
                        }}/>
                    </Form.Item>
                </div>
                <div className="buttons-holder">
                    <Button className="button create-button" type="primary" htmlType="submit">Add</Button>
                    <Button className="button cancel-button" onClick={async (e) => {
                        e.preventDefault();
                        cancel();
                    }}>Cancel</Button>
                </div>
            </Form>
        </Modal>
    )
}