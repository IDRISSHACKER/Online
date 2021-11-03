import React from "react"
import { Card, Button, TextField, CardHeader, Grid} from '@material-ui/core'
import axios from "axios"
import Article from "./Article"
import { isEmpty } from "src/utils/isEmpty"
import Caroussel from 'react-elastic-carousel'
import ItemCaroussel from "./Item.caroussel"


export default function Articles({posts, parenturl}){
		return<div>
			
			<Caroussel breakPoints={breakPoints} >
				{!isEmpty(posts) && typeof posts === 'object' && posts.map((post,index)=>(
						<ItemCaroussel key={index} article={<Article post={post} parent={parenturl} />}/>
					))
				}
			</Caroussel>
		</div>
}

const breakPoints = [
    {
		width:1, 
		itemsToShow:1
	},
    {
		width:550, 
		itemsToShow:2
	},
    {
		width:768, 
		itemsToShow:3
	},
    {
		width:1200, 
		itemsToShow:4
	},
]
