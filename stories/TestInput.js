import React from 'react';
import { Input, Icon } from 'antd';

import Form from '../src/Form';
import FormItem from '../src/FormItem';

export default class TestInput extends React.Component { // eslint-disable-line
    render() {
        return (
            <Form>
                <FormItem>
                    <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                </FormItem>
            </Form>
        );
    }
}
