import {Link as RouterLink} from "react-router-dom"
import {Stack, Link, Breadcrumbs, Chip} from "@material-ui/core"
import HomeOutlined from "@mui/icons-material/HomeOutlined"

export default function Breadcrumb({currentpath, text, post}){

	return <>
		<div className="breadcrumb">
			<Stack>
				<Breadcrumbs>
					<Chip label={<><Link underline={"none"} to={"/store"} component={RouterLink} >Store</Link></>} />
					<Link underline={"none"}>{post.title}</Link>
				</Breadcrumbs>
			</Stack>
		</div>
	</>
}