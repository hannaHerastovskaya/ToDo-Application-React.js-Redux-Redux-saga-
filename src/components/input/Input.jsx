import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputStyles from './Input.styles';
import Profile from '../../scenes/container/settings/profile/Profile';


class Input extends Component {
    constructor(props) {
        super(props);
        const { value } = props;
        this.state = { value };
    }

    componentWillReceiveProps = (newProps) => {
        const { value } = this.props;
        if (newProps.value !== value) {
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

    render() {
        const { border, style } = this.props;
        const { value } = this.state;
        return (
            <InputStyles
                value={value}
                onChange={this.handleChange}
                border={border}
                style={style}
                onKeyPress={e => e.key === 'Enter' && e.target.blur()}
                onBlur={() => this.setState({ value: (value || 'black') })}
            />
        );
    }
}

export default Input;

Profile.propTypes = {
    value: PropTypes.string,
    border: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
};

Profile.defaultProps = {
    style: {},
    value: '',
    border: '',
};
