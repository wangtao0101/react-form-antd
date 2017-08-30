import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Col, Row } from 'antd';

export default class FormItem extends React.Component {
    static contextTypes = {
        register: PropTypes.func.isRequired,
        unregister: PropTypes.func.isRequired,
        vertical: PropTypes.bool,
        // validateState: PropTypes.func.isRequired,
        // components: PropTypes.objectOf(PropTypes.any),
        // errors: PropTypes.objectOf(PropTypes.array),
        // validateError: PropTypes.objectOf(PropTypes.any),
    };

    componentWillReceiveProps(_nextProps) {
        // if (nextProps.value !== this.props.value) {
        //     this.setState({
        //         value: nextProps.value,
        //         isChanged: true,
        //     }, () => {
        //         this.context.validateState(this.props.name);
        //     });
        // }
    }

    componentWillUnmount() {
        this.context.unregister(this);
    }

    // onChange = (event) => {
    //     // TODO: Refactor conditions
    //     const isChecked = this.state.isCheckbox ? !this.state.isChecked : true;
    //     const checkboxValue = isChecked ? event.target.value : '';
    //     const value = this.state.isCheckbox ? checkboxValue : event.target.value;

    //     event.persist();

    //     this.setState({
    //         value,
    //         isChanged: true,
    //         isChecked,
    //     }, () => {
    //         this.context.validateState(this.props.name);

    //         (this.props.onChange || noop)(event);
    //     });
    // };

    // onBlur = (event) => {
    //     event.persist();

    //     this.setState({
    //         isUsed: true,
    //     }, () => {
    //         this.context.validateState(this.props.name);

    //         (this.props.onBlur || noop)(event);
    //     });
    // };

    renderLabel = () => {
        const { label, labelCol, prefixCls, colon, id } = this.props;
        const context = this.context;
        // const required = this.isRequired();
        const required = true;

        const className = classNames({
            [`${prefixCls}-item-required`]: required,
        });

        let labelChildren = label;
        // Keep label is original where there should have no colon
        const haveColon = colon && !context.vertical;
        // Remove duplicated user input colon
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
        const { prefixCls, label, wrapperCol, children, id, hasFeedback, style } = this.props;

        /* TODO: get validate status */
        const validateStatus = this.props.validateStatus;

        const className = classNames({
            [`${prefixCls}-item-control`]: true,
            'has-feedback': hasFeedback,
            'has-success': validateStatus === 'success',
            'has-warning': validateStatus === 'warning',
            'has-error': validateStatus === 'error',
            'is-validating': validateStatus === 'validating',
        });

        return (
            <Row className={`${prefixCls}-item`} style={style}>
                {this.renderLabel(label)}
                <Col className={className} {...wrapperCol}>
                    {React.cloneElement(children, { size: 'large', id })}
                </Col>
            </Row>
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
    // value: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    // onChange: PropTypes.func,
    // onBlur: PropTypes.func
};
