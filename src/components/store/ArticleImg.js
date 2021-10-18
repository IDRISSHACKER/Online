import {Typography, Card} from "@material-ui/core"
import settings from "../../_mocks_/settings"

const setting = new settings()

export default function ArticleImg({Img}){

	return <>
		<div>
			<Card>
				<img src={`${setting.init().APP_FOLDER}/img/posts/${Img}`} alt={Img} />
			</Card>
		</div>
	</>
}