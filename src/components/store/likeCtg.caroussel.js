import {useState} from "react"
import Caroussel from 'react-elastic-carousel'
import Article from './Article'
import ItemCaroussel from './Item.caroussel'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from "react-redux"
import { getPostsByCtg } from "src/action/likeCtg.action"
import axios from 'axios'
import settings from "src/_mocks_/settings"
import { Typography } from "@material-ui/core"

const infos = new settings()

const api = axios.create({
  baseURL: `${infos.init().APP_URL}?page=articleLikeCtg/`
});

export default function LikeCtgCaroussel({ctgId, post_id}){

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

    return <>
        <Typography variant="h5" containt="h2">De la même categorie</Typography>
		<hr />
        <Caroussel breakPoints={breakPoints} >
            {!isEmpty(postss) && postss.map((post, index)=>(
                <ItemCaroussel key={index} article={<Article post={post} parent={"post"} />}/>
            ))}
        </Caroussel>
    </>
}

const breakPoints = [
    {width:1, itemsToShow:1},
    {width:550, itemsToShow:3},
    {width:768, itemsToShow:4},
    {width:1200, itemsToShow:5},
]