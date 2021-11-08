import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Stack, Container, Typography, Button, TextField, Grid, Snackbar, Card, CardContent, Paper } from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import settings from "../../_mocks_/settings"
import Page from "../../components/Page"
import { useDispatch, useSelector } from "react-redux"
import { isEmpty } from "src/utils/isEmpty"
import { addPost, getPosts } from "src/action/posts.action"
import Upload from "src/utils/Upload"
import PostsRows from "src/components/admin/PostsRows"
import { getCtg, setCtg } from "src/action/category.action"
import MuiAlert from "@mui/material/Alert"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Details from "src/components/admin/Details";
import { sizeDatas } from "src/utils/formatNumber";

const infos = new settings()
const timing = 6000

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PostList() {

    let posts = useSelector(state => state.postsReducer)
    const dispatch = useDispatch()

    

    return <div>
        <Page title="Liste des produits">
            <Container maxWidth="lg">
                <div className="upload">
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Produits
                        </Typography>
                        <Button
                            startIcon={
                                <LibraryAddIcon />
                            }
                            variant="contained"
                            component={RouterLink}
                            to="/admin/post-list/upload"
                        >
                            Ajouter un produit
                        </Button>
                    </Stack>
                </div>
                <div>
                    <br />
                    <Card>
                        <CardContent>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nom de l'article</TableCell>
                                            <TableCell>Categorie</TableCell>
                                            <TableCell>Prix</TableCell>
                                            <TableCell align="right">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!isEmpty(posts) && typeof posts === "object" && posts.map((post, index) => (
                                            <PostsRows post={post} key={index} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </Page>
    </div>
}