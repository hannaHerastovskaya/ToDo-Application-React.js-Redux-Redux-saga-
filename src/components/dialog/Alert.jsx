import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import * as styled from './AlertDialog.styles';

export class Alert extends Component {
    render() {
        const {
            visible, value, onClose, onConfirm, button,
        } = this.props;
        return (
            <Dialog
                open={visible}
                onClose={onClose}
            >
                <styled.Content>
                    <DialogTitle
                        id="form-dialog-title"
                        style={{display: 'flex', flex: 'auto', padding: '8px 0px 8px 24px',}}
                    >
                        Dialog
                    </DialogTitle>
                </styled.Content>
                <styled.DialogContentText style={ { margin: '8px 24px 16px 24px' } }>
                    { value }
                </styled.DialogContentText>
                <DialogActions>
                    {
                        !button ? (
                            <Button
                                onClick={() => {
                                    onClose();
                                    onConfirm();
                                }}
                                color="primary"
                            >
                                Ok
                            </Button>
                        ) : (
                            <Link to={`/auth`} >
                                <Button
                                    onClick={() => {
                                        onClose();
                                        onConfirm();
                                    }}
                                    color="primary"
                                >
                                    Back
                                </Button>
                            </Link>
                        )
                    }
                </DialogActions>
            </Dialog>
        );
    }
}
