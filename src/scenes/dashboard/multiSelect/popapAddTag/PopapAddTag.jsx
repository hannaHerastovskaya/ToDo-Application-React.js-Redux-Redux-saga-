import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';
import * as styledSettings from '../../../container/settings/Settings.styles';
import * as styled from './popapAddTag.styled';


class PopapAddTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorTag: '#fff',
            nameTag: '',
            nameRepeatTest: '',
            disabled: true,
        };
    }

    handleChangeComplete = (color) => {
        this.setState({ colorTag: color.hex });
    };

    changeVisiblePopap = () => {
        const { actions } = this.props;
        actions.visiblePopap();
    };

    testRepeatName = (allTags, nameTag) => (
        allTags.filter(tag => tag.tagName === nameTag).length || !nameTag
            ? (this.setState({ nameRepeatTest: 'this name is already there or the field is empty', disabled: true }))
            : this.setState({ nameRepeatTest: '', disabled: false }));

    handleChange = (event) => {
        const { allTags } = this.props;
        this.testRepeatName(allTags, event.target.value);
        this.setState({ nameTag: event.target.value });
    };

    addNewTag = () => {
        const { colorTag, nameTag } = this.state;
        const { actions } = this.props;
        actions.addTag({ color: colorTag, tagName: nameTag });
        this.changeVisiblePopap();
    };

    render() {
        const { visible, allTags } = this.props;
        const { colorTag, nameRepeatTest, disabled } = this.state;
        return (
            <styledSettings.Background
                style={{ display: visible ? 'flex' : 'none', height: 'auto' }}
            >
                <styledSettings.Window style={{ width: '315px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <styled.Title>Add new tag</styled.Title>
                        <styledSettings.CloseWindow onClick={this.changeVisiblePopap}>
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
                        <styled.Line>
                            <styled.Label>Name: </styled.Label>
                            <styled.Input
                                style={{ borderBottom: `1px solid ${nameRepeatTest ? 'red' : 'lightgray'}` }}
                                type="text"
                                placeholder="enter something..."
                                onChange={this.handleChange}
                                onFocus={e => this.testRepeatName(allTags, e.target.value)}
                                onBlur={() => this.setState({ nameRepeatTest: '' })}
                            />
                            <styled.Error>{nameRepeatTest}</styled.Error>
                        </styled.Line>
                        <styled.Line>
                            <styled.Label style={{ marginRight: '8px' }}>Color: </styled.Label>
                            <SketchPicker
                                color={colorTag}
                                onChangeComplete={this.handleChangeComplete}
                            />
                        </styled.Line>
                    </styledSettings.Main>
                    <styled.ButtonLine>
                        <styled.ButtonCancel onClick={this.changeVisiblePopap}>
                            Cancel
                        </styled.ButtonCancel>
                        <styled.ButtonSuccess
                            disabled={disabled}
                            onClick={this.addNewTag}
                        >
                            Add new tag
                        </styled.ButtonSuccess>
                    </styled.ButtonLine>
                </styledSettings.Window>
            </styledSettings.Background>
        );
    }
}

PopapAddTag.propTypes = {
    actions: PropTypes.object.isRequired,
    allTags: PropTypes.array,
};
export default PopapAddTag;