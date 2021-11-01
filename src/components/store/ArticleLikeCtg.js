import {useState} from "react"
import { Card, Stack, Link, Container, Typography, TextFiel, Button, TextField, CardHeader} from '@material-ui/core'
import settings from "../../_mocks_/settings"
import axios from "axios"
import Articles from "./Articles"
import {Link as Routerlink} from "react-router-dom"
import { isEmpty } from "src/utils/isEmpty"
import { useDispatch, useSelector } from "react-redux"
import { getPostsByCtg } from "src/action/likeCtg.action"

const infos = new settings()

const api = axios.create({
  baseURL: `${infos.init().APP_URL}?page=articleLikeCtg/`
});

const ArticleLikeCtg = ({ctgId, post_id})=>{


	const [posts, setPosts] = useState([])
	const [load, setLoad]   = useState("1")
	let end = false


	const dispatch = useDispatch()

	let formData = new FormData()
	formData.append("post_id",post_id)
	formData.append("ctg_id",ctgId)

	const getPost = async()=>{
		if(await dispatch(getPostsByCtg(formData))){
			end = true
		}

	}
	

	let re = setTimeout(function(){
		if(load == "1"){
			getPost()
		}
		setLoad("")

		clearTimeout(re)

	},500)

	let postss = useSelector(state => state.likeCtgReducer)


	
	return<div>
		{!isEmpty(postss)?
			<div>
				<Typography variant="h5" containt="h2">De la même categorie</Typography>
				<hr />
				<Articles posts={postss} parenturl="post" />
			</div>:
			<div>chargement des articles..</div>
		}
	</div>
}

export default ArticleLikeCtg