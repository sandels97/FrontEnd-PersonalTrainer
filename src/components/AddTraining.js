import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import moment from 'moment';

export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');

    const [training, setTraining] = useState({
        date : '', duration : 0, activity : '', customer : ''
    })
    const handleClickOpen = () => {
        setTime(moment().format("HH:mm"))
        setDate(moment().format("YYYY-MM-DD"))
        setTraining({...training, customer : props.customer_link})
        setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name] : event.target.value})
    }

    const handleInputChangeDate = (event) => {
        setDate(event.target.value);
    }

    const handleInputChangeTime = (event) => {
        setTime(event.target.value);
    }

    const addTraining = () => {
        let obj = training;

        obj.date = date + "T" + time;
        props.saveTraining(obj);
        handleClose();
    }

    return (
        <div>
            <Button style={{margin : 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Training session</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        value={date}
                        type="date"
                        onChange={e => handleInputChangeDate(e)}
                        fullWidth
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        value={time}
                        type="time"
                        onChange={e => handleInputChangeTime(e)}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        label="Duration (in minutes)"
                        type="number"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.streetaddress}
                        label="Activity"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addTraining} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}