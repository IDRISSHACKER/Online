import { forwardRef, useState } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import settings from 'src/_mocks_/settings';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Typography, Grid, Stack, TextField } from '@material-ui/core';
//dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { removeCtg, updateCtg } from 'src/action/category.action';
import MuiAlert from "@mui/material/Alert"
import { Snackbar } from '@material-ui/core';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { round, random } from "lodash"
import { removeSlide, updateSlide } from 'src/action/slider.action';
import {isEmpty} from "src/utils/isEmpty"

const set = new settings()

const directions = ["up", "down", "left", "right"]
let directionRand = round(random(0, 3), 0)

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction={directions[directionRand]} ref={ref} {...props} />;
});

function AlertDialogSlide({ post }) {
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
        dispatch(removeSlide(post.id))
        handleCloseModal()

        //setOpenLoad(true)

        setTimeout(() => {
            //setOpenLoad(false)
            setOpenSuccess(true)
        }, 200)
    }

    const handleClick = () => {
        setOpenSuccess(true);
    };

    return (
        <div>
            <IconButton id={post.id} onClick={handleClickOpen} title="supprimer">
                <DeleteForeverOutlinedIcon color="error" />
            </IconButton>
            <Snackbar className="customAlert" open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Le caroussel à été suprimer avec success
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Supression Impossible !
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
                <DialogTitle>{"Confirmer la supression du caroussel"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} md={4}>
                                <img className="imgTable" src={`${set.init().APP_FOLDER}/img/posts/${post.img}`} alt={post.stitle} />
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                <span>Voulez vous vraiment supprimer {post.stitle} ?</span>
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

function AlertEdit({ post }) {
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openError, setOpenError] = useState(false)
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState(post.stitle)
    const [desc, setDesc] = useState(post.description)
    const [postId, setPostId] = useState(post.pId)
    const dispatch = useDispatch()
    const posts = useSelector(state => state.postsReducer)

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
            fData.append("pId", postId)

            dispatch(updateSlide(fData))
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
                    {post.stitle} à été mise à jour avec success
                </Alert>
            </Snackbar>
            <Snackbar className="customAlert" open={openError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    Modification de {post.stitle} annulée !
                </Alert>
            </Snackbar>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseModal}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{`Editer ${post.stitle} `}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4} md={4}>
                            <br /><br /><br />
                            <img src={`${set.init().APP_FOLDER}/img/posts/${post.img}`} alt={post.stitle} />
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <br />
                            <TextField
                                value={title}
                                fullWidth
                                label="titre de la categorie "
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <br /><br />
                            <TextField
                                label="description de la categorie"
                                onChange={(e) => setDesc(e.target.value)}
                                multiline
                                fullWidth
                                value={desc}
                                rows={5}
                            /><br /><br />
                            <Stack alignItems="center" justifyContent="space-between" mb={1}>
                                <Typography>Associer à un article</Typography>
                                <select
                                    className="custom-select custom-select-adm"
                                    value={postId}
                                    id="ctg_select"
                                    onChange={e => setPostId(e.target.value)}
                                >
                                    {!isEmpty(posts) && posts.map((post, index) => (
                                        <option
                                            key={index}
                                            name={post.id}
                                            value={post.id}
                                        >
                                            {post.title}
                                        </option>
                                    ))}
                                </select>
                            </Stack>
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

export default function RowSlide({ post }) {

    return <>
        <TableRow>
            <TableCell component="th" scope="row">
                <img className="imgTable" src={`${set.init().APP_FOLDER}/img/posts/${post.img}`} alt={post.stitle} />
                {post.stitle}
            </TableCell>
            <TableCell component="th" scope="row">
                {post.description}
            </TableCell>
            <TableCell align="right">
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <AlertEdit post={post} />
                    <AlertDialogSlide post={post} />
                </Stack>
            </TableCell>
        </TableRow>
    </>
}