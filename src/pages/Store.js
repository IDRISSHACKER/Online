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

const infos = new settings()

function Store(){

	const dispatch = useDispatch()

	//dispatch(getPosts())

	const posts = useSelector(state => state.postsReducer)

	return<div>
		<Page title="Store | hardware, software">
			<Container maxWidth="lg">
				
				<Typography variant="h2">Store app</Typography>	
				<br/>
				<Articles posts={posts} />
			
			</Container>
		</Page>
	</div>
}

export default Store