import React, { useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { Stack, Container, Typography, Button, TextField, Grid, Switch, Card, CardContent, Snackbar } from '@material-ui/core'
import MuiAlert from "@mui/material/Alert"
import settings from "../../_mocks_/settings"
import Page from "../../components/Page"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "src/utils/isEmpty"
import { addPost, getPosts } from "src/action/posts.action"
import Upload from "src/utils/Upload"
import { replaceSpace } from "src/utils/formatText"

const infos = new settings()

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function UploadArticle() {

	const categories = useSelector(state => state.ctgReducer)
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [ctg, setCtg] = useState('1')
	const [price, setPrice] = useState('')
	const [qtt, setQtt] = useState('')
	const [desc, setDesc] = useState('')
	const [img, setImg] = useState("default.jpg")
	const [slug, setSlug] = useState('')
	const [showPrice, setShowPrice] = useState(true)
	const [isSoftware, setIsSoftware] = useState(false)
	const [openSuccess, setOpenSuccess] = React.useState(false);
	const [openError, setOpenError] = useState(false)
	const navigate = useNavigate()

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
		let data = new FormData()
		data.append("title", title)
		data.append("slug", slug)
		data.append("img", img)
		data.append("price", price)
		data.append("qtt", isSoftware ? 1 : qtt)
		data.append("category_id", ctg)
		data.append("description", desc)
		data.append("showPrice", showPrice ? 1 : 0)
		data.append("isSoftware", isSoftware ? 1 : 0)

		if (title && ctg && price && desc) {

			dispatch(getPosts())
			dispatch(addPost(data))
			dispatch(getPosts())


			setTitle("")
			setCtg("")
			setPrice("")
			setQtt("")
			setDesc("")
			setSlug("")

			console.log("Sauver avec success...")
			setOpenSuccess(true)
			setTimeout(()=>{
				navigate("/admin/post-list")
			},500)

		}else{

			setOpenError(true)
		}

		dispatch(getPosts())
		event.preventDefault()
	}

	const getFileName = (file) => {
		setImg(file)
	}

	return <div>
		<Page title="Creer un article">
			<Container maxWidth="lg">
				<div className="upload">
					<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
						<Typography variant="h4" gutterBottom>
							Uploader un article
						</Typography>
						<Button
							variant="contained"
							component={RouterLink}
							to="/admin/create-category"
						>
							Ajouter une Categorie
						</Button>
					</Stack>
				</div>
				<div>
					<form action="" autocomplete="off" onSubmit={handlerSubmit} >
						<Grid container spacing={5}>

							<Grid item xs={12} sm={12} md={12}>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={12} md={12}>
										<TextField
											autoFocus
											autoCapitalize
											autoCorrect
											autoSave
											autoComplete
											aria
											fullWidth
											type="text"
											label="Titre du produit"
											value={title}
											onChange={(e) => {
												setTitle(e.target.value)
												setSlug(replaceSpace(e.target.value))
											}}
										/>
									</Grid>
									<Grid item xs={6} sm={6} md={6}>
										<label htmlFor="isSoftware">Activer s'il sagit d'un produit numerique</label>
										<Switch id="isSoftware" title="Toglle" checked={isSoftware} onChange={(e) => setIsSoftware(e.target.checked)} />
									</Grid>
									<Grid item xs={6} sm={6} md={6}>
										<label htmlFor="showPrice">Rendre le prix du produit visible</label>
										<Switch id="showPrice" title="Toglle" checked={showPrice} onChange={(e) => setShowPrice(e.target.checked)} />
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12} sm={8} md={8}>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={12} md={12}>
										<Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
											<label htmlFor="selectCtg">Selectionner une categorie </label>
											<select id="selectCtg" className="custom-select custom-select-adm" value={ctg} onChange={(e) => setCtg(e.target.value)}>
												{!isEmpty(categories) && typeof categories === "object" && categories.map((categorie, index) => (
													<option key={index} value={categorie.id} >{categorie.category_name} </option>
												))}
											</select>
										</Stack>
									</Grid>
									<Grid item xs={isSoftware ? 12 : 6} sm={isSoftware ? 12 : 6} md={isSoftware ? 12 : 6}>
										<TextField
											fullWidth
											type="number"
											label="Prix de l'article"
											value={price}
											onChange={(e) => setPrice(e.target.value)}
										/>
									</Grid>
									{!isSoftware ?
										<Grid item xs={6} sm={6} md={6}>
											<TextField
												fullWidth
												type="number"
												label="Quantitée"
												value={qtt}
												onChange={(e) => setQtt(e.target.value)}
											/>
										</Grid>
										: <span></span>}
									<Grid item xs={12} sm={12} md={12}>
										<TextField
											multiline
											rows={10}
											fullWidth
											type="text"
											label="Description"
											value={desc}
											onChange={(e) => setDesc(e.target.value)}
										/>
									</Grid>
								</Grid>
							</Grid>

							<Grid item xs={12} sm={4} md={4}>
								<Card>
									<CardContent>
										<Grid container>
											<Grid item xs={12} sm={12} md={12}>
												<TextField
													readOnly
													fullWidth
													type="text"
													label="slug"
													value={slug}
												/>
											</Grid>
											<Grid item xs={12} sm={12} md={12}>
												<br />
												<Upload remote={getFileName} />
											</Grid>
										</Grid>
									</CardContent>
								</Card>
							</Grid>

							<Grid item xs={12} sm={12} md={12}>
								<Grid item xs={12} sm={12} md={12}>
									<Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
										<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
											Le produit a ete crer, il est maintenant disponible sur l'App <a href="/">store</a>
										</Alert>
									</Snackbar>
									<Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
										<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
											Impossible de creer l'article
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

						</Grid>
					</form>
				</div>
			</Container>
		</Page>
	</div>
}


export default UploadArticle