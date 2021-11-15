import { useEffect } from "react";
import { IconButton, Badge } from "@mui/material"
import shoppingCartFill from "@iconify/icons-eva/shopping-cart-fill"
import { Icon } from '@iconify/react';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { isEmpty } from "src/utils/isEmpty";
import { Link as RouterLink } from "react-router-dom";
import faker from 'faker';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useRef, useState } from 'react';
import { set, sub, formatDistanceToNow } from 'date-fns';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
// material
import { alpha } from '@material-ui/core/styles';
import { formatTitle } from "src/utils/formatText";
import {
    Box,
    List,
    Button,
    Avatar,
    Tooltip,
    Divider,
    ListItem,
    Typography,
    ListItemText,
    ListSubheader,
    ListItemAvatar,
    Chip
} from '@material-ui/core';
// utils
import { mockImgAvatar } from '../../utils/mockImages';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import settings from "src/_mocks_/settings";
import { fFcfa } from "src/utils/formatNumber";
import { ShopOutlined, ShoppingBasket } from "@mui/icons-material";


const param = new settings().init()


function CardItem({ card, ...props }) {

    return (
        <ListItem
            props
            button
            disableGutters
            sx={{
                py: 1.5,
                px: 2.5,
                mt: '1px',
            }}

        >
            <ListItemAvatar>
                <img className="custom-card-img" src={`${param.APP_FOLDER}/img/posts/${card.img}`} />
            </ListItemAvatar>
            <Tooltip title={card.title}>
                <ListItemText
                    primary={`${formatTitle(card.title, 27)}`}
                    secondary={
                        <Typography
                            variant="caption"
                            sx={{
                                mt: 0.5,
                                display: 'flex',
                                alignItems: 'center',
                                color: 'text.disabled'
                            }}
                        >
                            <span className="sub">{fFcfa(parseInt(card.price) * parseInt(card.commandeQtt))}</span>
                        </Typography>
                    }
                />
            </Tooltip>
        </ListItem>
    );
}

export default function CardPopover() {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const card = useSelector(state => state.cardReducer)
    let total = 0
    let totals = !isEmpty(card) && card.map((panier) => total += (parseInt(panier.price) * parseInt(panier.commandeQtt)))

    return (
        <>
            <IconButton
                ref={anchorRef}
                onMouseOver={
                    () => setOpen(true)
                }
                style={{
                    color: "white",
                    marginRight: "20px"
                }}>
                {!isEmpty(card) && <Badge badgeContent={card.length} color="info">
                    <ShoppingCartOutlinedIcon />
                </Badge>}
            </IconButton>

            <MenuPopover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                sx={{ width: 360 }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">Panier</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Vous avez {card.length} produits dans votre panier
                        </Typography>
                        <Typography variant="subtitle1">{fFcfa(total)}</Typography>
                    </Box>
                </Box>
                <Divider />
                <Scrollbar sx={{ height: "400px" }}>
                    <List
                        disablePadding
                    >
                        {card.map((panier) => (
                            <CardItem
                                to="/store/card"
                                component={RouterLink}
                                key={panier.id}
                                card={panier}
                                onMouseEnter={
                                    () => setOpen(true)
                                }
                                onMouseLeave={
                                    () => setOpen(false)
                                }
                            />
                        ))}
                    </List>
                </Scrollbar>
                <Divider />
                <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button
                            component={RouterLink}
                            to="/store/card"
                            startIcon={
                                <ShopOutlined />
                            }
                            onClick={
                                () => setOpen(false)
                            }
                            variant="contained"
                            size="large"
                            fullWidth
                        >Acceder au panier</Button>
                    </Box>
                </Box>
            </MenuPopover>
        </>
    );
}
