import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/lib/form/style/css';
// import rules from './rules';

export default class Form extends Component {
    static childContextTypes = {
        register: PropTypes.func.isRequired,
        unregister: PropTypes.func.isRequired,
        // validateState: PropTypes.func.isRequired,
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
            // validateState: this.validateState,
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
        this.components[component.props.name] = component;
    };

    unregister = (component) => {
        const errors = Object.assign({}, this.state.errors);

        delete this.components[component.props.name];
        delete errors[component.props.name];

        this.setState({ errors });
    };

    // validateState = () => {
    //     const errors = this.getErrors();
    //     const validateError = this.getValidationError();

    //     this.setState({ errors, validateError });
    // };

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
        return (
            <form {...this.props}>
                {this.props.children}
            </form>
        );
    }
}

Form.propTypes = {
    children: PropTypes.element.isRequired,
};
