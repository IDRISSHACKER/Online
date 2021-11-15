
import React, { useState, useEffect } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Container, Typography, Chip, Grid, Button } from '@material-ui/core'
import settings from "../_mocks_/settings"
import Page from "../components/Page"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Divider from '@mui/material/Divider';
import { isEmpty } from "src/utils/isEmpty"
import Article from "src/components/store/Article"
import Loading from "../utils/Loading"
import LinearProgress from '@mui/material/LinearProgress'
import { getIdInUrl } from "../utils/formatText"
import { getPostCtg } from "src/action/postCtg.action"
import { random } from "lodash"
import { ListAltOutlined, ListAltSharp, TitleRounded, StorefrontOutlined, Store, AppsOutlined } from "@mui/icons-material"


const infos = new settings()

function Posts() {

    const [posts, setPosts] = useState([])
    const [postsCtg, setPostCtg] = useState([])
    const [currentPosts, setCurentPosts] = useState([])
    const [loadPosts, setLoadPost] = useState(true)
    const [categories, setCategories] = useState([])
    const [loadCategories, setLoadCategories] = useState(true)
    const [perPage, setPerPage] = useState(16)
    const [endPage, setEndPage] = useState(false)
    const [refresh, setRefresh] = useState(345)
    const [title, setTitle] = useState("Tous les Produits")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let id = getIdInUrl(window.location.href)
    typeof id !== 'number' ? navigate("/404") : id = id

    useEffect(async () => {
        setLoadPost(true)
        if (id == 0) {

        } else {
            let param = new FormData()
            param.append("ctg_id", id)
            dispatch(getPostCtg(param))
        }
    }, [id, window.location.href])

    const dataPosts = id === 0 ? useSelector(state => state.postsReducer) : useSelector(state => state.getPostCtgReducer)
    useEffect(() => {
        const getArticles = async () => {
            setLoadPost(true)
            setPosts(dataPosts)
            setCurentPosts(dataPosts.length > perPage ? dataPosts.slice(0, perPage) : dataPosts)
            setLoadPost(false)

            if(dataPosts.length > perPage){
                setEndPage(false)
            }else{
                setEndPage(true)
            }

            if(dataPosts.length === 0){
                setLoadPost(false)
                setTitle("Empty")
                setCurentPosts([])
            }

            id == 0 || isEmpty(currentPosts) ? setTitle("Produits") : !isEmpty(currentPosts) && setTitle(currentPosts[0].category_name)
            
        }
        !isEmpty(dataPosts) && getArticles()
    }, [dataPosts,id])

    const dataCtg = useSelector(state => state.ctgReducer)
    useEffect(() => {
        const getCategory = async () => {
            setCategories(dataCtg)
            setLoadCategories(false)
        }
        !isEmpty(dataCtg) && getCategory()
    }, [loadPosts])

    const handleAdd = (e) => {
        currentPosts.length + perPage >= posts.length && setEndPage(true)
        setCurentPosts(posts.slice(0, currentPosts.length + perPage))
    }

    const handleLoad = (e) => {
        setRefresh(random())
    }

    return <Page title={id == 0 || isEmpty(currentPosts) ? "Produits" : !isEmpty(currentPosts) && currentPosts[0].category_name }>
        {loadPosts && loadCategories ?
            <Loading />
            :
            <Container maxWidth="lg" style={{ marginTop: "60px" }}>
                <Divider /><br />
                <Chip color={id == 0 ? "success" : "default"} onClick={handleLoad} component={RouterLink} to={`/store/products/0-all`} label="Tout" />
                {loadCategories ?
                    <span>
                        <LinearProgress />
                    </span>
                    :
                    categories.map((ctg, index) => (
                        <Chip color={id == ctg.id ? "success" : "default"} onClick={handleLoad} component={RouterLink} to={`/store/products/${ctg.id}-${ctg.category_name}`} key={index} label={ctg.category_name} />
                    ))}
                <br /><br />
                <Divider textAlign="left">
                    <Typography variant="h3">
                       <AppsOutlined />  {id == 0 || isEmpty(currentPosts) ? "Tous les articles" : currentPosts[0].category_name}
                    </Typography>
                </Divider>
                <div style={{ marginTop: "30px" }}>
                    <Grid container spacing={3}>
                        {loadPosts ?
                            <Loading />
                            :
                            currentPosts.map((post, index) => (
                                <Grid item md={4} xs={12} sm={6} lg={3} key={index}>
                                    <Article post={post} parent="Posts" />
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
                <br />
                {loadPosts ?
                    <span></span>
                    :
                    <div>
                        {endPage ?
                            <Button variant={"contained"} size={"medium"} disabled>Afficher plus</Button>
                            :
                            <Button variant={"contained"} size={"medium"} onClick={handleAdd}>Afficher plus</Button>
                        }
                        <br /><br />
                    </div>
                }
            </Container>
        }
    </Page>
}

export default Posts