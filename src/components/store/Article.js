import { Spring, useSpring, animated } from "react-spring"
import { Link as RouterLink } from "react-router-dom"
import { Card, CardContent, CardMedia, Link, Rating, Typography, CardActions } from '@material-ui/core'
import settings from "../../_mocks_/settings"
import { formatTitle } from "../../utils/formatText"
import { evaluate, fFcfa } from "../../utils/formatNumber"
import { useDispatch, useSelector } from "react-redux"
import { getPosts } from "src/action/posts.action"
import { random } from "lodash"
import { getAvis } from "src/action/avis.action"
import { isEmpty } from "src/utils/isEmpty"
import { useEffect, useState } from "react"
import { getPostsByCtg } from "src/action/likeCtg.action"
import { getInCard } from "src/action/inCard.action"
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import * as React from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion"

const infos = new settings()

function Media({ post, parent }, props) {
	let [loading, setLoading] = React.useState(true);
	const dispatch = useDispatch()

	React.useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1000)
	}, [])
	const location = `/store/${post.id}-${post.slug}`

	const handleClick = async (e) => {
		let formData = new FormData()
		formData.append("post_id", post.id)
		formData.append("ctg_id", post.ctgId)
		await dispatch(getPosts())
		await dispatch(getPostsByCtg(formData))
		await dispatch(getAvis(post.id))

		if (parent === "post") {

			//e.preventDefault()
			//window.location = location

		}

	}

	const [avis, setAvis] = useState(post.notes)
	const notation = 3
	const step = 0.5
	//const props = useSpring({opacity:1,from:{opacity: 0}})

	useEffect(() => {
		setAvis(post.notes)
	}, [post])

	const variants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	}
	const x = useMotionValue(0)
	const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={variants}
			whileHover={{ scale: 1.1 }}
    		whileTap={{ scale: 0.9 }}
		>
			<Link underline="none" variant="subtitle2" onClick={handleClick} component={RouterLink} to={location}>
				<Card className="post post-annim">
					{loading ? (
						<Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
					) : (
						<CardMedia
							title={post.title}
							image={`${infos.init().APP_FOLDER}/img/posts/${post.img}`}
							className="apercu"
							alt={post.img}
						/>)}
					<CardContent>
						{loading ? (
							<React.Fragment>
								<Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
								<Skeleton animation="wave" height={15} width="80%" />
							</React.Fragment>
						) : (
							<React.Fragment>
								<Typography gutterBottom variant="h6" component="h2">
									{formatTitle(post.title, 50)}
								</Typography>

								<Typography variant="h5" className="rating">
									{avis === null || avis === 0 ?
										<span></span>
										: <Rating name="half-rating" defaultValue={3} value={avis == null ? 0 : parseFloat(avis)} precision={step} readOnly />
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
							</React.Fragment>
						)}
					</CardContent>
					<CardActions className="custom-action">
						{parseInt(post.showPrice) ?
							<React.Fragment>
								{loading ? (
									<Skeleton animation="wave" width="100%" height={20} />
								) : (
									<Typography variant="h5" className="price">
										{fFcfa(`${post.price}`)}
									</Typography>)}
							</React.Fragment>
							:
							<span></span>
						}
					</CardActions>
				</Card>
			</Link>
		</motion.div>
	)
}

Media.propTypes = {
	loading: PropTypes.bool,
}

export default function Article({ post, parent }) {
	return (
		<div>
			<Media post={post} parent={parent} loading />
		</div>
	);
}