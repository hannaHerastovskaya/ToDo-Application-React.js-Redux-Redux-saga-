import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import * as styled from './DropDown.styled';
import list from '../../image/list-menu.svg';

class DropDown extends Component {
    static propTypes = {
        changeValue: PropTypes.func,
        titleButton: PropTypes.string,
        // possibleValues: PropTypes.arrayOf(PropTypes.number),
        drop: PropTypes.string,
        stylesValues: PropTypes.string,
        stylesButton: PropTypes.string,
        // currentValue: PropTypes.string,
    };

    static defaultProps = {
        changeValue: undefined,
        titleButton: 'Check',
        // possibleValues: undefined,
        drop: 'down',
        stylesValues: '',
        stylesButton: '',
        // currentValue: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    changeVisible = () => {
        const { visible } = this.state;
        this.setState({ visible: !visible });
    };


    render() {
        const { visible } = this.state;
        const {
            changeValue,
            currentValue,
            possibleValues,
            drop,
            stylesContainer,
            stylesValues,
            titleButton,
            stylesButton,
            iconVisible,
            tooltip,
            placement,
        } = this.props;
        return (
            <Tooltip title={tooltip} placement={placement || 'top'}>
                <styled.Container>
                    <styled.Ul
                        visible={visible}
                        drop={drop}
                        stylesContainer={stylesContainer}
                    >
                        {
                            possibleValues.map(value => (

                                <styled.Li
                                    onClick={() => { changeValue(value); this.changeVisible(); }}
                                    checked={currentValue === value}
                                    key={value}
                                    stylesValues={stylesValues}
                                >
                                    {value}
                                </styled.Li>
                            ))
                        }
                    </styled.Ul>
                    {
                        titleButton !== '' ? (
                            <styled.Button
                                onClick={this.changeVisible}
                                stylesButton={stylesButton}
                            >
                                { titleButton }
                                <styled.Down className="fa fa-angle-down" />
                            </styled.Button>
                        )
                            : (
                                <styled.Icon
                                    src={list}
                                    alt="list"
                                    onClick={this.changeVisible}
                                    style={{ display: iconVisible }}
                                />
                            )

                    }
                </styled.Container>
            </Tooltip>
        );
    }
}

export default DropDown;
