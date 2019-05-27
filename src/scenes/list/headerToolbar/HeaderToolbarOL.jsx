import React, { Component } from 'react';
import * as styledHeaderToolbar from '../../dashboard/headerToolbar/HeaderToolbar.styled';
import { InputLabel } from '../../../components/dropDown/DropDown.styled';
import Search from '../../../components/search/Search';

class HeaderToolbarOL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alignment: ['notDone', 'done'],
            visibleFilters: false,
            searchValue: '',
        };
    }

    componentWillMount = ({ match, actions, actionsBoard } = this.props) => {
        actionsBoard.fetchDashboard();
        actions.fetchList({ idList: match.params.id });
    };

    handleFormat = (event, alignment) => this.setState({ alignment });

    handleChange = (newValue) => {
        const { actions, match } = this.props;
        this.setState({ searchValue: newValue });
        actions.changeSearch({
            idDashboard: match.params.id,
            search: newValue,
        });
    };

    render() {
        const { alignment, searchValue, visibleFilters } = this.state;
        const {
            match, actions, done, notDone,
        } = this.props;
        return (
            <styledHeaderToolbar.Head style={{ width: '30%'}}>
                <styledHeaderToolbar.SearchContent
                    style={{ height: '25px', position: 'relative' }}
                    onClick={() => this.setState({ visibleFilters: !visibleFilters })}
                >
                    <Search
                        onChange={this.handleChange}
                        value={searchValue}
                        style={{
                            width: '98%',
                        }}
                        placeholder="Search tasks"
                    />
                </styledHeaderToolbar.SearchContent>
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
                    <styledHeaderToolbar.CheckboxDiv
                        style={{
                            margin: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', padding: '12px',
                        }}
                    >
                        <InputLabel
                            style={{
                                color: 'grey', width: '20%', fontSize: '15px',
                            }}
                            htmlFor="select-multiple-chip"
                        >View :
                        </InputLabel>
                        <styledHeaderToolbar.ToggleButtonGroup
                            style={{
                                backgroundColor: 'white',
                                boxShadow: '0 0  4px 0  rgba(0,0,0,0.2)',
                                borderBottom: '1px solid grey',

                                borderRadius: '4px',
                                width: '80%',
                                height: '30px',
                            }}
                            value={alignment}
                            onChange={this.handleFormat}
                        >
                            <styledHeaderToolbar.ToggleButton
                                style={{
                                    color: 'black',
                                    height: '30px',
                                    display: 'flex',
                                    alignSelf: 'center',
                                    flex: 1,
                                    borderRight: '1px solid lightgrey',
                                }}
                                onClick={() => actions.selectDoneAction({ done, idList: match.params.id })}
                                value="done"
                            >
                                done
                            </styledHeaderToolbar.ToggleButton>
                            <styledHeaderToolbar.ToggleButton
                                style={{
                                    color: 'black',
                                    height: '30px',
                                    display: 'flex',
                                    alignSelf: 'center',
                                    flex: 1,
                                }}
                                onClick={() => actions.selectedNotDoneAction({
                                    notDone,
                                    idList: match.params.id,
                                })}
                                value="notDone"
                            >
                                not done
                            </styledHeaderToolbar.ToggleButton>
                        </styledHeaderToolbar.ToggleButtonGroup>
                    </styledHeaderToolbar.CheckboxDiv>
                </div>
            </styledHeaderToolbar.Head>
        );
    }
}


export default HeaderToolbarOL;
