import { forwardRef, useState, useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom"

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import settings from 'src/_mocks_/settings';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Typography, Grid, Stack, TextField, Avatar } from '@material-ui/core';
//dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import MuiAlert from "@mui/material/Alert"
import { Snackbar } from '@material-ui/core';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { random, round } from "lodash"
import { fFcfa } from 'src/utils/formatNumber';
import { removePost } from 'src/action/posts.action';
import { removeUser } from 'src/action/user.action';
import DashboardNavbar from 'src/layouts/dashboard/DashboardNavbar';

const set = new settings()

const directions = ["up", "down", "left", "right"]
let directionRand = round(random(0,3),0)

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction={directions[directionRand]} ref={ref} {...props} />;
});

function AlertDialogSlide({ user }) {
    const [open, setOpen] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false)
    const [openLoad, setOpenLoad] = useState(false)

    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    }

    const handleCloseLoad = () => {
        setOpenLoad(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
        setOpenError(false);
    };

    const handleConfirm = () => {
        if(user.role == "admin"){
            setOpenLoad(true)
            setTimeout(() => {
                setOpenError(true)
                setOpenLoad(false)
            }, 1000)
        }else{
            dispatch(removeUser(user.id))
            setTimeout(() => {
                //setOpenLoad(false)
                setOpenSuccess(true)
            }, 200)
        }
        handleCloseModal()

    }

    const handleClick = () => {
        setOpenSuccess(true);
    };

    return (
        <div>
            <IconButton id={user.id} onClick={handleClickOpen} title="supprimer">
                <DeleteForeverOutlinedIcon color="error" />
            </IconButton>
            <Snackbar className="customAlert" open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    l'utilisateur à été suprimer avec success
                </Alert>
            </Snackbar>
            <Snackbar className="customAlert" open={openError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                   Impossible de Suprimer l'administrateur !
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 99999999, marginLeft: "200px" }}
                open={openLoad}
                onClick={handleCloseLoad}
            >
                <CircularProgress color="inherit" />
                <Typography>Supression en cours...</Typography>
            </Backdrop>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Confirmer la supression de l'utilisateur"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} md={4}>
                                <div className="img">
                                    <Avatar>{user.surname[0]}</Avatar>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                <span>Voulez vous vraiment supprimer l'utilisateur {user.surname} ?</span>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="inherit" onClick={handleCloseModal}>Annuler</Button>
                    <Button onClick={handleConfirm} variant="contained" color="error">Suprimer</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function AlertDetails({ post }) {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState(post.title)
    const [desc, setDesc] = useState(post.category_desc)
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleCloseModalS = () => {
        setOpen(false)
        setOpenError(true)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccess(false);
        setOpenError(false);
    };

    const handleSave = () => {

        if (title && desc && title) {
            const fData = new FormData()
            fData.append("title", title)
            fData.append("description", desc)
            fData.append("id", post.id)

            dispatch(updatepost(fData))
            setOpenSuccess(true)
            handleCloseModal()
        }
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen} title="editer">
                <EditIcon color="success" />
            </IconButton>
            <Snackbar className="customAlert" open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {post.title} à été mise à jour avec success
                </Alert>
            </Snackbar>
            <Snackbar className="customAlert" open={openError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    Modification de {post.title} annulée !
                </Alert>
            </Snackbar>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{`Editer ${post.title} `}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4} md={4}>
                            <br /><br /><br />
                            <img src={`${set.init().APP_FOLDER}/img/posts/${post.img}`} alt={post.title} />
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <br />
                            <TextField
                                value={title}
                                fullWidth
                                label="titre de la categorie "
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <br />
                            <br />
                            <TextField
                                label="description de la categorie"
                                onChange={(e) => setDesc(e.target.value)}
                                multiline
                                fullWidth
                                value={desc}
                                rows={5}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={handleCloseModalS}>Annuler l'edition</Button>
                    <Button variant="contained" onClick={handleSave}>Enregistrer les modifications</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function Edit({ post }) {
    return <>
        <IconButton component={RouterLink} to={`/admin/post-list/edit/${post.id}-${post.slug}`} title="editer">
            <EditIcon color="success" />
        </IconButton>
    </>
}

export default function UsersRows({ user }) {

    const [del, setDel] = useState(0)

    const handlerDelet = () => {

        setDel(1)
    }

    return <>
        <TableRow>
            <TableCell component="th" scope="row">
                <Stack direction="row" alignItems="left" justifyContent="space-between">
                    <Avatar variant="error">{user.surname[0]}</Avatar>
                    <Typography style={{textAlign: "left"}}>{`${user.name} ${user.surname}`}</Typography>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row">
                {user.email}
            </TableCell>
            <TableCell component="th" scope="row">
                {user.tel}
            </TableCell>
            <TableCell component="th" scope="row">
                {user.role}
            </TableCell>
            <TableCell component="th" scope="row">
                {user.created_at}
            </TableCell>
            <TableCell align="right">
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    {/*<Edit post={user} />*/}
                    <AlertDialogSlide user={user} />
                </Stack>
            </TableCell>
        </TableRow>
    </>
}