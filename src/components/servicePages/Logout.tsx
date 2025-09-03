import { useDispatch } from "react-redux";
import { resetAuthUser } from "../../redux/slices/AuthSlice.ts";
import { Button, Box } from "@mui/material";

const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(resetAuthUser());
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{
                    px: 4,
                    py: 1.5,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 2,
                    boxShadow: 3,
                    '&:hover': {
                        backgroundColor: '#d32f2f'
                    }
                }}
            >
                Logout
            </Button>
        </Box>
    );
};

export default Logout;
