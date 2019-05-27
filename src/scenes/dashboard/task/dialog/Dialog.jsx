import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

export default class FormDialog extends React.Component {
    constructor(props) {
        super(props);
        const duration = moment.duration(moment().diff(moment(props.createdDate)));
        this.state = {
            days: duration.days(),
            hours: duration.hours(),
            minutes: duration.minutes(),
        };
    }

    changeDurationDays = (days) => {
        this.setState({ days: Number(days) });
    };

    changeDurationHours = (hours) => {
        this.setState({ hours: Number(hours) });
    };

    changeDurationMinutes = (minutes) => {
        this.setState({ minutes: Number(minutes) });
    };

    render() {
        const {
            days, hours, minutes,
        } = this.state;
        const {
            show, onClose, onConfirm, createdDate,
        } = this.props;
        return (
            <div key="dialogForTasksRoot">
                <Dialog
                    open={show}
                    onClose={onClose}
                    aria-labelledby="form-dialog-title"
                    key="form-dialog-title"
                >
                    <DialogTitle
                        id="form-dialog-title"
                    >
                        Task duration time
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You can change time, which you spent for complete task
                        </DialogContentText>
                        <TextField
                            onChange={e => this.changeDurationDays(e.target.value)}
                            id="name"
                            label="Days spent"
                            style={{ width: '30%' }}
                            type="number"
                            value={days}
                            inputProps={{ min: '0', max: '30', step: '1' }}
                        />
                        <TextField
                            onChange={e => this.changeDurationHours(e.target.value)}
                            id="name"
                            label="Hours spent"
                            style={{ width: '30%', marginLeft: '10px' }}
                            type="number"
                            value={hours}
                            inputProps={{
                                min: '0', max: '24', step: '1', pattern: /^([01]?\d|2[0-3])$/,
                            }}
                        />
                        <TextField
                            onChange={e => this.changeDurationMinutes(e.target.value)}
                            id="name"
                            label="Minutes spent"
                            style={{ width: '30%', marginLeft: '10px' }}
                            type="number"
                            value={minutes}
                            inputProps={{ min: '0', max: '60', step: '1' }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            key="1"
                            onClick={onClose}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            key="2"
                            onClick={() => onConfirm({
                                completedDate: moment(createdDate).add({ days, hours, minutes }),
                                duration: moment.duration(moment(moment(createdDate).add(
                                    { days, hours, minutes },
                                )).diff(moment(createdDate))),
                            })}
                            color="primary"
                        >
                            Enter
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
