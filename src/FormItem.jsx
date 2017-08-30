import React from 'react';
import PropTypes from 'prop-types';

export default class FormItem extends React.Component {
    static contextTypes = {
        register: PropTypes.func.isRequired,
        unregister: PropTypes.func.isRequired,
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

    render() {
        return (
            <div className="ant-form-item-control has-feedback has-success">
                { React.cloneElement(this.props.children, { size: 'large' }) }
            </div>
        );
    }
}

FormItem.propTypes = {
    children: PropTypes.element.isRequired,
    // value: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    // onChange: PropTypes.func,
    // onBlur: PropTypes.func
};
