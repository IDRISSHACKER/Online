import { Spring, useSpring, animated } from "react-spring"
import {Link as RouterLink} from "react-router-dom"
import {Card, CardContent, CardMedia, Link, Rating, Typography} from '@material-ui/core'
import settings from "../../_mocks_/settings"
import {formatTitle} from "../../utils/formatText"
import {evaluate, fFcfa} from "../../utils/formatNumber"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "src/action/posts.action"
import { random } from "lodash"
import { getAvis } from "src/action/avis.action"
import { isEmpty } from "src/utils/isEmpty"
import { useState } from "react"
import { getPostsByCtg } from "src/action/likeCtg.action"

const infos = new settings()

export default function Article({post, parent}){

	const dispatch = useDispatch()

	const location = `/store/${post.id}-${post.slug}`

	const handleClick = async(e)=>{
		let formData = new FormData()
		formData.append("post_id",post.id)
		formData.append("ctg_id",post.ctgId)
		await dispatch(getPosts())
		await dispatch(getPostsByCtg(formData))
		await dispatch(getAvis(post.id))

		if(parent === "post"){
			
			//e.preventDefault()
			//window.location = location

		}

	}

	const [avis, setAvis] = useState(post.notes)
	const notation = 3
	const step = 0.5
	//const props = useSpring({opacity:1,from:{opacity: 0}})


	return(
		<Link underline="none" variant="subtitle2" onClick={handleClick} component={RouterLink} to={location}>
			<Card className="post post-annim">
				<CardMedia
					title = {post.title}
					image = {`${infos.init().APP_FOLDER}/img/posts/${post.img}`}
					className = "apercu"
					alt = {post.img}
				/>
				<CardContent>
					<Typography gutterBottom variant="h6" component="h2">
						{formatTitle(post.title,50)}
					</Typography>
					{/*<Typography variant="body2" color="textSecondary" component="p">
					<Link to="/" underline="none" component={RouterLink}>
						<span>{post.category_name}</span>
					</Link>
					</Typography>*/}
					
					{parseInt(post.showPrice) ?
						<Typography variant="h5" className="price">
							{fFcfa(`${post.price}`)}
						</Typography>
						:
						<span></span>
					}
					<Typography variant="h5" className="price">
						{avis === null || avis === 0 ?
							<span></span>
							:<Rating name="half-rating" defaultValue={3} value={avis == null ? 0 : parseFloat( avis)} precision={step} readOnly/>
					}

					</Typography>
					{!parseInt(post.isSoftware) ?
						<Typography variant="body2" className="stock">
							{parseInt(post.qtt) <= 5 ?
								<span>il ne reste plus que {post.qtt} en stock</span> 
								:
								<span></span>
							}
						</Typography>
						:
						<span></span>
					}

				</CardContent>
			</Card>
		</Link>
	)
}