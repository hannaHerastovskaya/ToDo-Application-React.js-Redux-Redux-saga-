import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import * as styled from '../../multiSelect/popapAddTag/popapAddTag.styled';
import * as thisStyled from './PopapAddTagToTask.styled';
import * as styledSettings from '../../../container/settings/Settings.styles';

export default class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTag: '',
        };
    }

    addTagToTask = (idTask, idTag) => {
        const { actions, handleClose, getTagsTask } = this.props;
        actions.addTagToTask({ idTask, idTag });
        handleClose();
        getTagsTask();
    };

    render() {
        const {
            show, handleClose, allTags, selectedTask,
        } = this.props;
        const { selectedTag } = this.state;
        return (
            <div>
                <Dialog open={show} onClose={handleClose}>
                    <styledSettings.Window style={{ width: '315px', height: '45vh', overflowY: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <styled.Title>Add tag to task</styled.Title>
                            <styledSettings.CloseWindow onClick={() => handleClose()}>
                                &times;
                            </styledSettings.CloseWindow>
                        </div>
                        <styledSettings.Main
                            style={{
                                alignItems: 'flex-start',
                                flexDirection: 'column',
                                overflowY: 'auto',
                            }}
                        >
                            <p>Choose tag:</p>
                            <div style={{
                                display: 'flex',
                                flexFlow: 'row wrap',
                                width: '99.5%',
                                overflowX: 'hidden',
                                overflowY: 'auto',
                                flex: 'auto',
                                border: '1px solid whitesmoke',
                            }}
                            >
                                {
                                    allTags.map(tag => (
                                        <thisStyled.Tag
                                            style={{
                                                padding: '6px 8px',
                                                margin: '4px',
                                                borderRadius: '20px',
                                                opacity: 0.9,
                                                backgroundColor: tag.color,
                                                boxShadow: selectedTag === tag.id
                                                    ? '0 0 6px 0 rgba(0,0,0,0.7)'
                                                    : 'none',
                                            }}
                                            onClick={() => this.setState({ selectedTag: tag.id })}
                                        >{tag.tagName}
                                        </thisStyled.Tag>
                                    ))
                                }
                            </div>
                        </styledSettings.Main>
                        <styled.ButtonLine>
                            <styled.ButtonCancel onClick={() => handleClose()}>
                                Cancel
                            </styled.ButtonCancel>
                            <styled.ButtonSuccess onClick={() => this.addTagToTask(selectedTask, selectedTag)}>
                                Add
                            </styled.ButtonSuccess>
                        </styled.ButtonLine>
                    </styledSettings.Window>
                </Dialog>
            </div>
        );
    }
}
