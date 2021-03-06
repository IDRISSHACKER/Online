import { useState, useEffect } from "react";

import {Card, CardContent, CardHeader, Rating, Typography, Avatar, IconButton} from "@material-ui/core"
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import AnnouncementTwoToneIcon from '@mui/icons-material/AnnouncementTwoTone';

import ModalEditAvi from "./ModalEditAvi"
import ModalSignal from "./ModalSignal";

import {Spring, animated, useSpring} from "react-spring"

export default function Avi({avi, post}){
    
    const [open, setOpen] =  useState(false)
    const [openPlainte, setOpenPlainte] = useState(false)
    const [rat, setRat] = useState(parseFloat(avi.note))

    useEffect(()=>{
        setRat(parseFloat(avi.note))
    })

    const setOpened =  function(value = true){
		setOpen(value)
		return value
	}

    const setOpenedPlainte =  function(value = true){
		setOpenPlainte(value)
		return value
	}

    const id = localStorage.getItem("id") ? parseInt(localStorage.getItem("id")) : 0

    const handlerEdit = ()=>{
        setOpened(true)
    }

    const handlerSignal = ()=>{
        setOpenPlainte(true)
    }

    const fade = useSpring({
        from:{
            opacity:0
        },
        to:{
            opacity:1
        }
    })

    return <>
        <div>
            <Card>
                <CardHeader 
                avatar={<Avatar>{avi.surname[0]}</Avatar> }
                title={avi.email} 
                subheader={<Typography variant={"body1"}><Rating value={rat} precision={0.5} readOnly   />{avi.title}</Typography>}
                action={id === parseInt(avi.userId) ?
                    <IconButton onClick={handlerEdit} title="Editer votre commentaire">
                        <ModeEditTwoToneIcon color="primary" />
                    </IconButton>:
                    <IconButton onClick={handlerSignal} title="Signaler ce commentaire">
                        <AnnouncementTwoToneIcon variant="primary" />
                    </IconButton>
                }
                />
                <CardContent>
                    <Typography variant="body2">
                        {avi.comment}
                        {open?
                            <ModalEditAvi post={post} opened={setOpened} oldAvi={avi} />:<span></span>
                        }
                        {openPlainte?

                            <ModalSignal opened={setOpenedPlainte} post={post} avi={avi} />:

                            <span></span>

                        }
                    </Typography>
                </CardContent>
            </Card>
        </div>
    </>
}