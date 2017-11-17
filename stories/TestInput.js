import React from 'react';
import { Input, Icon, Button } from 'antd';

import Form from '../src/Form';
import FormItem from '../src/FormItem';

export default class TestInput extends React.Component { // eslint-disable-line
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };

        return (
            <div>
                <Form style={{ width: '600px' }} ref={(form) => { this.form = form; }}>
                    <FormItem label="Username:" id="username" {...formItemLayout} value="wang tao">
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    </FormItem>
                    <FormItem
                        label="Password:"
                        id="password"
                        hasFeedback
                        validateStatus="success"
                        {...formItemLayout}
                        value="my password"
                    >
                        <Input
                            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                            placeholder="Password"
                            type="password"
                        />
                    </FormItem>
                    <FormItem
                        label="Email:"
                        id="email"
                        hasFeedback
                        validateStatus="error"
                        {...formItemLayout}
                        value="my@163.com"
                    >
                        <Input
                            prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                            placeholder="Email"
                            type="email"
                            size="small"
                        />
                    </FormItem>
                    <FormItem
                        id="email2"
                        hasFeedback
                        rules={[{
                            name: 'required',
                            message: 'email is required',
                        }, {
                            validator: (value) => {
                                if (value.length > 5) {
                                    return 'too long';
                                }
                                return null;
                            },
                        }]}
                        value=""
                        validateTrigger="onBlur"
                    >
                        <Input
                            prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                            placeholder="Email"
                            type="email"
                            onChange={() => console.log('safadf')} // eslint-disable-line
                        />
                    </FormItem>
                    <FormItem
                        id="email3"
                        hasFeedback
                        rules={[{
                            name: 'min',
                            args: 5,
                            message: 'min',
                        }, {
                            name: 'max',
                            args: 10,
                            message: 'max',
                        }, {
                            name: 'required',
                            message: 'email is required',
                        }]}
                        value=""
                        validateTrigger="onBlur"
                    >
                        <Input
                            prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                            placeholder="Email"
                            type="email"
                            onChange={() => console.log('safadf')} // eslint-disable-line
                        />
                    </FormItem>
                    <Button
                        onClick={() => {
                            this.form.validate();
                            console.log(this.form.getValue()); // eslint-disable-line
                        }}
                    >verify</Button>
                </Form>
            </div>
        );
    }
}
