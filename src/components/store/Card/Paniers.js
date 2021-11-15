import { useState } from "react";
import { Chip, TextField, Tooltip } from "@material-ui/core";
import { CreditCardOffOutlined, CreditCardSharp, PlaylistAddCheckOutlined } from "@mui/icons-material";
import { LoadingButton } from "@material-ui/lab"
import { Button, Stack, Typography, Card, CardContent, TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Paper, Grid, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux"
import { fFcfa } from "src/utils/formatNumber";
import { isEmpty } from "src/utils/isEmpty";
import Panier from "./Panier"

export default function Paniers({ onStep }) {
    const [load, setLoad] = useState(0)

    const cards = useSelector(state => state.cardReducer)

    const handlerSubmit = () => {
        setLoad(1)

        setTimeout(() => {
            setLoad(0)
            onStep(1)
        }, 1000)
    }

    let total = 0
    let totals = !isEmpty(cards) && cards.map((card) => total += (parseInt(card.price) * parseInt(card.commandeQtt)))
    const dispatch = useDispatch()

    return <>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2} mb={1}>
            <Typography variant="h2" gutterBottom>
                Panier <Chip variant="outlined" label={!isEmpty(cards) && cards.length} />
            </Typography>
        </Stack>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={9} lg={8}>

                <TableContainer component={Paper} elevation={5}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nom de l'article</TableCell>
                                <TableCell>Quantité</TableCell>
                                <TableCell>PU</TableCell>
                                <TableCell>PT</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!isEmpty(cards) && cards.map((card, index) => (
                                <Panier post={card} key={index} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total:</Typography>
                        <Typography variant="h3">{fFcfa(total)}</Typography>
                        <br />
                        {!load ?
                            <Tooltip title="Continuer vers le mode de payement">
                                <Button
                                    onClick={handlerSubmit}
                                    fullWidth
                                    variant='contained'
                                    size='medium'
                                    startIcon={
                                        <CreditCardSharp />
                                    }
                                >
                                    Validation
                                </Button>
                            </Tooltip> :
                            <LoadingButton variant='contained' fullWidth loading>Validation</LoadingButton>
                        }
                        <br /><br />
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <TextField
                                type="test"
                                size='small'
                                label="Coupon de reduction"
                                fullWidth
                            />
                            <Button variant="outlined" startIcon={
                                <PlaylistAddCheckOutlined />}>
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>
}