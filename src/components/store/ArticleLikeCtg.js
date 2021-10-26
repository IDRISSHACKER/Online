import React from "react"
import { Card, Stack, Link, Container, Typography, TextFiel, Button, TextField, CardHeader} from '@material-ui/core'
import settings from "../../_mocks_/settings"
import axios from "axios"
import Articles from "./Articles"
import {Link as Routerlink} from "react-router-dom"
import { isEmpty } from "src/utils/isEmpty"

const infos = new settings()

const api = axios.create({
  baseURL: `${infos.init().APP_URL}?page=articleLikeCtg/`
});

class ArticleLikeCtg extends React.Component{

	state = {
		post : []
	}

	constructor({ctgId, post_id}){
		super()
		let formData = new FormData()
		formData.append("post_id",post_id)
		formData.append("ctg_id",ctgId)

		axios.post(`${infos.init().APP_URL}?page=articleLikeCtg/`,formData).then(res=>{

			this.setState({post : res.data})

		}).catch(err=>console.log(err))
	}
	
		render(){
		return<div>
			{isEmpty(this.state.post) === false ?
				<div>
					<Typography variant="h5" containt="h2">De la même categorie</Typography>
					<hr />
					<Articles posts={this.state.post} parenturl="post" />
				</div>:
				<div>chargement des articles..</div>
			}
		</div>
	}

}

export default ArticleLikeCtg