import React, { useState, forwardRef } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Stack, Container, Typography, Button, TextField, Grid, Snackbar, Card, CardContent, Paper } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import settings from "../../_mocks_/settings"
import Page from "../../components/Page"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "src/utils/isEmpty"
import Upload from "src/utils/Upload"
import MuiAlert from "@mui/material/Alert"
import AddIcon from '@mui/icons-material/Add';
import Details from "src/components/admin/Details";
import { sizeDatas } from "src/utils/formatNumber";
import RowSlide from "src/components/admin/RowSlide";
import { addSlide } from "src/action/slider.action";

const infos = new settings()
const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function SlideList() {

	const posts = useSelector(state => state.slideReducer)

	return <>
		<br />
		<Card>
			<CardContent>
				<TableContainer component={Paper}>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Nom du Slide</TableCell>
								<TableCell>Description</TableCell>
								<TableCell align="right">Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{!isEmpty(posts) && typeof posts === "object" && posts.map((post, index) => (
								<RowSlide post={post} key={index} />
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</CardContent>
		</Card>
	</>
}

function createSlide() {

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [img, setImg] = useState("")
	const [post_id, setPostId] = useState("1")
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false)
	const [showForm, setShowForm] = useState(false)

	const dispatch = useDispatch()

	const posts = useSelector(state => state.postsReducer)

	const getFileName = (file) => {

		setImg(file)
	}

	const handleClick = () => {
		setOpenSuccess(true);
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSuccess(false);
		setOpenError(false);
	};

	const handlerSubmit = (e) => {
		e.preventDefault()
		if (title && description && img) {

			const datas = new FormData()

			datas.append("title", title)
			datas.append("description", description)
			datas.append("image", img)
			datas.append("post_id", post_id)

			dispatch(addSlide(datas))

			console.log("Slide creer")

			setTitle("")
			setDescription("")
			setImg("")
			setPostId("")

			setOpenSuccess(true)
		} else {

			setOpenError(true)
		}

	}

	const handlerSelect = (e) => {
		setPostId(e.target.value)
		setPostId(e.target.value)
		setPostId(e.target.value)
	}

	return <div>
		<Page title="Creer un Caroussel">
			<Container maxWidth="lg">
				<div className="upload">
					<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
						<Typography variant="h4" gutterBottom>
							Caroussel
						</Typography>
						<Button
							startIcon={
								<AddIcon />
							}
							variant="contained"
							onClick={(e) => showForm ? setShowForm(false) : setShowForm(true)}
						>
							Ajouter un Caroussel
						</Button>
					</Stack>
				</div>
				<div>
					{showForm &&
						<form onSubmit={handlerSubmit} >
							<Grid container spacing={3}>
								<Grid item xs={12} sm={12} md={12}>
									<Upload remote={getFileName} />
								</Grid>
								<Grid item xs={12} sm={12} md={12}>
									<TextField
										autoFocus
										autoCorrect
										fullWidth
										type="text"
										label="Titre du slide"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={12}>
									<Stack alignItems="center" justifyContent="space-between" mb={1}>
										<Typography>Associer à un article</Typography>
										<select
											className="custom-select custom-select-adm"
											value={post_id}
											id="ctg_select"
											onChange={e=>setPostId(e.target.value)}
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
								<Grid item xs={12} sm={12} md={12}>
									<TextField
										multiline
										rows={6}
										fullWidth
										type="text"
										label="Description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={12}>
									<Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
										<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
											Le slide à été crer, il est maintenant disponible sur l'App <a href="/">store</a>
										</Alert>
									</Snackbar>
									<Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
										<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
											Sauvegarde Impossible !
										</Alert>
									</Snackbar>
									<Button
										variant="contained"
										type="submit"
										color="error"
									>
										Sauvegarder
									</Button>
								</Grid>
							</Grid>
						</form>
					}
				</div>
				<div>
					<SlideList />
				</div>
			</Container>
		</Page>
	</div>
}


export default createSlide