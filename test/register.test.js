import React from 'react';
import { mount } from 'enzyme';
import { Input } from 'antd';
import FormItem from '../src/FormItem';
import Form from '../src/Form';

describe('FormItem register component in Form', () => {
    it('register success and unregister success', () => {
        const wrapper = mount(
            <Form>
                <FormItem id="test">
                    <Input />
                </FormItem>
            </Form>);
        const form = wrapper.instance();
        expect(form.components.test).not.toBeUndefined();

        wrapper.unmount();
        expect(form.components.test).toBeUndefined();
    });

    it('register unsuccess and should add id props for FormItem', () => {
        expect(() => {
            mount(
                <Form>
                    <FormItem>
                        <Input />
                    </FormItem>
                </Form>);
        }).toThrow(/should add id props for FormItem/);
    });

    it('register unsuccess and id props of all FormItems in same Form should be unique', () => {
        expect(() => {
            mount(
                <Form>
                    <FormItem id="test">
                        <Input />
                    </FormItem>
                    <FormItem id="test">
                        <Input />
                    </FormItem>
                </Form>);
        }).toThrow(/id props of all FormItems in same Form should be unique, please check id test/);
    });
});
