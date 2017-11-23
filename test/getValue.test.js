import React from 'react';
import { mount } from 'enzyme';
import { Input } from 'antd';
import FormItem from '../src/FormItem';
import Form from '../src/Form';

describe('getValue from form', () => {
    it('getValue by name success', () => {
        const wrapper = mount(
            <Form>
                <FormItem id="test" value="test" >
                    <Input />
                </FormItem>
            </Form>);
        const form = wrapper.instance();
        expect(form.getValue('test')).toBe('test');
    });

    it('getValue by all', () => {
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
        expect(form.getValue()).toEqual({
            test: 'test',
            test1: 'test1',
        });
    });

    it('check id when getValue', () => {
        expect(() => {
            const wrapper = mount(
                <Form>
                    <FormItem id="test">
                        <Input />
                    </FormItem>
                </Form>);
            const form = wrapper.instance();
            form.getValue('test1');
        }).toThrow(/component with id: test1 is not exist in form./);
    });
});
