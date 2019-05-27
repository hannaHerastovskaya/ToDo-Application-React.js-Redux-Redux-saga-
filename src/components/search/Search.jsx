import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Down from '@material-ui/icons/ArrowDropDown';
import * as styled from './Search.styles';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        };
    }

    handleChange = (e, { onChange } = this.props) => {
        const { target: { value } } = e;
        this.setState({ value });
        onChange(value);
    };

    render() {
        const { style, placeholder, value, visible } = this.props;

        return (
            <styled.SearchCont style={{ backgroundColor: 'whitesmoke' }}>
                <styled.SearchIcon style={{ fontSize: '20px', paddingRight: '4px' }} />
                <Input
                    value={value}
                    onChange={this.handleChange}
                    placeholder={placeholder}
                    style={style}
                />
                { !visible ? (<Down style={{ color: 'grey', paddingTop: '4px', cursor: 'pointer' }} />) : null }
            </styled.SearchCont>


        );
    }
}

export default Search;
