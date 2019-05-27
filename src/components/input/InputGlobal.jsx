import React, { Component } from 'react';
import Input from '@material-ui/core/Input';

class InputGlobal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    componentWillReceiveProps = (newProps) => {
        if (newProps.value !== this.props.value) {
            this.setState({
                value: newProps.value,
            });
        }
    };

    handleChange = (e, { onChange } = this.props) => {
        const { target: { value } } = e;
        this.setState({ value });
        if (onChange) {
            onChange(value);
        }
    };

    handleBlur = (e, { onBlur } = this.props) => {
        const { target: { value } } = e;
        this.setState({ value: (value || 'To do list') });
        onBlur(value);
    };

    render() {
        const { style, placeholder, icon } = this.props;
        const { value } = this.state;
        return (

            <Input
                value={value}
                onChange={this.handleChange}
                style={style}
                onKeyPress={e => e.key === 'Enter' && e.target.blur()}
                onBlur={this.handleBlur}
                placeholder={placeholder}
            />
        );
    }
}

export default InputGlobal;
