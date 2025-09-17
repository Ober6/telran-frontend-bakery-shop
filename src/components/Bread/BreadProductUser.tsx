import { useAppSelector } from "../../redux/hooks.ts";
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Box, Dialog, DialogTitle, DialogActions } from "@mui/material";
import type { ProductType } from "../../utils/app-types.ts";
import { addProductUnitToCart, removeProductUnitFromCart } from "../../firebase/fireCartService.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BreadProductUser = () => {
    const { currProds } = useAppSelector(state => state.products);
    const cartProducts = useAppSelector(state => state.cart.cartProducts);
    const uid = useAppSelector(state => state.auth.authUser?.email);
    const navigate = useNavigate();

    const [openLoginPrompt, setOpenLoginPrompt] = useState(false);

    const getCount = (prodId: string) => {
        const cartItem = cartProducts.find(item => item.prodId === prodId);
        return cartItem?.count ?? 0;
    };

    const handleAdd = (prodId: string) => {
        if (!uid) {
            setOpenLoginPrompt(true);
            return;
        }
        addProductUnitToCart(uid, prodId);
    };

    const handleRemove = (prodId: string) => {
        if (!uid) {
            setOpenLoginPrompt(true);
            return;
        }
        removeProductUnitFromCart(uid, prodId);
    };

    const handleLoginRedirect = () => {
        setOpenLoginPrompt(false);
        navigate("/login");
    };

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)'
                    },
                    gap: 2
                }}
            >
                {currProds.map((item: ProductType) => (
                    <Card key={item.id} sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={"/images/" + item.img}
                            title={item.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5">{item.title}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant="outlined" onClick={() => handleAdd(item.id)}>+</Button>
                            <Typography>{getCount(item.id)}</Typography>
                            <Button size="small" variant="outlined" onClick={() => handleRemove(item.id)}>-</Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>

            {/* Login prompt dialog */}
            <Dialog open={openLoginPrompt} onClose={() => setOpenLoginPrompt(false)}>
                <DialogTitle>You must log in to modify the cart.</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setOpenLoginPrompt(false)}>Cancel</Button>
                    <Button onClick={handleLoginRedirect} autoFocus>Go to Login</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BreadProductUser;
