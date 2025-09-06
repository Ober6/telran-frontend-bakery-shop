import {Box, Dialog, DialogActions, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../redux/hooks.ts";
import {resetAuthUser} from "../../redux/slices/AuthSlice.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const Logout = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleClose = () => {setOpen(false)};
    return (
        <Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you really sure?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Return</Button>
                    <Button onClick={() => {
                        setOpen(false);
                        dispatch(resetAuthUser());
                        navigate('/');
                    }} autoFocus>
                        Logout anyway
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant={"outlined"}
                    onClick={ () => {
                        setOpen(true);
                    }}
            >Logout</Button>
        </Box>
    );
};

export default Logout;