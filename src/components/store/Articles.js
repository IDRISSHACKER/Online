import React from "react"
import { Card, Button, TextField, CardHeader, Grid} from '@material-ui/core'
import axios from "axios"
import Article from "./Article"
import { isEmpty } from "src/utils/isEmpty"


export default function Articles({posts, parenturl}){
		return<div>
			<Grid container spacing={3}>
				{!isEmpty(posts) && typeof posts === 'object' && posts.map((post,index)=>(
						<Grid key={index} item md={3} xs={12} sm={6}>
							<Article post={post} parent={parenturl} />
						</Grid>
					))
				}
			</Grid>
		</div>
}
