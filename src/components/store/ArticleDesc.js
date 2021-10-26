import {Typography, Card, Button, TextField, CardHeader, Grid, Stack, Rating, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText} from "@material-ui/core"
import settings from "../../_mocks_/settings"
import {fFcfa} from "../../utils/formatNumber"
import {formatDescription} from './../../utils/formatText'
import {useNavigate} from 'react-router-dom'
import Modal from "./Modal"
import { useState } from "react"
import { random, round } from "lodash"

const setting = new settings()

export default function ArticleDesc({Desc}){
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)
	const [rat, setRat] = useState('0')

	const setOpened =  function(value = true){
		setOpen(value)
		return value
	}

	  const options = [];	

	  for(let i = 1; i<=parseInt(Desc.qtt); i++){
	    options.push(<option key={i} value={i}>{i}</option>)
	  }

	  const handlerRating = (ev, newRat)=>{
		  setRat(`${newRat}`)

		const connected = localStorage.getItem('connected') ? parseInt(localStorage.getItem('connected')) : 0

		if(connected){
			setOpen(true)
			setOpened(true)
			//
		}else{

			ev.preventDefault()
			navigate("/login", {replace:true})
			
		}

	  }

	  const evaluation = 4 

	return <>
		<div>
			<Typography variant="h4" contain="h2">{Desc.title}</Typography>
			<hr />
			<Typography variant="h5" contain="h3">
				<span>Prix: </span>
				<span className="price">{fFcfa(Desc.price)}</span>
			</Typography>
			<hr />
			<Typography variant="h5" contain="h3">
				<span>note globale: </span>
				<span>
					<Rating defaultValue={0} value={rat} size="large" precision={0.5} onChange={handlerRating}  />
				</span>
				<span> 1 evaluation</span>
				<span>
					{open ? 
						<Modal opened={setOpened} post={Desc} parent_note={rat}/>
						:
						<></>
					}
				</span>
			</Typography>
			<hr />
			<Typography variant="h5" contain="h3">
				<span>En Stock: </span>
				<span className="price">{Desc.qtt}</span>
			</Typography>
			<hr />
			<div>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
					<select className="custom-select">{options}</select> 
					<Button
						fullWidth
		                size="large"
		                variant="contained"
		              >
		                Ajouter au panier
		            </Button>
		        </Stack>
			</div>
			<hr />
			<Typography variant="h5">Description de l'article</Typography>
			<br />
			<Typography variant="body2">
				{formatDescription(Desc.description, 384)}
			</Typography>
		</div>
	</>
}