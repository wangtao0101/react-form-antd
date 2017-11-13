import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col, Row } from 'antd';
import { getValueFromEvent, normalizeValidateTrigger } from './utils';
import rules from './rules';

export default class FormItem extends React.Component {
    static contextTypes = {
        register: PropTypes.func.isRequired,
        unregister: PropTypes.func.isRequired,
        vertical: PropTypes.bool,
        validateState: PropTypes.func.isRequired,
        // components: PropTypes.objectOf(PropTypes.any),
        // errors: PropTypes.objectOf(PropTypes.array),
        // validateError: PropTypes.objectOf(PropTypes.any),
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            value: this.props.value,
            validateStatus: undefined,
        };

        context.register(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: nextProps.value,
            });
        }
    }

    componentWillUnmount() {
        this.context.unregister(this);
    }

    onCollect = (event) => {
        const value = getValueFromEvent(event);
        this.context.validateState(this.props.id, value, this.props.rules);
    };

    onValidate = (value) => {
        console.log(value); // eslint-disable-line
    }

    renderLabel = () => {
        const { label, labelCol, prefixCls, colon, id } = this.props;
        const context = this.context;

        /* TODO: get require rule */
        // const required = this.isRequired();
        const required = true;

        const className = classNames({
            [`${prefixCls}-item-required`]: required,
        });

        let labelChildren = label;
        const haveColon = colon && !context.vertical;
        if (haveColon && typeof label === 'string' && label.trim() !== '') {
            labelChildren = label.replace(/[：|:]\s*$/, '');
        }

        return label ? (
            <Col {...labelCol} key="label" className={`${prefixCls}-item-label`}>
                <label
                    htmlFor={id}
                    className={className}
                    title={typeof label === 'string' ? label : ''}
                >
                    {labelChildren}
                </label>
            </Col>
        ) : null;
    }

    render() {
        const { prefixCls, label, wrapperCol, children, id, hasFeedback, style, trigger, valuePropName } = this.props;
        const { value } = this.state;

        const validateStatus = this.props.validateStatus || this.state.validateStatus;

        const className = classNames({
            [`${prefixCls}-item-control`]: true,
            'has-feedback': hasFeedback,
            'has-success': validateStatus === 'success',
            'has-warning': validateStatus === 'warning',
            'has-error': validateStatus === 'error',
            'is-validating': validateStatus === 'validating',
        });

        const childrenProps = {
            size: 'large',
            id,
        };

        childrenProps[valuePropName] = value;
        childrenProps[trigger] = this.onCollect;

        const validateTrigger = normalizeValidateTrigger(this.props.validateTrigger).filter(tr => tr !== trigger);
        validateTrigger.forEach((tr) => { childrenProps[tr] = this.onValidate; });

        return label ? (
            <Row className={`${prefixCls}-item`} style={style}>
                {this.renderLabel()}
                <Col className={className} {...wrapperCol}>
                    {React.cloneElement(children, childrenProps)}
                </Col>
            </Row>
        ) : (
            <div className={className}>
                {React.cloneElement(children, childrenProps)}
            </div>
        );
    }
}

FormItem.defaultProps = {
    prefixCls: 'ant-form',
    label: undefined,
    labelCol: {},
    wrapperCol: {},
    colon: true,
    hasFeedback: false,
    validateStatus: undefined,
    style: {},
    value: '',
    trigger: 'onChange',
    valuePropName: 'value',
    getValueFromEvent,
    validateTrigger: undefined,
    rules: [],
};

FormItem.propTypes = {
    children: PropTypes.element.isRequired,
    id: PropTypes.string.isRequired,
    prefixCls: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    labelCol: PropTypes.object,
    wrapperCol: PropTypes.object,
    colon: PropTypes.bool,
    hasFeedback: PropTypes.bool,
    validateStatus: PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
    style: PropTypes.object,
    value: PropTypes.any,
    trigger: PropTypes.string,
    valuePropName: PropTypes.string,
    getValueFromEvent: PropTypes.func,
    validateTrigger: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    rules: PropTypes.array,
    // value: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    // onChange: PropTypes.func,
    // onBlur: PropTypes.func
    /**
     * to do props
     * (done) valuePropName 子节点的值的属性，如 Switch 的是 'checked' string 'value'
       (no need) initialValue 子节点的初始值，类型、可选值均由子节点决定(注意：由于内部校验时使用 === 判断是否变化，建议使用变量缓存所需设置的值而非直接使用字面量))
       (done) trigger 收集子节点的值的时机 string 'onChange'
       (done) getValueFromEvent 可以把 onChange 的参数（如 event）转化为控件的值 function(..args) reference
       (done) validateTrigger 校验子节点值的时机 string|string[] 'onChange'
       rules 校验规则，参考下方文档 object[]
       validateFirst 当某一规则校验不通过时，是否停止剩下的规则的校验 boolean false
       exclusive 是否和其他控件互斥，特别用于 Radio 单选控件 boolean false
       normalize 转换默认的 value 给控件，一个选择全部的例子 function(value, prevValue, allValues): any -
     */
};
