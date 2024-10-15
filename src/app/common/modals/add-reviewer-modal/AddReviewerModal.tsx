import "./AddReviewerModal.scss";
import { useContext, useState } from "react";
import { ReviewerCreate } from "../../../../models/Reviewer";
import { Button, Form, Input, InputNumber, Modal, Slider } from "antd";
import { ReviewerApiContext } from "../../../layout/app/App";

type AddReviewerModalProps = {
    isOpen: boolean;
    closeHandler: () => void;
}

const defaultReviewer: ReviewerCreate = { 
    name: "",
    reviewGenerationFrequensyMiliseconds: 1000,
    teachingQualityMinGrage: 0,
    teachingQualityMaxGrage: 100,
    studentsSupportMinGrage: 0,
    studentsSupportMaxGrage: 100,
    communicationMinGrage: 0,
    communicationMaxGrage: 100,
    isStopped: true,
};

function getGradientColor(percentage: number) {
    const endColor = [40, 255, 10];
    const startColor = [255, 40, 10];
  
    const midColor = startColor.map((start, i) => {
      const end = endColor[i];
      const delta = end - start;
      return (start + delta * percentage).toFixed(0);
    });
  
    return `rgb(${midColor.join(',')})`;
}

export default function AddReviewerModal(props: AddReviewerModalProps){
    const [reviewer, setReviewer] = useState<ReviewerCreate>(defaultReviewer);
    const api = useContext(ReviewerApiContext);
    const [form] = Form.useForm();

    const cancel = async () => {
        setReviewer(defaultReviewer);
        form.resetFields();
        props.closeHandler();
    };

    const createReviewer = async (event: any) => {
        console.log(reviewer);
        await api.create(reviewer)
            .then(res => {
                if (res)
                    cancel();

                return;
            });
    }

    return (
        <Modal
            className="add-reviewer-modal"
            open={props.isOpen}
            centered={true}
            cancelText="Cancel"
            footer={[]}
            >
            <Form
                layout="vertical"
                className="create-reviewer-form" 
                onFinish={(event) => createReviewer(event)}
                form={form}
                >
                <div className="inputs-holder">
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
                            <Input value={reviewer.name} onChange={(e) => {
                                e.preventDefault();
                                setReviewer({ ...reviewer, name: e.target.value });
                            }}/>
                        </Form.Item>
                        <Form.Item name="interval" label={'Interval(ms)'} initialValue={1_000}>
                            <InputNumber min={100} max={100_000} step={100} onChange={(value) => {
                                setReviewer({ ...reviewer, reviewGenerationFrequensyMiliseconds: value! });
                            }}/>
                        </Form.Item>
                    </div>
                    <div className="grades-input-holder">
                    <div>
                        Teaching Quality range
                        <Slider
                        range
                        defaultValue={[reviewer.teachingQualityMinGrage, reviewer.teachingQualityMaxGrage]}
                        onChange={(value) => setReviewer({ ...reviewer, teachingQualityMinGrage: value[0], teachingQualityMaxGrage: value[1] })}
                        styles={{
                            track: {
                            background: 'transparent',
                            },
                            tracks: {
                            background: `linear-gradient(to right, ${getGradientColor(reviewer.teachingQualityMinGrage  / 100)} 0%, ${getGradientColor(
                                (reviewer.teachingQualityMaxGrage === -1 ? 100 : reviewer.teachingQualityMaxGrage) / 100,
                            )} 100%)`,
                            },
                        }}
                    />
                    </div>
                    <div>
                        Student Support range
                        <Slider
                        range
                        defaultValue={[reviewer.studentsSupportMinGrage, reviewer.studentsSupportMaxGrage]}
                        onChange={(value) => setReviewer({ ...reviewer, studentsSupportMinGrage: value[0], studentsSupportMaxGrage: value[1] })}
                        styles={{
                            track: {
                            background: 'transparent',
                            },
                            tracks: {
                            background: `linear-gradient(to right, ${getGradientColor(reviewer.studentsSupportMinGrage / 100)} 0%, ${getGradientColor(
                                (reviewer.studentsSupportMaxGrage === -1 ? 100 : reviewer.studentsSupportMaxGrage) / 100,
                            )} 100%)`,
                            },
                        }}
                    />
                    </div>
                    <div>
                        Communication range
                        <Slider
                        range
                        defaultValue={[reviewer.communicationMinGrage, reviewer.communicationMaxGrage]}
                        onChange={(value) => setReviewer({ ...reviewer, communicationMinGrage: value[0], communicationMaxGrage: value[1] })}
                        styles={{
                            track: {
                            background: 'transparent',
                            },
                            tracks: {
                            background: `linear-gradient(to right, ${getGradientColor(reviewer.communicationMinGrage / 100)} 0%, ${getGradientColor(
                                (reviewer.communicationMaxGrage === -1 ? 100 : reviewer.communicationMaxGrage) / 100,
                            )} 100%)`,
                            },
                        }}
                    />
                    </div>
                    </div>
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