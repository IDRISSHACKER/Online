import { Outlet } from 'react-router-dom';
import {Stack, Toolbar, AppBar, Typography, experimentalStyled, Button} from '@material-ui/core'
import Logo from '../../components/Logo';
import { Link as RouterLink } from 'react-router-dom';
import AccountPopover from "./../store/AccountPopover"

const useStyles = experimentalStyled({
	appbar:{
		marginBottom:200+"px"	
	}
})

export default function AdminNavbarLayout({children}){
	return(<div>
		<div className="navbar">
			<AppBar className={useStyles.appbar}>
				<Toolbar>
					<RouterLink to="/">
			          <Logo />
			        </RouterLink>
			        <Stack className="right" direction="left" spacing={{ xs: 0.5, sm: 1.5 }}>
			          {localStorage.getItem("connected") ?
			          	<AccountPopover />
			          	:
				        <Button
			                fullWidth
			                size="large"
			                type="submit"
			                variant="contained"
			                to="/login"
			                component={RouterLink}
			              >
			                Connexion
			            </Button>  	
			          }
        			</Stack>
				</Toolbar>
			</AppBar>
		</div>
		<div>
			<Outlet />
		</div>
	</div>)
}