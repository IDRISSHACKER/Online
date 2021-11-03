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
import { addSlide, getSlide } from "src/action/slider.action"

const infos = new settings()


function createSlide(){

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [img, setImg] = useState("")
	const [post_id, setPostId] = useState("1")

	const dispatch = useDispatch()

	const posts = useSelector(state => state.postsReducer)

	const getFileName = (file) => {

		setImg(file)
    }

    const handlerSubmit = (e)=>{
        e.preventDefault()
        if(title && description && img){

			const datas = new FormData()
            
			datas.append("title", title)
			datas.append("description", description)
			datas.append("image", img)
			datas.append("post_id", post_id)

			dispatch(addSlide(datas))
			dispatch(getSlide())

			console.log("Slide creer")

			setTitle("")
			setDescription("")
			setImg("")
			setPostId("")
        }
    }

	return<div>
		<Page title="Creer une categorie">
			<Container maxWidth="lg">
				<br /><br /><br /><br />
				<div className="upload">
					<Stack alignItems="center" justifyContent="space-between" mb={5}>
						<Typography variant="h4" gutterBottom>
							Build a custom slider
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
								label="Titre du slide"
								value={title}
								onChange={(e)=>setTitle(e.target.value)}
							/>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
								<Typography>Associer à un article</Typography>
								<select className="custom-select custom-select-adm" onChange={e=>setPostId(e.target.value)} >
									{!isEmpty(posts) && posts.map((post, index)=>(									<option key={index} name={post.id} value={post.id}>{post.title}</option>
									))}
								</select>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
							<TextField
								multiline
								rows = {6}
								fullWidth
								type="text"
								label="Description"
								value={description}
								onChange={(e)=>setDescription(e.target.value)}
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
				</div>
			</Container>
		</Page>
	</div>
}


export default createSlide