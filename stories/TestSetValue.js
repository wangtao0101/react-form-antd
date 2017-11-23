import React from 'react';
import { Input, Icon, Button } from 'antd';

import Form from '../src/Form';
import FormItem from '../src/FormItem';

export default class TestSetValue extends React.Component { // eslint-disable-line

    constructor(props) {
        super(props);
        this.state = {
            a: 'a',
            b: 'b',
        };
    }

    render() {
        return (
            <div>
                <Form style={{ width: '600px' }} ref={(form) => { this.form = form; }}>
                    <FormItem
                        id="a"
                        hasFeedback
                        value={this.state.a}
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
                        id="b"
                        hasFeedback
                        value={this.state.b}
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
                            this.form.setValue('a', `${this.form.getValue('a')}a`);
                        }}
                    >set first</Button>
                    <Button
                        onClick={() => {
                            this.form.setValue({
                                a: `${this.form.getValue('a')}a`,
                                b: `${this.form.getValue('b')}b`,
                            });
                        }}
                    >set all</Button>
                </Form>
            </div>
        );
    }
}
