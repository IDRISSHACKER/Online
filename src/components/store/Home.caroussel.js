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
import { margin } from "@material-ui/system"

const infos = new settings()


export default function HomeCaroussel(){


	let sliders = useSelector(state => state.slideReducer)
    let carousel
    //carousel.goTo(Number(target.value))
    const speed = 10000

    return <>
		<hr />
        <Caroussel style={customStyle} enableAutoPlay autoPlaySpeed={speed} breakPoints={breakPoints} onChange={(currentItem, pageIndex) => pageIndex === sliders.length - 1 ? setTimeout(()=>carousel.goTo(0), (speed*2)-(speed/2)) : console.log(pageIndex) } ref={ref => (carousel = ref)}>

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

const customStyle = {
    width: "100%",
    padding: "0px",
    margin: "0px",
}