import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import PopapAddTag from './popapAddTag/PopapAddTag';
import {
    styles, MenuProps, Select, Button, MenuItem, DeleteTag, NameTag, Tag,
} from './MultiSelect.styled';
import { InputLabel } from '../../../components/dropDown/DropDown.styled';
import {initialize} from "../duck";

class MultiSelect extends Component {
    state = { selectTags: [] };

    handleChange = (event) => {
        const { actions: { getSelectedTags } } = this.props;
        this.setState(
            { selectTags: event.target.value },
            () => getSelectedTags(event.target.value),
        );
    };

    render() {
        const {
            classes, tags, actions, visible,
        } = this.props;
        const { selectTags } = this.state;
        return ([
            <div className={classes.root} key="multiSelect">
                <InputLabel
                    style={{ width: '20.1%', marginLeft: '12px' }}
                    htmlFor="select-multiple-chip"
                >
                    Tags:
                </InputLabel>
                <div style={{
                    display: 'flex', flexDirection: 'column', flex: 'auto', margin: '8px 12px 4px 0',
                }}
                >
                    <Select
                        multiple
                        placeholder="input"
                        value={selectTags}
                        onChange={this.handleChange}
                        input={<Input id="select-multiple-chip" placeholder="choose" />}
                        renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                    <Chip
                                        key={value.tagName}
                                        label={value.tagName}
                                        className={classes.chip}
                                        style={{ backgroundColor: value.color }}
                                    />
                                ))}
                            </div>

                        )}
                        MenuProps={MenuProps}
                    >
                        {
                            tags.length
                                ? tags.map(tag => (
                                    <MenuItem key={tag.id} value={tag} style={{}}>
                                        <Tag
                                            onMouseOver={this.changeVisible}
                                            onMouseOut={this.changeVisible}
                                        >
                                            <NameTag style={{ backgroundColor: tag.color }}>
                                                {tag.tagName}
                                                <DeleteTag key={tag.id} onClick={() => actions.deleteTag({ id: tag.id })}>
                                                    x
                                                </DeleteTag>
                                            </NameTag>
                                        </Tag>
                                    </MenuItem>
                                ))
                                : (
                                    <MenuItem style={{ pointerEvents: 'none', color: 'grey' }}>
                                        <div>No tags yet</div>
                                    </MenuItem>
                                )
                        }

                    </Select>
                    <Button
                        style={{ height: '30px', background: 'rgba(0, 0, 0, 0.2)', color: 'black' }}
                        key="+ tag"
                        className={classes.addButton}
                        onClick={() => {actions.visiblePopap()}}
                    >
                        add tag
                    </Button>
                </div>
            </div>,
            <PopapAddTag actions={actions} visible={visible} allTags={tags} key="PopapAddTag" />,
        ]
        );
    }
}

MultiSelect.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.objectOf(PropTypes.func),
    visible: PropTypes.bool,
};

MultiSelect.defaultProps = {
    classes: {},
    tags: [],
    actions: {},
    visible: false,
};

export default withStyles(styles, { withTheme: true })(MultiSelect);
