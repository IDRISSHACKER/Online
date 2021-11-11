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
import { MessageOutlined } from "@mui/icons-material"
import LikeCtgCaroussel from "src/components/store/likeCtg.caroussel"
import { useNavigate } from "react-router-dom"
//import "../css/master.scss"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const infos = new settings()

function Post() {
	const cards = useSelector(state => state.cardReducer)
	const dispatch = useDispatch()


	return <div>
		<Page title="Votre panier">
			<Container maxWidth="lg">
				<br />
				<br />
				<br />
				<br />
				<Breadcrumb currentpath={"/"} text="Acceuil" post={{ title: "Panier" }} />
				<br />
				<div>
					<div className="App">
						<h2>Using CKEditor 5 build in React</h2>
						<CKEditor
							editor={ClassicEditor}
							data="<p>Hello from CKEditor 5!</p>"
							onReady={editor => {
								// You can store the "editor" and use when it is needed.
								console.log('Editor is ready to use!', editor);
							}}
							onChange={(event, editor) => {
								const data = editor.getData();
								console.log({ event, editor, data });
							}}
							onBlur={(event, editor) => {
								console.log('Blur.', editor);
							}}
							onFocus={(event, editor) => {
								console.log('Focus.', editor);
							}}
						/>
					</div>
				</div>
			</Container>
		</Page>
	</div>
}

export default Post