import React from 'react';
import { Input, Icon, Button } from 'antd';

import Form from '../src/Form';
import FormItem from '../src/FormItem';

export default class TestTextArea extends React.Component { // eslint-disable-line
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
                                if (value.length > 5) {
                                    return 'too long';
                                }
                                return null;
                            },
                        }]}
                        value=""
                        validateTrigger="onBlur"
                    >
                        <Input.TextArea
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
