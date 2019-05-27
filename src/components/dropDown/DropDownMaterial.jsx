import React, { Component } from 'react';
import { Select, InputLabel, MenuItem } from './DropDown.styled';


export class DropDownMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueSelect: props.defaultValue,
        };
    }

    handleChange = (e) => {
        this.setState({
            valueSelect: e.target.value,
        });
        this.props.selectSorting(e.target.value);
    };

    render() {
        const { value, label, style, styleLabel } = this.props;
        const { valueSelect } = this.state;
        return (
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <InputLabel
                    key='label'
                    htmlFor="select-multiple-chip"
                    style={styleLabel}
                >
                    {label}
                </InputLabel>
                <Select
                    key="DropDownSelect"
                    value={valueSelect}
                    onChange={this.handleChange}
                    style={style}
                >
                    {
                        value.map(i => (
                            <MenuItem
                                key={i}
                                value={i}
                                style={{
                                    fontSize: '12px',
                                    height: '15px important!',
                                    maxHeight: '20px',
                                }}
                            >
                                {i}
                            </MenuItem>))
                    }
                </Select>
            </div>
        );
    }
}
