import React, { useState } from "react"
import {Link as RouterLink} from "react-router-dom"
import { Stack, Container, Typography, Button, TextField, Grid} from '@material-ui/core'
import settings from "../../_mocks_/settings"
import Page from "../../components/Page"
import {useDispatch, useSelector} from "react-redux"
import { isEmpty } from "src/utils/isEmpty"
import { addPost, getPosts } from "src/action/posts.action"
import  Upload  from "src/utils/Upload"

const infos = new settings()


function UploadArticle(){

	const categories = useSelector(state => state.ctgReducer)
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [ctg, setCtg] = useState('1')
	const [price, setPrice] = useState('')
	const [qtt, setQtt] = useState('')
	const [desc, setDesc] = useState('')
	const [img, setImg] = useState("default.jpg")

	const handlerSubmit = (event)=>{
		let data = new FormData()
		data.append("title", title)
		data.append("slug", title)
		data.append("img", img)
		data.append("price", price)
		data.append("qtt", qtt)
		data.append("category_id", ctg)
		data.append("description", desc)

		if(title && ctg && price && qtt && desc){

			dispatch(getPosts())
			dispatch(addPost(data))
			dispatch(getPosts())


			setTitle("")
			setCtg("")
			setPrice("")
			setQtt("")
			setDesc("")

			console.log("Sauver avec success...")

		}

		dispatch(getPosts())
		event.preventDefault()
	}

	const getFileName = (file) => {
		setImg(file)
	}

		return<div>
			<Page title="Creer un article">
				<Container maxWidth="lg">
					<br /><br /><br /><br />
					<div className="upload">
						<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
					        <Typography variant="h4" gutterBottom>
					          Uploader un article 
					        </Typography>
					        <Button
					            variant="contained"
					            component={RouterLink}
					            to="/dashboard/create-category"
					          >
					            Ajouter une Categorie
					        </Button>
					    </Stack>
					</div>
					<div>
						<form action="" autocomplete="off"  onSubmit={handlerSubmit} >
						<Grid container spacing={3}>
					        <Grid item xs={12} sm={12} md={12}>
					          <Upload remote={getFileName} />
					        </Grid>
							
					          <Grid item xs={12} sm={12} md={12}>
					            <TextField
					              fullWidth
					              type="text"
					              label="Titre du produit"
								  value={title}
								  onChange={(e)=>setTitle(e.target.value)}
					            />
					          </Grid>
							  <Grid item xs={12} sm={12} md={12}>

							  </Grid>
							  <Grid item xs={12} sm={12} md={12}>
							  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
							 	<Typography>Selectionner une categorie </Typography>
								 <select className="custom-select custom-select-adm" value={ctg} onChange={(e)=>setCtg(e.target.value)}>
									 {!isEmpty(categories) && typeof categories === "object" && categories.map((categorie, index)=>(
										  <option key={index} value={categorie.id} >{categorie.category_name} </option>
									 ))}
								 </select>
							  </Stack>
					          </Grid>
					          <Grid item xs={6} sm={6} md={6}>
					            <TextField
					              fullWidth
					              type="number"
					              label="Prix de l'article"
								  value={price}
								  onChange={(e)=>setPrice(e.target.value)}
					            />
					          </Grid>
					      	  <Grid item xs={6} sm={6} md={6}>
					            <TextField
					              fullWidth
					              type="number"
					              label="Quantitée"
								  value={qtt}
								  onChange={(e)=>setQtt(e.target.value)}
					            />
					          </Grid>
					          <Grid item xs={12} sm={12} md={12}>
					            <TextField
					              multiline
					              rows = {6}
					              fullWidth
					              type="text"
					              label="Description"
								  value={desc}
								  onChange={(e)=>setDesc(e.target.value)}
					            />
					          </Grid>
						      <Grid item xs={12} sm={12} md={12}>
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
					</div>
				</Container>
			</Page>
		</div>
	}


export default UploadArticle