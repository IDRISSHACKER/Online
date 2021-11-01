import {Button, Card, Link} from "@material-ui/core"
import {Link as RouterLink} from "react-router-dom"

export default function Browser(){

	return<>
		<Card>
			<Link component={RouterLink} underline="none" to="Upload">
				<Button>Uploader un article</Button>
			</Link>
			<Link component={RouterLink} underline="none" to="create-category">
				<Button>Creer une categorie</Button>
			</Link>
			<Link component={RouterLink} underline="none" to="build-slide">
				<Button>Gestionnaire de caroussel</Button>
			</Link>
		</Card>
	</>
}
