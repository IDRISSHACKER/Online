import React from "react"
import { Container, Typography} from '@material-ui/core'
import settings from "../_mocks_/settings"
import axios from "axios"
import Articles from "./../components/store/Articles"
import Page from "../components/Page"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "lodash"
import { getPosts } from "src/action/posts.action"
import Skeleton, {SkeletonTheme } from "react-loading-skeleton"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import HomeCaroussel from "src/components/store/Home.caroussel"

const infos = new settings()
const percentage = 60
function Store(){

	const dispatch = useDispatch()

	//dispatch(getPosts())

	const posts = useSelector(state => state.postsReducer)

	return<div>
		<Page title="Store | hardware, software">
			<div>
				<HomeCaroussel />
				<Container maxWidth="lg">
					<Typography variant="h3">Les articles les plus recents</Typography>	
					<br/>
					<Articles posts={posts} />
					<br />
					{/**<CircularProgressbar value={percentage} text={`${percentage}%`} />**/}
				</Container>
			</div>
		</Page>
	</div>
}

export default Store