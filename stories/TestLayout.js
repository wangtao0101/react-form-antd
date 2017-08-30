import React from 'react';
import { Input, Icon, Radio } from 'antd';

import Form from '../src/Form';
import FormItem from '../src/FormItem';

export default class TestLayout extends React.Component {
    constructor() {
        super();
        this.state = {
            formLayout: 'horizontal',
        };
    }

    handleFormLayoutChange = (e) => {
        this.setState({ formLayout: e.target.value });
    }

    render() {
        const { formLayout } = this.state;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        } : null;

        return (
            <div>
                <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                    <Radio.Button value="horizontal">Horizontal</Radio.Button>
                    <Radio.Button value="vertical">Vertical</Radio.Button>
                    <Radio.Button value="inline">Inline</Radio.Button>
                </Radio.Group>
                <Form style={{ width: '600px' }} layout={formLayout}>
                    <FormItem label="Username:" id="username" {...formItemLayout}>
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    </FormItem>
                    <FormItem label="Password:" id="password" hasFeedback validateStatus="success" {...formItemLayout}>
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="Password" />
                    </FormItem>
                </Form>
            </div>
        );
    }
}
