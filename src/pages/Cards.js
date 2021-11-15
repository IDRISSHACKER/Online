import React, { useState } from "react"
import { Grid, Card, Stack, Link, Container, Typography, Chip, TextFiel, Button, TextField, CardHeader, Breadcrumbs, Rating } from '@material-ui/core'
import settings from "../_mocks_/settings"
import { getIdInUrl } from "../utils/formatText"
import axios from "axios"
import Page from "../components/Page"
import Loading from "../utils/Loading"
import ArticleImg from "../components/store/ArticleImg"
import ArticleDesc from "../components/store/ArticleDesc"
import Breadcrumb from "../layouts/store/Breadcrumb"
import ArticleLikeCtg from "../components/store/ArticleLikeCtg"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "src/utils/isEmpty"
import { Skeleton } from "react-loading-skeleton"
import AvisList from "src/components/store/AvisList"
import { getAvis } from "src/action/avis.action"
import { extendWith, round } from "lodash"
import { evaluate, sizeDatas } from "src/utils/formatNumber"
import Modal from "../components/store/Modal"
import { CheckBoxOutlineBlankOutlined, CreditCardSharp, DoneAllOutlined, MessageOutlined, ShoppingBagTwoTone } from "@mui/icons-material"
import LikeCtgCaroussel from "src/components/store/likeCtg.caroussel"
import { useNavigate } from "react-router-dom"
import Paniers from "src/components/store/Card/Paniers"
//Stepper
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PaypalPayement from "src/components/Payement/Paypal.payement"
//import "../css/master.scss"
const infos = new settings()

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 16px)',
		right: 'calc(50% + 16px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#784af4',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#784af4',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderTopWidth: 3,
		borderRadius: 1,
	},
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
	display: 'flex',
	height: 22,
	alignItems: 'center',
	...(ownerState.active && {
		color: '#784af4',
	}),
	'& .QontoStepIcon-completedIcon': {
		color: '#784af4',
		zIndex: 1,
		fontSize: 18,
	},
	'& .QontoStepIcon-circle': {
		width: 8,
		height: 8,
		borderRadius: '50%',
		backgroundColor: 'currentColor',
	},
}));

function QontoStepIcon(props) {
	const { active, completed, className } = props;

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? (
				<Check className="QontoStepIcon-completedIcon" />
			) : (
				<div className="QontoStepIcon-circle" />
			)}
		</QontoStepIconRoot>
	);
}

QontoStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 22,
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			backgroundImage:
				'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		height: 3,
		border: 0,
		backgroundColor:
			theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
		borderRadius: 1,
	},
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
	zIndex: 1,
	color: '#fff',
	width: 50,
	height: 50,
	display: 'flex',
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
	...(ownerState.active && {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
	}),
	...(ownerState.completed && {
		backgroundImage:
			'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
	}),
}));

function ColorlibStepIcon(props) {
	const { active, completed, className } = props;

	const icons = {
		1: <ShoppingBagTwoTone />,
		2: <CreditCardSharp />,
		3: <DoneAllOutlined />,
	};

	return (
		<ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
			{icons[String(props.icon)]}
		</ColorlibStepIconRoot>
	);
}

ColorlibStepIcon.propTypes = {
	/**
	 * Whether this step is active.
	 * @default false
	 */
	active: PropTypes.bool,
	className: PropTypes.string,
	/**
	 * Mark the step as completed. Is passed to child components.
	 * @default false
	 */
	completed: PropTypes.bool,
	/**
	 * The label displayed in the step icon.
	 */
	icon: PropTypes.node,
};

const steps = ['Validation de vos articles', 'Mode de payement', 'Finalisation'];



function Cards() {
	const [active, setActive] = useState(0)

	const setStep = (step) => {
		setActive(step)
	}

	const setPage = (e) => {
		if(active === 1){
			setActive(0)
		}
	}

	const cards = useSelector(state => state.cardReducer)

    let total = 0
    let totals = !isEmpty(cards) && cards.map((card) => total += (parseInt(card.price) * parseInt(card.commandeQtt)))


	return <div>
		<Page title="Votre panier">
			<Container maxWidth="lg" style={{ marginTop: "100px", marginBottom: "50px" }}>
				<Breadcrumb currentpath={"/"} text="Acceuil" post={{ title: "Panier" }} />
				<br />
				<div>
					<Stack sx={{ width: '100%' }} spacing={4}>
						<Stepper alternativeLabel activeStep={active} connector={<ColorlibConnector />}>
							{steps.map((label, index) => (
								<Step key={label}>
									<StepLabel onClick={setPage} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
					</Stack>
					{active === 0 &&
						<Paniers onStep={setStep} />
					}
					{active === 1 &&

						<PaypalPayement order={total} />
							
					}
				</div>
			</Container>
		</Page>
	</div>
}

export default Cards