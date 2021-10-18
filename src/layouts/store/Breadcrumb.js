import {Link as RouterLink} from "react-router-dom"
import {Stack, Link} from "@material-ui/core"

export default function Breadcrumb({currentpath, text}){

	return <>
		<div className="breadcrumb">
			<Stack>
				<Link underline="none" variant="subtitle2" component={RouterLink} to={currentpath}>
					{"<"}{text}
				</Link>
			</Stack>
		</div>
	</>
}