import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddCustomer(props) {
    const [open, setOpen] = React.useState(false);

    const [customer, setCustomer] = useState({
        firstname : '', lastname : '', city : '', postcode : '', streetaddress : '', email : '', phone : ''
    })
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name] : event.target.value})
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }

    return (
        <div>
            <Button style={{margin : 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        label="First name"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        label="Last name"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        label="Street address"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        label="Postcode"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                        type="number"
                    />

                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        label="City"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        label="Email address"
                        type="email"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />

                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
                        label="Phone number"
                        onChange={e => handleInputChange(e)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addCustomer} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}