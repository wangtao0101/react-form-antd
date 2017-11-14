import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import invariant from 'invariant';

import 'antd/lib/form/style/css';

export default class Form extends Component {
    static childContextTypes = {
        register: PropTypes.func.isRequired,
        unregister: PropTypes.func.isRequired,
        vertical: PropTypes.bool,
    };

    constructor(props) {
        super(props);

        this.components = {};

        this.state = {
            errors: {},
            validateError: {},
        };
    }

    getChildContext() {
        return {
            register: this.register,
            unregister: this.unregister,
            vertical: this.props.layout === 'vertical',
        };
    }

    componentDidMount() {
        // this.validateState();
    }

    getValue(name) {
        const result = {};
        if (!name) {
            Object.keys(this.components).forEach((n) => {
                result[n] = this.components[n].state.value;
            });
            return result;
        }
        return this.components[name].state.value;
    }

    register = (component) => {
        invariant(typeof component.props.id === 'string', 'should add id props for FormItem');
        invariant(this.components[component.props.id] === undefined,
            'id props of all FormItems in same Form should be unique');
        this.components[component.props.id] = component;
    };

    unregister = (component) => {
        delete this.components[component.props.id];
    };

    validate(name) {
        if (!name) {
            const result = {};
            Object.keys(this.components).forEach((n) => {
                const r = this.components[n].validate();
                if (r != null) {
                    result[n] = r;
                }
            });
            return result;
        }
        return this.components[name].validate();
    }

    render() {
        const { prefixCls, layout, children, className, ...restProps } = this.props;

        const formClassName = classNames(prefixCls, {
            [`${prefixCls}-horizontal`]: layout === 'horizontal',
            [`${prefixCls}-vertical`]: layout === 'vertical',
            [`${prefixCls}-inline`]: layout === 'inline',
            // [`${prefixCls}-hide-required-mark`]: hideRequiredMark,
        }, className);

        return (
            <form {...restProps} className={formClassName}>
                {children}
            </form>
        );
    }
}

Form.defaultProps = {
    prefixCls: 'ant-form',
    layout: 'horizontal',
    className: {},
};

Form.propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
    prefixCls: PropTypes.string,
    layout: PropTypes.oneOf(['horizontal', 'inline', 'vertical']),
    className: PropTypes.object,
};
