import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import * as styled from './Theme.styles';
import dayImage from '../../../../image/day.png';
import nightImage from '../../../../image/night.png';
import theme from '../../../../config/theme';
import Input from '../../../../components/input/Input';

class Theme extends Component {
    constructor(props) {
        super(props);
        const { type, data } = props;
        this.state = { type, data };
    }


    handleDefaultSelect = (type) => {
        this.setState({ type, data: theme[type] });
    };

    handleDataChange = (key, newValue) => {
        const { data } = this.state;
        this.setState({
            type: 'custom',
            data: {
                ...data,
                [key]: newValue,
            },
        });
    };

    handleApply = () => {
        const { actions } = this.props;
        actions.changeTheme(this.state);
    };

    render() {
        const { type, data } = this.state;
        return (
            <styled.Theme>
                <styled.ColumnContainer>
                    <styled.ColumnTitle>Default</styled.ColumnTitle>
                    <styled.BlockTheme>
                        <styled.ImageTheme
                            selected={type === 'day'}
                            src={dayImage}
                            onClick={() => this.handleDefaultSelect('day')}
                        />
                        <styled.NameTheme>Day theme</styled.NameTheme>
                    </styled.BlockTheme>
                    <styled.BlockTheme>
                        <styled.ImageTheme
                            selected={type === 'night'}
                            src={nightImage}
                            onClick={() => this.handleDefaultSelect('night')}
                        />
                        <styled.NameTheme>Night theme</styled.NameTheme>
                    </styled.BlockTheme>
                </styled.ColumnContainer>
                <styled.ColumnContainer>
                    <styled.ColumnTitle>Properties</styled.ColumnTitle>
                    <styled.Row>
                        <styled.Text>Background:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('background', value)}
                            value={data.background}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <styled.Row>
                        <styled.Text>Main Text:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('mainText', value)}
                            value={data.mainText}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <styled.Row>
                        <styled.Text>Background List:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('backgroundList', value)}
                            value={data.backgroundList}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <styled.Row>
                        <styled.Text>Background Header:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('backgroundHeader', value)}
                            value={data.backgroundHeader}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <styled.Row>
                        <styled.Text>Text Header:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('textHeader', value)}
                            value={data.textHeader}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <styled.Row>
                        <styled.Text>Background Button:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('backgroundButton', value)}
                            value={data.backgroundButton}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <styled.Row>
                        <styled.Text>Hover Button:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('hoverButton', value)}
                            value={data.hoverButton}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <styled.Row>
                        <styled.Text>Active Button:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('activeButton', value)}
                            value={data.activeButton}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <styled.Row>
                        <styled.Text>Button Text:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('buttonText', value)}
                            value={data.buttonText}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <styled.Row>
                        <styled.Text>Active Button Text:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('activeButtonText', value)}
                            value={data.activeButtonText}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <styled.Row>
                        <styled.Text>Checkbox Background:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('checkboxBackground', value)}
                            value={data.checkboxBackground}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <styled.Row>
                        <styled.Text>Active Checkbox:</styled.Text>
                        <Input
                            onChange={value => this.handleDataChange('activeCheckbox', value)}
                            value={data.activeCheckbox}
                            border
                            style={{ width: '120px', height: '16px', fontSize: '14px' }}
                        />
                    </styled.Row>
                    <Button
                        variant="contained"
                        color="default"
                        style={{
                            marginTop: '16px', width: '40%', height: '8%', alignSelf: 'center', borderRadius: '8px'
                        }}
                        onClick={this.handleApply}
                    >
                        Apply
                    </Button>
                    {/* <Button variant="contained" color="default"> */}
                    {/*    Upload */}
                    {/* </Button> */}

                </styled.ColumnContainer>
            </styled.Theme>
        );
    }
}

export default Theme;

Theme.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    type: PropTypes.string,
    data: PropTypes.objectOf(PropTypes.string),
};

Theme.defaultProps = {
    actions: {},
    type: '',
    data: {},
};
