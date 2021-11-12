import { forwardRef } from "react"
import { Chip, IconButton } from "@material-ui/core";
import { DeleteForeverOutlined, RemoveCircleOutlineOutlined, RemoveDoneTwoTone } from "@mui/icons-material";
import { Button, Stack, Typography, Card, CardContent, TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCommande, updateQtt } from "src/action/inCard.action";
import { fFcfa } from "src/utils/formatNumber";
import settings from "src/_mocks_/settings";
import { LoadingButton } from "@material-ui/lab";
import { useState } from "react";
import MuiAlert from "@mui/material/Alert"
import { Snackbar } from '@material-ui/core';
import { formatTitle } from "src/utils/formatText";
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const set = new settings()


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Panier({ post }) {

    const [load, setLoad] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [qtt, setQtt] = useState(post.commandeQtt);

    const handleChange = async (event) => {
        setQtt(event.target.value);
        await dispatch(updateQtt(post.id, event.target.value))
    };

    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
    };

    const handlerRemove = () => {

        setLoad(true)
        setOpenSuccess(true)
        if (dispatch(removeCommande(post.id))) {
            setLoad(false)
        }

    }

    let options = []
    for (let qt = 1; qt <= post.qtt; qt++) {
        options.push(<MenuItem value={qt}>{qt}</MenuItem>)
    }
    return <>
        <TableRow>
            <TableCell title={post.title}>
                <img className="imgTable" src={`${set.init().APP_FOLDER}/img/posts/${post.img}`} alt={post.title} />
                {formatTitle(post.title, 15)}
            </TableCell>
            <TableCell>
                {!parseInt(post.isSoftware) ?
                    <Box sx={{ minWidth: 60 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Qtt</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={qtt}
                                label="Qtt"
                                onChange={handleChange}
                                size="small"
                            >
                                {options}
                            </Select>
                        </FormControl>
                    </Box> :
                    <Typography>-</Typography>
                }
            </TableCell>
            <TableCell>{fFcfa(post.price)}</TableCell>
            <TableCell>
                <Chip variant='outlined' label={fFcfa(parseInt(post.commandeQtt) * parseInt(post.price))} />
            </TableCell>
            <TableCell align="right">
                {load ?
                    <LoadingButton loading>Supression</LoadingButton>
                    :
                    <Tooltip title="Retirer de votre panier">
                        <IconButton
                            onClick={handlerRemove}
                            color="error"
                        >
                            <DeleteForeverOutlined />
                        </IconButton>
                    </Tooltip>
                }

                <div>
                    <Snackbar className="" open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            le produit à été retirer de votre panier
                        </Alert>
                    </Snackbar>
                </div>
            </TableCell>
        </TableRow>
    </>
}