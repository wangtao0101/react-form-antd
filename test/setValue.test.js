import React from 'react';
import { mount } from 'enzyme';
import { Input } from 'antd';
import FormItem from '../src/FormItem';
import Form from '../src/Form';

describe('setValue from form', () => {
    it('setValue by name success', () => {
        const wrapper = mount(
            <Form>
                <FormItem id="test" value="test" >
                    <Input />
                </FormItem>
            </Form>);
        const form = wrapper.instance();
        form.setValue('test', 'a');
        expect(form.getValue('test')).toBe('a');
    });

    it('setValue all', () => {
        const wrapper = mount(
            <Form>
                <FormItem id="test" value="test" >
                    <Input />
                </FormItem>
                <FormItem id="test1" value="test1" >
                    <Input />
                </FormItem>
            </Form>);
        const form = wrapper.instance();
        form.setValue({
            test: 'a',
            test1: 'b',
        });
        expect(form.getValue()).toEqual({
            test: 'a',
            test1: 'b',
        });
    });

    it('check id when setValue', () => {
        expect(() => {
            const wrapper = mount(
                <Form>
                    <FormItem id="test">
                        <Input />
                    </FormItem>
                </Form>);
            const form = wrapper.instance();
            form.setValue('test1');
        }).toThrow(/component with id: test1 is not exist in form./);
    });
});
