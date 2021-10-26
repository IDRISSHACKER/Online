import React,{useState} from "react"
import { Grid, Card, Stack, Link, Container, Typography, TextFiel, Button, TextField, CardHeader, Breadcrumbs, Rating } from '@material-ui/core'
import settings from "../_mocks_/settings"
import { getIdInUrl } from "../utils/formatText"
import axios from "axios"
import Page from "../components/Page"
import Loading from "../utils/Loading"
import ArticleImg from "../components/store/ArticleImg"
import ArticleDesc from "../components/store/ArticleDesc"
import Breadcrumb from "../layouts/store/Breadcrumb"
import ArticleLikeCtg from "../components/store/ArticleLikeCtg"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "src/utils/isEmpty"
import { Skeleton } from "react-loading-skeleton"
import AvisList from "src/components/store/AvisList"
import { getAvis } from "src/action/avis.action"
import { extendWith } from "lodash"
//import "../css/master.scss"

const infos = new settings()

function Post() {

	const dispatch = useDispatch()

	const [load, setLoad] = useState(1);

	const posts = useSelector(state => state.postsReducer)

	const id = getIdInUrl(window.location.href)

	const dis = async()=>{
		return await dispatch(getAvis(id))
	}


	const post = !isEmpty(posts) && posts.find((elem)=>parseInt(elem.id)===parseInt(id))

	let re = setTimeout(function(){
		clearTimeout(re)
		if(load === 1){
			dis()
		}
		setLoad(0)
	},200)


	const avis = useSelector(state=>state.aviReducer)

	return <div>
		{isEmpty(post) === false ?
		<Page title={post.title}>
			<Container maxWidth="lg">
				<br />
				<br />
				<br />
				<br />
				<Breadcrumb currentpath={"/"} text="Acceuil" post={post} />
				<br />
					<div>
						<Grid container spacing={3}>
							<Grid item md={7} xs={12} sm={6}>
								<ArticleImg Img={post.img} />
							</Grid>
							<Grid item md={5} xs={12} sm={6}>
								<ArticleDesc Desc={post} />
							</Grid>
							<Grid item md={12} xs={12} sm={12}>
								{load === 0?
									<ArticleLikeCtg ctgId={post.ctgId} post_id={post.id} />:
									<div>loading...</div>
								}
							</Grid>
							<Grid item md={4} xs={12} sm={4}>
								<br />
                				<Typography>
									<Rating value={4} defaultValue={0} size="small" readOnly/>
									<span>4 sur 5</span>
								</Typography>
								<Typography variant="h6">Evaluer ce produit</Typography>
								<Typography variant="body2">Partargez votre opignion avec les autres clients</Typography>
								<Button variant="outlined" color='inherit' size='small'>Ecrire un commentaire client</Button>
							</Grid>
							<Grid item md={8} xs={12} sm={8}>
								{<AvisList avis={avis} />}
							</Grid>
						</Grid>

					</div>
			</Container>
		</Page>:
		<div>loading0...</div>
		}
	</div>
}

export default Post