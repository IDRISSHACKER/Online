import React from "react"
import { Container, Typography} from '@material-ui/core'
import settings from "../../_mocks_/settings"
import axios from "axios"
import Page from "../../components/Page"
import Browser from "../../components/admin/broser"

const infos = new settings()

const api = axios.create({
  baseURL: `${infos.init().APP_URL}?page=articles/`
});

function Store(){

		return<div>
			<Page title="Administration">
				<Container maxWidth="lg">
					<br/><br/><br/><br/>
					<Typography variant="h2">Administration</Typography>	
					<br/>
					<Browser />
				</Container>
			</Page>
		</div>
	}


export default Store