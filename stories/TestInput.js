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
                    <FormItem label="Username:"id="username" {...formItemLayout} value="wang tao">
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    </FormItem>
                    <FormItem
                        label="Password:"
                        id="password"
                        hasFeedback
                        validateStatus="success"
                        {...formItemLayout}
                        value="my password"
                    >
                        <Input
                            prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                            placeholder="Password"
                            type="password"
                        />
                    </FormItem>
                    <FormItem
                        label="Email:"
                        id="email"
                        hasFeedback
                        validateStatus="error"
                        {...formItemLayout}
                        value="my@163.com"
                    >
                        <Input
                            prefix={<Icon type="mail" style={{ fontSize: 13 }} />}
                            placeholder="Email"
                            type="email"
                        />
                    </FormItem>
                </Form>
            </div>
        );
    }
}

// import { Form, Card, Input, Row, Col } from 'antd';

// class MyForm extends React.Component { // eslint-disable-line
//     render() {
//         console.log('asdfadfs');
//         const names = ['A', 'B', 'C', 'D', 'E', 'F'];
//         const inputCount = 20;
//         const formItemLayout = {
//             labelCol: { span: 4 },
//             wrapperCol: { span: 20 },
//         };
//         const subForms = names.map((name) => {
//             const fields = Array.from(Array(inputCount).keys()).map((key) => {
//                 const { getFieldDecorator } = this.props.form; // eslint-disable-line
//                 return (
//                     <Row key={key}>
//                         <Form.Item label={`${name}-${key}`} {...formItemLayout}>
//                             {getFieldDecorator(`${name}-${key}`)(<Input />)}
//                         </Form.Item>
//                     </Row>
//                 );
//             });
//             return (
//                 <Col span={4} key={name}>
//                     <Card title={`Form${name}`}>
//                         {fields}
//                     </Card>
//                 </Col>
//             );
//         });
//         return (
//             <Form>
//                 <Row gutter={8}>
//                     {subForms}
//                 </Row>
//             </Form>
//         );
//     }
// }

// export default Form.create()(MyForm);
