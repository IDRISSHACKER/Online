import { useState, useEffect } from "react"
import Caroussel from 'react-elastic-carousel'
import Article from './Article'
import ItemCaroussel from './Item.caroussel'
import { isEmpty } from 'src/utils/isEmpty'
import { useDispatch, useSelector } from "react-redux"
import { getPostsByCtg } from "src/action/likeCtg.action"
import axios from 'axios'
import settings from "src/_mocks_/settings"
import { Typography } from "@material-ui/core"
import React from "react"
import LinearProgress from '@mui/material/LinearProgress'

const infos = new settings()

const api = axios.create({
	baseURL: `${infos.init().APP_URL}?page=articleLikeCtg/`
});

export default function LikeCtgCaroussel({ ctgId, post_id }) {

	const [posts, setPosts] = useState()
	const [load, setLoad] = useState(true)

	const dispatch = useDispatch()
	const postss = useSelector(state => state.likeCtgReducer)

	useEffect(() => {
		setLoad(true)
	}, [post_id, ctgId])

	useEffect(() => {
		let formData = new FormData()
		formData.append("post_id", post_id)
		formData.append("ctg_id", ctgId)
		dispatch(getPostsByCtg(formData))
	}, [])

	
	useEffect(() => {
		const getPost = async () => {
			!isEmpty(postss) && setPosts(postss)
			setLoad(false)
		}
		!isEmpty(postss) && getPost()
	}, [postss])

	return <>
		<Typography variant="h5" containt="h2">De la même categorie</Typography>
		<hr />
		{load ?
			<LinearProgress />
			:
			<Caroussel breakPoints={breakPoints} >
				{!isEmpty(postss) && posts.map((post, index) => (
					<ItemCaroussel key={index} article={<Article post={post} parent={"post"} />} />
				))}
			</Caroussel>
		}
	</>
}

const breakPoints = [
	{
		width: 1,
		itemsToShow: 1
	},
	{
		width: 550,
		itemsToShow: 2
	},
	{
		width: 768,
		itemsToShow: 3
	},
	{
		width: 1200,
		itemsToShow: 4
	},
]