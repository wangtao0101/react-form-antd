import React from 'react';
import { Button, InputNumber } from 'antd';

import Form from '../src/Form';
import FormItem from '../src/FormItem';

export default class TestInputNumber extends React.Component { // eslint-disable-line
    render() {
        return (
            <div>
                <Form style={{ width: '600px' }} ref={(form) => { this.form = form; }}>
                    <FormItem
                        id="email2"
                        rules={[{
                            name: 'required',
                            message: 'email is required',
                        }, {
                            validator: (value) => {
                                if (value > 5) {
                                    return 'too long';
                                }
                                return null;
                            },
                        }]}
                        value={2}
                    >
                        <InputNumber min={1} max={10} step={1} />
                    </FormItem>
                    <FormItem
                        id="email3"
                        rules={[{
                            name: 'required',
                            message: 'email is required',
                        }, {
                            validator: (value) => {
                                if (value > 5) {
                                    return 'too too long';
                                }
                                return null;
                            },
                        }]}
                        value={2}
                    >
                        <InputNumber
                            min={1}
                            max={10}
                            step={1}
                            onChange={(v) => {
                                console.log(v); // eslint-disable-line
                            }}
                        />
                    </FormItem>
                    <FormItem
                        id="disable"
                        rules={[{
                            name: 'required',
                            message: 'email is required',
                        }, {
                            validator: (value) => {
                                if (value > 5) {
                                    return 'too too long';
                                }
                                return null;
                            },
                        }]}
                        // value={}
                        disabled
                    >
                        <InputNumber
                            min={1}
                            max={10}
                            step={1}
                            onChange={(v) => {
                                console.log(v); // eslint-disable-line
                            }}
                        />
                    </FormItem>
                    <Button
                        onClick={() => {
                            console.log(this.form.validate()); // eslint-disable-line
                            console.log(this.form.getValue()); // eslint-disable-line
                        }}
                    >verify</Button>
                </Form>
            </div>
        );
    }
}
