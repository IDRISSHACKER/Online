import { forwardRef, useEffect } from "react"
import { Typography, Card, Button, TextField, CardHeader, Grid, Stack, Rating, Dialog, DialogContent, DialogActions, DialogTitle, DialogContentText } from "@material-ui/core"
import LoadingButton from '@material-ui/lab/LoadingButton';
import settings from "../../_mocks_/settings"
import { evaluate, fFcfa, sizeDatas, getIfInCard } from "../../utils/formatNumber"
import { formatDescription } from './../../utils/formatText'
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { random, round } from "lodash"
import { useDispatch } from "react-redux"
import { setCommande } from "src/action/Commande.action"
import { Snackbar } from '@material-ui/core';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from "@mui/material/Alert"
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { ArrowBackSharp, ArrowLeftOutlined, ArrowRightOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { isEmpty } from "src/utils/isEmpty";
import roundToNearestMinutes from "date-fns/roundToNearestMinutes";
import { Link as RouterLink } from "react-router-dom";

const setting = new settings()
const Alert = forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ArticleDesc({ Desc, avisp }) {
	const navigate = useNavigate()
	const [rat, setRat] = useState(evaluate(avisp))
	const [qtt, setQtt] = useState(1)
	const [errorMsg, setErrorMsg] = useState("ajout Impossible !")
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false)
	const [openLoad, setOpenLoad] = useState(false)
	const [addActive, setAddActive] = useState(false)
	const [inCard, setInCard] = useState(false)
	const cards = useSelector(state => state.cardReducer)

	const dispatch = useDispatch()

	const options = [];


	for (let i = 1; i <= parseInt(Desc.qtt); i++) {
		options.push(<option key={i} value={i}>{i}</option>)
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenSuccess(false);
		setOpenError(false);
		setAddActive(false)
	};

	const handlerAdd = () => {
		setAddActive(true)
		setInCard(true)
		const status = localStorage.getItem("connected") ? parseInt(localStorage.getItem("connected")) : 0

		if (status) {
			let fData = new FormData()
			fData.append("user_id", localStorage.getItem("id"))
			fData.append("post_id", Desc.id)
			fData.append("qtt", qtt)

			dispatch(setCommande(fData))
			setOpenSuccess(true)
		} else {
			setErrorMsg("Vous devez être connecté")
			setOpenError(true)

			setTimeout(() => {
				navigate("/login")
			}, 300)
		}

	}
	useEffect(() => {

		setTimeout(() => {
			let verify = false
			!isEmpty(cards) && cards.map((card) => {
				if (card.pId === Desc.id) {
					verify = true
				}
			})

			verify ? setInCard(true) : setInCard(false)
		}, 200)

	}, [Desc.id])

	const handleCloseLoad = () => {
		setOpenLoad(false);
	};

	return <>
		<div>
			<Typography variant="h4" contain="h2">{Desc.title}</Typography>
			<hr />
			{parseInt(Desc.showPrice) ?
				<Typography variant="h5" contain="h3">
					<span>Prix: </span>
					<span className="price">{fFcfa(Desc.price)}</span>

				</Typography> :
				<span></span>
			}
			<hr />
			<Typography variant="h5" contain="h3">
				<span>note globale: </span>
				<span>
					<Rating defaultValue={0} value={evaluate(avisp)} size="large" precision={0.5} readOnly />
				</span>
				<span> {sizeDatas(avisp)} evaluation</span>
			</Typography>
			<hr />
			{!parseInt(Desc.isSoftware) ?
				<Typography variant="h5" contain="h3">
					<span>En Stock: </span>
					<span className="price">{Desc.qtt}</span>
				</Typography>
				:
				<span></span>
			}
			<hr />
			<div>
				<Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
					{!parseInt(Desc.isSoftware) ?
						<select
							className="custom-select"
							value={qtt}
							onChange={(e) => setQtt(e.target.value)}
						>{options}</select>
						:
						<span></span>
					}
					<div>
						<Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
							<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
								{Desc.title} ajouté au panier
							</Alert>
						</Snackbar>
						<Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
							<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
								{errorMsg}
							</Alert>
						</Snackbar>
						<Backdrop
							sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 99999999, marginLeft: "200px" }}
							open={openLoad}
							onClick={handleCloseLoad}
						>
							<CircularProgress color="inherit" />
							<Typography>ajout en cours...</Typography>
						</Backdrop>
					</div>
					{addActive ?
						<LoadingButton
							fullWidth
							size="large"
							variant="contained"
							loading
							color="error"
						>supression</LoadingButton>
						:
						<div>
							{!inCard ?
								<Button
									startIcon={<ShoppingCartOutlined />}
									fullWidth
									size="large"
									variant="contained"
									onClick={handlerAdd}
								>
									Ajouter au panier
								</Button>
								:
								<Button
									startIcon={<ShoppingBagOutlined />}
									endIcon={<ArrowRightOutlined />}
									fullWidth
									size="large"
									variant="contained"
									LinkComponent={RouterLink}
									to="/store/card"
								>
									Acceder au panier
								</Button>
							}
						</div>
					}
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