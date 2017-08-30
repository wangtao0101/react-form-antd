import React from 'react';
import { Input, Icon } from 'antd';

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
                <Form style={{ width: '600px' }}>
                    <FormItem label="Username:" id="username" {...formItemLayout}>
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    </FormItem>
                    <FormItem label="Password:" id="password" hasFeedback validateStatus="success" {...formItemLayout}>
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="Password" type="password" />
                    </FormItem>
                    <FormItem label="Email:" id="email" hasFeedback validateStatus="error" {...formItemLayout}>
                        <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" type="email" />
                    </FormItem>
                </Form>
            </div>
        );
    }
}
