import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/lib/form/style/css';
import classNames from 'classnames';
import invariant from 'invariant';
import rules from './rules';

export default class Form extends Component {
    static childContextTypes = {
        register: PropTypes.func.isRequired,
        unregister: PropTypes.func.isRequired,
        vertical: PropTypes.bool,
        validateState: PropTypes.func.isRequired,
        // errors: PropTypes.objectOf(PropTypes.array),
        // validateError: PropTypes.objectOf(PropTypes.any),
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
            validateState: this.validateState,
            // components: this.components,
            // errors: this.state.errors,
            // validateError: this.state.validateError,
        };
    }

    componentDidMount() {
        // this.validateState();
    }

    // getErrors = () => Object.keys(this.components).reduce((prev, name) => {
    //     const component = this.components[name];
    //     const validations = component.props.validations;
    //     const length = validations.length;

    //     for (let i = 0; i < length; i += 1) {
    //         if (!rules[validations[i]].rule(component.state.value, this.components)) {
    //             /* eslint-disable */
    //             prev[name] = prev[name] || [];
    //             prev[name].push(validations[i]);
    //             /* eslint-enable */
    //         }
    //     }

    //     return prev;
    // }, {});

    // getValidationError = () => Object.keys(this.components).reduce((prev, name) => {
    //     const component = this.components[name];
    //     const validateFuntion = component.props.validateFuntion;
    //     let error;

    //     if (validateFuntion && (typeof validateFuntion === 'function')) {
    //         error = validateFuntion(component.state.value);
    //         if (error !== null && error !== undefined) {
    //             prev[name] = error; // eslint-disable-line
    //         }
    //     }
    //     return prev;
    // }, {});

    register = (component) => {
        invariant(typeof component.props.id === 'string', 'should add id props for FormItem');
        invariant(this.components[component.props.id] === undefined,
            'id props of all FormItems in same Form should be unique');
        this.components[component.props.id] = component;
    };

    unregister = (component) => {
        delete this.components[component.props.id];
    };

    validateState = (name, value, validateRules) => {
        let validateStatus;
        for (let i = 0; i < validateRules.length; i += 1) {
            const rule = validateRules[i];
            if (rules[rule.name]) {
                const status = rules[rule.name](value);
                if (status) {
                    validateStatus = 'error';
                    break;
                }
            }
        }

        this.components[name].setState({
            value,
            validateStatus,
        });
    }

    // validate = (name) => {
    //     this.components[name].setState({
    //         isUsed: true,
    //         isChanged: true,
    //     }, this.validateState);
    // };

    // validateAll() {
    //     Object.keys(this.components).forEach((name) => {
    //         this.components[name].setState({
    //             isUsed: true,
    //             isChanged: true,
    //         });
    //     });

    //     const errors = this.getErrors();
    //     const validateError = this.getValidationError();

    //     this.setState({ errors, validateError });
    //     return Object.assign(errors, validateError);
    // }

    // showError = (name, error) => {
    //     this.components[name].setState({
    //         isUsed: true,
    //         isChanged: true,
    //     }, () => {
    //         this.setState({
    //             errors: {
    //                 ...this.state.errors,
    //                 [name]: [error],
    //             },
    //         });
    //     });
    // };

    // hideError = (name) => {
    //     const errors = Object.assign({}, this.state.errors);

    //     delete errors[name];

    //     this.setState({ errors });
    // };

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
