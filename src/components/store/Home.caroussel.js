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
import SlideCaroussel from "./Slide.caroussel"

const infos = new settings()


export default function HomeCaroussel(){


	let sliders = useSelector(state => state.slideReducer)

    return <>
        <Typography variant="h5" containt="h2">De la même categorie</Typography>
		<hr />
        <Caroussel breakPoints={breakPoints} >
            {!isEmpty(sliders) && sliders.map((slide, index)=>(
                <ItemCaroussel key={index} article={<SlideCaroussel slide={slide} parent={"post"} />}/>
            ))}
        </Caroussel>
    </>
}

const breakPoints = [
    {width:1, itemsToShow:1},
    {width:550, itemsToShow:1},
    {width:768, itemsToShow:1},
    {width:1200, itemsToShow:1},
]