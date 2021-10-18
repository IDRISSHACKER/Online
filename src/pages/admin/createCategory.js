import React, { useState } from "react"
import {Link as RouterLink} from "react-router-dom"
import { Stack, Container, Typography, Button, TextField, Grid} from '@material-ui/core'
import settings from "../../_mocks_/settings"
import Page from "../../components/Page"
import {useDispatch, useSelector} from "react-redux"
import { isEmpty } from "src/utils/isEmpty"
import { addPost, getPosts } from "src/action/posts.action"
import  Upload  from "src/utils/Upload"
import CategoryList from "src/components/admin/categoryList"
import { getCtg, setCtg } from "src/action/category.action"

const infos = new settings()


function CreateCategory(){

	let categories = useSelector(state => state.ctgReducer)
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [img, setImg] = useState("default.jpg")

	const handlerSubmit = (event)=>{
        event.preventDefault()

		let data = new FormData()
		data.append("title", title)
		data.append("slug", title)
		data.append("img", img)
		data.append("description", desc)

		if(title && desc && title.length > 3 && desc.length > 10 ){



			setTitle("")
			setDesc("")
            dispatch(getCtg())
			console.log("Sauver avec success...")

            dispatch(setCtg(data))
            dispatch(getCtg())

		}

        dispatch(getCtg())
        dispatch(getCtg())

	}

	const getFileName = (file) => {
		setImg(file)
	}

		return<div>
			<Page title="Creer une categorie">
				<Container maxWidth="lg">
					<br /><br /><br /><br />
					<div className="upload">
						<Stack alignItems="center" justifyContent="space-between" mb={5}>
					        <Typography variant="h4" gutterBottom>
					          Creer une categorie 
					        </Typography>
					    </Stack>
					</div>
					<div>
						<form  onSubmit={handlerSubmit} >
						<Grid container spacing={3}>
					        <Grid item xs={12} sm={12} md={12}>
					          <Upload remote={getFileName} />
					        </Grid>
					          <Grid item xs={12} sm={12} md={12}>
					            <TextField
					              fullWidth
					              type="text"
					              label="Titre de la categorie"
								  value={title}
								  onChange={(e)=>setTitle(e.target.value)}
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
                    <div>
                        <br />
                        <Typography variant={"h4"}>Liste des Categories</Typography>
                        {!isEmpty(categories)  && typeof categories === "object" && categories.map((category, index)=>(
                            <CategoryList ctg={category} key={index} />
                        ))}
                    </div>
				</Container>
			</Page>
		</div>
	}


export default CreateCategory