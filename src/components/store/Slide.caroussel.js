import { Spring, useSpring, animated } from "react-spring"
import {Link as RouterLink} from "react-router-dom"
import {Card, CardContent, CardMedia, Link, Rating, Typography, Button} from '@material-ui/core'
import settings from "../../_mocks_/settings"
import {formatTitle} from "../../utils/formatText"
import {evaluate, fFcfa} from "../../utils/formatNumber"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "src/utils/isEmpty"
import { useState } from "react"

const infos = new settings()

export default function SlideCaroussel({slide}){
    const location = `/store/${slide.pId}-${slide.slug}`
    return<>
        <div style={customStyle}>
            <Link underline="none" variant="subtitle2" component={RouterLink} to={location}>
                <Card className="caroussel">
                    <CardMedia
                        title = {slide.stitle}
                        image = {`${infos.init().APP_FOLDER}/img/posts/${slide.img}`}
                        className = "apercu-caroussel"
                        alt = {slide.img}
                    />
                    <CardContent className="custom-content" style={customStyle} >
                        <div>
                            <Typography className="custom-content-title" gutterBottom variant="h3" component="h2">
                                {formatTitle(slide.stitle,80)}
                            </Typography>
                            <Typography className="custom-content-subtitle" gutterBottom variant="body2" component="h2">
                                {formatTitle(slide.description,100)}
                            </Typography>
                            <Button className="custom-content-button" component={RouterLink} to={location}>Voir les details</Button>
                        </div>

                    </CardContent>
                </Card>
            </Link>
        </div>
    </>
}

const customStyle = {
    width:"100%",
    height:"100%",
}