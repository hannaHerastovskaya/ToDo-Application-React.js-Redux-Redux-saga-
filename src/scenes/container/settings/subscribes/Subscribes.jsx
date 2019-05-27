import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as styled from './Subscribes.styles';
import { InputLabel } from '../../../../components/dropDown/DropDown.styled';
import Search from '../../../../components/search/Search';
import { SearchContent } from '../../../dashboard/headerToolbar/HeaderToolbar.styled';

const styles = () => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        height: 'auto',
        marginTop: 8,
    },
    table: {
        minWidth: 500,
        // minHeight: 300,
    },
    header: {
        backgroundColor: 'gray',
        color: 'white',
        fontSize: 16,
    },
});

class Subscribes extends Component {
    componentWillMount = ({ actions } = this.props) => actions.fetchSubscribers();

    handleChange = (newValue) => {
        const { actions } = this.props;
        actions.searchSubscribers(newValue);
    };

    render() {
        const {
 actions, search, subscribers, classes 
} = this.props;
        return (
            <styled.Subscribes>
                <styled.Title> Your subscribers list</styled.Title>
                <SearchContent style={{ margin: '8px 12px 8px 8px' }}>
                    <InputLabel htmlFor="select-multiple-chip">Search subscribers:</InputLabel>
                    <Search
                        onChange={this.handleChange}
                        value={search}
                        style={{ width: '90%', flex: 'none' }}
                        placeholder="Enter username..."
                        visible
                    />
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead className={classes.header}>
                                <TableRow>
                                    <TableCell align="center" className={classes.header}>Name</TableCell>
                                    <TableCell align="center" className={classes.header}>Username</TableCell>
                                    <TableCell align="center" className={classes.header}>E-mail</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    subscribers.length === 0
                                        ? (
                                            <TableRow>
                                                <TableCell colSpan="3" align="center">
                                                    You are have not subscribers
                                                </TableCell>
                                            </TableRow>
                                        )
                                        : subscribers.map((subscriber, i) => (
                                            <TableRow key={subscriber}>
                                                <TableCell align="center" key={subscriber.name}>{subscriber.name}</TableCell>
                                                <TableCell align="center" kesubscribery={i}>{subscriber.username}</TableCell>
                                                <TableCell align="center" key={subscriber.email}>{subscriber.email}</TableCell>
                                            </TableRow>
                                        ))
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </SearchContent>

            </styled.Subscribes>
        );
    }
}

Subscribes.propTypes = {};

export default withStyles(styles)(Subscribes);
