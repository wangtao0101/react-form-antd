import React from 'react';
import { mount } from 'enzyme';
import { Input } from 'antd';
import FormItem from '../src/FormItem';
import Form from '../src/Form';

describe('validate', () => {
    it('validate required rule by name success', () => {
        const wrapper = mount(
            <Form>
                <FormItem
                    id="test"
                    value=""
                    rules={[{
                        name: 'required',
                        message: 'a',
                    }]}
                >
                    <Input />
                </FormItem>
            </Form>);
        const form = wrapper.instance();
        expect(form.validate('test')).toEqual('a');
    });

    it('validate required by all', () => {
        const wrapper = mount(
            <Form>
                <FormItem
                    id="test"
                    value=""
                    rules={[{
                        name: 'required',
                        message: 'a',
                    }]}
                >
                    <Input />
                </FormItem>
                <FormItem
                    id="test1"
                    value=""
                    rules={[{
                        name: 'required',
                        message: 'b',
                    }]}
                >
                    <Input />
                </FormItem>
            </Form>);
        const form = wrapper.instance();
        expect(form.validate()).toEqual({
            test: 'a',
            test1: 'b',
        });
    });

    it('check id when validate', () => {
        expect(() => {
            const wrapper = mount(
                <Form>
                    <FormItem
                        id="test"
                        rules={[{
                            name: 'required',
                            message: 'b',
                        }]}
                    >
                        <Input />
                    </FormItem>
                </Form>);
            const form = wrapper.instance();
            form.validate('test1');
        }).toThrow(/component with id: test1 is not exist in form./);
    });
});
