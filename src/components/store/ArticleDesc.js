import {Typography, Card, Button, TextField, CardHeader, Grid, Stack} from "@material-ui/core"
import settings from "../../_mocks_/settings"
import {fFcfa} from "../../utils/formatNumber"
import {formatDescription} from './../../utils/formatText'

const setting = new settings()

export default function ArticleDesc({Desc}){
	  
	  const options = [];

	  for(let i = 1; i<=parseInt(Desc.qtt); i++){
	    options.push(<option key={i} value={i}>{i}</option>)
	  }

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