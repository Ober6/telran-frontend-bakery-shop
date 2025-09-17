import { Avatar, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "../../redux/hooks.ts";
import type { ProductType } from "../../utils/app-types.ts";

const BreadProductAdmin = () => {
    const { currProds } = useAppSelector(state => state.products);

    const columns: GridColDef<ProductType>[] = [
        { field: 'id', headerName: 'Id', flex: 0.3, width: 90 },
        { field: 'title', headerName: 'Product name', flex: 1, width: 90 },
        { field: 'category', headerName: 'Category', flex: 0.4, width: 90 },
        { field: 'unit', headerName: 'Unit', flex: 0.4, width: 90 },
        { field: 'cost', headerName: 'Price in NIS', flex: 0.4, width: 90 },
        {
            field: 'img',
            headerName: '',
            flex: 0.4,
            renderCell: (params) => <Avatar src={`/images/${params.value}`} />
        },
    ];

    return (
        <Box sx={{ width: "90vw", height: "80vh", margin: "20px auto" }}>
            <DataGrid columns={columns} rows={currProds} />
        </Box>
    );
};

export default BreadProductAdmin;
