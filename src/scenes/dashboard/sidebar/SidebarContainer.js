import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import { actions } from '../duck';

const mapStateToProps = state => ({ toDoBoardRow: state.dashboard.toDoBoardRow });

const mapDispatchToProps = {
    addNewDashboard: actions.addNewDashboard,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Sidebar);
