import React, { useState } from "react"
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
import { addPost, getPosts } from "src/action/posts.action"
import Upload from "src/utils/Upload"
import CategoryList from "src/components/admin/categoryList"
import { getCtg, setCtg } from "src/action/category.action"
import MuiAlert from "@mui/material/Alert"
import AddIcon from '@mui/icons-material/Add';
import Details from "src/components/admin/Details";
import { sizeDatas } from "src/utils/formatNumber";

const infos = new settings()
const timing = 6000

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CreateCategory() {

	let categories = useSelector(state => state.ctgReducer)
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [img, setImg] = useState("default.jpg")
	const [openSuccess, setOpenSuccess] = React.useState(false);
	const [openError, setOpenError] = useState(false)
	const [showForm, setShowForm] = useState(false)


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

	const handlerSubmit = (event) => {
		event.preventDefault()

		let data = new FormData()
		data.append("title", title)
		data.append("slug", title)
		data.append("img", img)
		data.append("description", desc)

		if (title && desc && title.length > 2 && desc.length > 2) {



			setTitle("")
			setDesc("")
			console.log("Sauver avec success...")

			dispatch(setCtg(data))

			setOpenSuccess(true)
			setTimeout(() => setShowForm(false), timing + 1000)


		} else {

			setOpenError(true)
		}


	}

	const getFileName = (file) => {
		setImg(file)
	}

	return <div>
		<Page title="Creer une categorie">
			<Container maxWidth="lg">
				<div className="upload">
					<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
						<Typography variant="h4" gutterBottom>
							Categories
						</Typography>
						<Button
							startIcon={
								<AddIcon />
							}
							variant="contained"
							onClick={(e) => showForm ? setShowForm(false) : setShowForm(true)}
						>
							Ajouter une Categorie
						</Button>
					</Stack>
				</div>
				<div>
					{/*<Details title="Categories Disponibles" value={!isEmpty(categories) && sizeDatas(categories)} />*/}
				</div>
				<div>
					{showForm ?
						<form onSubmit={handlerSubmit} >
							<Grid container spacing={3}>
								<Grid item xs={12} sm={8} md={8}>

									<Grid item xs={12} sm={12} md={12}>
										<TextField
											autoFocus
											fullWidth
											type="text"
											label="Titre de la categorie"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
										/>
									</Grid>
									<br />
									<Grid item xs={12} sm={12} md={12}>
										<TextField
											multiline
											rows={8}
											fullWidth
											type="text"
											label="Description"
											value={desc}
											onChange={(e) => setDesc(e.target.value)}
										/>
									</Grid>
								</Grid>
								<Grid item xs={12} sm={4} md={4}>
									<Upload remote={getFileName} />
								</Grid>
								<Grid item xs={12} sm={12} md={12}>
									<Snackbar open={openSuccess} autoHideDuration={timing} onClose={handleClose}>
										<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
											La categorie à été créer avec success
										</Alert>
									</Snackbar>
									<Snackbar open={openError} autoHideDuration={timing} onClose={handleClose}>
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
						: <span></span>}
				</div>
				<div>
					<br />
					<Card>
						<CardContent>
							<TableContainer component={Paper}>
								<Table aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Nom de la categorie</TableCell>
											<TableCell>Description</TableCell>
											<TableCell align="right">Action</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{!isEmpty(categories) && typeof categories === "object" && categories.map((category, index) => (
											<CategoryList ctg={category} key={index} />
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</CardContent>
					</Card>
				</div>
			</Container>
		</Page>
	</div>
}


export default CreateCategory