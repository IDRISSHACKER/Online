import {IconButton, Badge} from "@mui/material"
import shoppingCartFill from "@iconify/icons-eva/shopping-cart-fill"
import { Icon } from '@iconify/react';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { isEmpty } from "src/utils/isEmpty";
import { Link as RouterLink } from "react-router-dom";

export default function CardPopover(){

    const card = useSelector(state=>state.cardReducer)

    return <>
      <IconButton LinkComponent={RouterLink} to="/store/card"  style={{
            color:"white",
            marginRight: "20px"
        }}>
            {!isEmpty(card) && <Badge badgeContent={card.length} color="info">
                <ShoppingCartOutlinedIcon />
            </Badge>}
        </IconButton>
    </>
}