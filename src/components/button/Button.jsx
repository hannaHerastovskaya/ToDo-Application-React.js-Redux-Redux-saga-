/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonStyle from './Button.styles';

class Button extends Component {
    static propTypes = {
        value: PropTypes.string,
        onClick: PropTypes.func,
        style: PropTypes.object,
    };

    static defaultProps = {
        value: 'button',
        onClick: undefined,
        style: {},
    };

    render() {
        const { value, onClick, style } = this.props;
        return (
            <ButtonStyle
                type="submit"
                onClick={onClick}
                style={style}
            >
                {value}
            </ButtonStyle>
        );
    }
}

export default Button;
