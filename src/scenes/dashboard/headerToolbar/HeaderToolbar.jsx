import React, { Component } from 'react';
import * as styled from './HeaderToolbar.styled';
import { InputLabel } from '../../../components/dropDown/DropDown.styled';
import Search from '../../../components/search/Search';
import { DropDownMaterial } from '../../../components/dropDown/DropDownMaterial';
import MultiSelect from '../multiSelect/MultiSelectContainet';

class HeaderToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alignment: 'my',
            visibleFilters: false,
            searchValue: '',
        };
    }

    handleChange = (newValue) => {
        const { actions } = this.props;
        this.setState({ searchValue: newValue });
        actions.search(newValue);
        actions.fetchDashboard();
    };

    closeSettings = () => {
        const { visible } = this.state;
        this.setState(({ visible: !visible }));
    };

    handleAlignment = () => {
        const { actions } = this.props;
        const { alignment } = this.state;
        const value = alignment === 'my' ? 'shared' : alignment === 'shared' && 'my';
        this.setState({ alignment: value }, () => actions.updateViewLists(value));
    };


    render() {
        const { alignment, visibleFilters, searchValue } = this.state;
        const { actions, search, sort } = this.props;
        return (
            <styled.Head style={{ width: '30%' }}>
                <styled.SearchContent
                    style={{ height: '25px', position: 'relative' }}
                    onClick={() => this.setState({ visibleFilters: !visibleFilters })}
                >
                    <Search
                        onChange={this.handleChange}
                        value={searchValue}
                        style={{
                            width: '98%',
                        }}
                        placeholder="Search dashboard"
                    />
                </styled.SearchContent>
                <div
                    style={{
                        position: 'absolute',
                        backgroundColor: 'white',
                        boxShadow: ' 0 0  4px 0 rgba(0,0,0,0.3)',
                        borderRadius: ' 0 0 8px 8px',
                        width: '100%',
                        top: '37px',
                        display: visibleFilters ? 'flex' : 'none',
                        flexDirection: 'column',
                    }}
                >
                    <DropDownMaterial
                        label="Sort: "
                        styleLabel={{
                            paddingTop: '16px', color: 'grey', width: '20%', paddingLeft: '8px', fontSize: '15px',
                        }}
                        value={[
                            'By id, low to high',
                            'By id, high to low',
                            'By Name, a - Z',
                            'By Name, Z - a',
                            'By Created Date, low to high',
                            'By Created Date, high to low',
                            'By Modified Date, low to high',
                            'By Modified Date, high to low',
                        ]}
                        style={{
                            height: '40px',
                            marginTop: '12px',
                            marginRight: '12px',

                        }}
                        selectSorting={actions.changeSort}
                        defaultValue={sort}
                    />
                    <MultiSelect />
                    <styled.CheckboxDiv
                        style={{
                            padding: 0, margin: 0, display: 'flex', alignItems: 'center', flexDirection: 'row',
                        }}
                    >
                        <InputLabel
                            style={{
                                color: 'grey', width: '20%', paddingLeft: '8px', fontSize: '15px',
                            }}
                            htmlFor="select-multiple-chip"
                        >View lists:
                        </InputLabel>

                        <styled.ToggleButtonGroup
                            style={{
                                backgroundColor: 'white',
                                boxShadow: '0 0  4px 0  rgba(0,0,0,0.2)',
                                borderBottom: '1px solid grey',
                                margin: '12px 12px 12px 0px',
                                borderRadius: '4px',
                                height: '30px',
                                width: '75%',
                            }}
                            value={alignment}
                            exclusive
                            onChange={this.handleAlignment}
                        >
                            <styled.ToggleButton
                                style={{
                                    color: 'black',
                                    height: '30px',
                                    display: 'flex',
                                    borderRight: '1px solid lightgrey',
                                    flex: 1,
                                }}
                                value="my"
                            >
                                            My
                            </styled.ToggleButton>
                            <styled.ToggleButton
                                style={{
                                    color: 'black',
                                    height: '30px',
                                    display: 'flex',
                                    flex: 1,
                                }}
                                value="shared"
                            >
                                            Shared
                            </styled.ToggleButton>
                        </styled.ToggleButtonGroup>
                    </styled.CheckboxDiv>
                </div>
            </styled.Head>
        );
    }
}

export default HeaderToolbar;
