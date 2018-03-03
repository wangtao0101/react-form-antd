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
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            value: this.props.value,
            validateStatus: undefined,
            explain: undefined,
        };

        context.register(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.value !== this.props.value) {
    //         this.setState({
    //             value: nextProps.value,
    //         });
    //     }
    // }

    componentWillUnmount() {
        this.context.unregister(this);
    }


    onCollect = (event) => {
        const value = getValueFromEvent(event);
        const result = this.validateValue(value);
        this.setState({
            validateStatus: result[0],
            explain: result[1],
            value,
        });
    };

    onValidate = (event) => {
        const value = getValueFromEvent(event);
        const result = this.validateValue(value);
        this.setState({
            validateStatus: result[0],
            explain: result[1],
        });
    }

    getUserHandle = (trigger, ownHandle) => {
        if (this.props.children.props[trigger]) {
            return (event) => {
                ownHandle(event);
                this.props.children.props[trigger](event);
            };
        }
        return ownHandle;
    }

    validate = () => {
        const result = this.validateValue(this.state.value);
        this.setState({
            validateStatus: result[0],
            explain: result[1],
        });
        return result[1];
    }

    validateValue = (value) => {
        const validateRules = this.props.rules;
        for (let i = 0; i < validateRules.length; i += 1) {
            const rule = validateRules[i];
            if (rules[rule.name]) {
                const status = rules[rule.name](value, rule.args);
                if (status) {
                    return ['error', rule.message || ''];
                }
            } else if (rule.validator) {
                /* TODO: support return promise */
                const msg = rule.validator(value);
                if (msg == null) {
                    return ['success'];
                }
                return ['error', msg || ''];
            }
        }

        return ['success'];
    }

    renderLabel = () => {
        const { label, labelCol, prefixCls, colon, id } = this.props;
        const context = this.context;

        /* TODO: get require rule */
        // const required = this.isRequired();
        const required = false;

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
        const {
            prefixCls, label, wrapperCol, children, id, hasFeedback, style, trigger, valuePropName, disabled,
        } = this.props;

        const { value, explain } = this.state;

        const validateStatus = this.props.validateStatus || this.state.validateStatus;

        const className = classNames({
            [`${prefixCls}-item-control`]: true,
            'has-feedback': hasFeedback,
            'has-success': validateStatus === 'success' && !disabled,
            'has-warning': validateStatus === 'warning' && !disabled,
            'has-error': validateStatus === 'error' && !disabled,
            'is-validating': validateStatus === 'validating' && !disabled,
        });

        const itemClassName = classNames({
            [`${prefixCls}-item`]: true,
            [`${prefixCls}-item-with-help`]: !disabled && explain != null && explain !== '',
        });

        const childrenProps = {
            id,
            disabled,
        };

        childrenProps[valuePropName] = value;
        childrenProps[trigger] = this.getUserHandle(trigger, this.onCollect);

        const validateTrigger = normalizeValidateTrigger(this.props.validateTrigger).filter(tr => tr !== trigger);
        validateTrigger.forEach((tr) => { childrenProps[tr] = this.getUserHandle(trigger, this.onValidate); });

        return label ? (
            <Row className={`${prefixCls}-item`} style={style}>
                {this.renderLabel()}
                <Col className={className} {...wrapperCol}>
                    {React.cloneElement(children, childrenProps)}
                </Col>
            </Row>
        ) : (
            <div className={itemClassName}>
                <div className={className}>
                    {React.cloneElement(children, childrenProps)}
                    {
                        !disabled && explain != null && <div className={`${prefixCls}-explain`}>{explain}</div>
                    }
                </div>
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
    disabled: false,
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
    disabled: PropTypes.bool,
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
       (done) rules 校验规则，参考下方文档 object[]
       validateFirst 当某一规则校验不通过时，是否停止剩下的规则的校验 boolean false
       exclusive 是否和其他控件互斥，特别用于 Radio 单选控件 boolean false
       normalize 转换默认的 value 给控件，一个选择全部的例子 function(value, prevValue, allValues): any -
     */
};
