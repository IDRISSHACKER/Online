import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { Container, Typography, Stack, Link } from '@material-ui/core'
import settings from "../_mocks_/settings"
import axios from "axios"
import Articles from "./../components/store/Articles"
import Page from "../components/Page"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "lodash"
import { getPosts } from "src/action/posts.action"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import HomeCaroussel from "src/components/store/Home.caroussel"
import { Parallax } from 'react-scroll-parallax';

const infos = new settings()
const percentage = 60
function Store() {

	const dispatch = useDispatch()

	//dispatch(getPosts())

	const posts = useSelector(state => state.postsReducer)
	const postsMost = useSelector(state => state.mostAvisPostsReducer)

	return <div>
		<Page title="Store | hardware, software">
			<div>
				<Parallax className="custom-class" y={[-20, 0]} tagOuter="div">
					<HomeCaroussel />
				</Parallax>
				<Parallax className="custom-class" y={[0, -20]} tagOuter="div">
					<div style={{ background: "white" }}>
						<Container maxWidth="lg">
							<Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
								<Typography variant="h3">Les articles les plus recents</Typography>
								<Link underline="none" to="/" component={RouterLink} >Tout aficher</Link>
							</Stack>
							<Articles posts={posts} />
						</Container>
					</div>
				</Parallax>
				<Container maxWidth="lg">
					<Parallax className="custom-class" y={[20, -20]} tagOuter="div">
						<br />
						<Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
							<Typography variant="h3">Les articles les plus populaire</Typography>
							<Link underline="none" to="/" component={RouterLink} >Tout aficher</Link>
						</Stack>
						<Articles posts={postsMost} />
						<br />
						{/**<CircularProgressbar value={percentage} text={`${percentage}%`} />**/}
					</Parallax>
				</Container>
			</div>
		</Page>
	</div>
}

export default Store