import {Link as RouterLink} from "react-router-dom"
import {Card, CardContent, CardMedia, Link, Rating, Typography} from '@material-ui/core'
import settings from "../../_mocks_/settings"
import {formatTitle} from "../../utils/formatText"
import {fFcfa} from "../../utils/formatNumber"
import { useDispatch } from "react-redux"
import { getPosts } from "src/action/posts.action"
import { random } from "lodash"
import { getAvis } from "src/action/avis.action"


const infos = new settings()

export default function Article({post, parent}){

	const dispatch = useDispatch()

	const location = `/store/${post.id}-${post.slug}`

	const handleClick = (e)=>{

		dispatch(getPosts())
		//dispatch(getAvis(post.id))

		if(parent === "post"){
			
			e.preventDefault()
			window.location = location

		}

	}

	const notation = random(5, true)
	const step = 0.5

	return(

		<Link underline="none" variant="subtitle2" onClick={handleClick} component={RouterLink} to={location}>
			<Card className="post">
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

					<Typography variant="h5" className="price">
						{fFcfa(`${post.price}`)}
					</Typography>
					<Typography variant="h5" className="price">
						<Rating name="half-rating" defaultValue={notation} precision={step} readOnly/>
					</Typography>

					<Typography variant="body2" className="stock">
						il ne reste plus que {post.qtt} en stock
					</Typography>

				</CardContent>
			</Card>
		</Link>
	)
}