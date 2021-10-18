import React from "react"
import { Card, Button, TextField, CardHeader, Grid} from '@material-ui/core'
import axios from "axios"
import Article from "./Article"
// Import Swiper React components
import {Swiper} from 'swiper/react/swiper';
import {SwiperSlide} from 'swiper/react/swiper-slide'

// Import Swiper styles
import 'swiper/swiper.min.css';
//import 'swiper/components/effect-coverflow/effect-coverflow.min.css'

export default function ArticlesSwip({posts}){
		return<div>
		 <Swiper
		      spaceBetween={50}
		      slidesPerView={3}
		      onSlideChange={() => console.log('slide change')}
		      onSwiper={(swiper) => console.log(swiper)}
		    >
			{posts.map((post,index)=>(
				<SwiperSlide>
					<Card key={index}>
						<Article post={post} />
					</Card>
				</SwiperSlide>
			))}
			</Swiper>
		</div>
}
