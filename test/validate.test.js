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

        form.setValue('test', 'bbbb');
        expect(form.validate('test')).toBeUndefined();
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

    it('validate max min rule of string type by name success', () => {
        const wrapper = mount(
            <Form>
                <FormItem
                    id="test"
                    value=""
                    rules={[{
                        name: 'max',
                        args: 10,
                        message: 'max',
                    }, {
                        name: 'min',
                        args: 5,
                        message: 'min',
                    }]}
                >
                    <Input />
                </FormItem>
            </Form>);
        const form = wrapper.instance();
        expect(form.validate('test')).toEqual('min');

        form.setValue('test', 'bbbbbbbbbbb');
        expect(form.validate('test')).toEqual('max');

        form.setValue('test', 'bbbbb');
        expect(form.validate('test')).toBeUndefined();
    });

    it('validate function  by name success', () => {
        const wrapper = mount(
            <Form>
                <FormItem
                    id="test"
                    value=""
                    rules={[{
                        validator: (value) => {
                            if (value.length > 5) {
                                return 'too long';
                            }
                            return null;
                        },
                    }]}
                >
                    <Input />
                </FormItem>
            </Form>);
        const form = wrapper.instance();
        expect(form.validate('test')).toBeUndefined();

        form.setValue('test', 'bbbbbb');
        expect(form.validate('test')).toBe('too long');
    });
});
