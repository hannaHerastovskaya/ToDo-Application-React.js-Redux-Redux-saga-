import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MultiSelect from './MultiSelect';
import { actions } from '../duck';

const mapStateToProps = state => ({
    tags: state.dashboard.tags,
    visible: state.dashboard.visible,
    selectedTags: state.dashboard.selectedTags,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchTags: actions.fetchTags,
        addTag: actions.addTag,
        deleteTag: actions.deleteTag,
        visiblePopap: actions.visiblePopap,
        getSelectedTags: actions.getSelectedTags,
        initialize: actions.initialize,
    }, dispatch),
});


export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(MultiSelect);
