import { CardActions, Card } from "@mui/material"
import { random } from "lodash"

export default function ItemCaroussel({article}){
    return<>
        <div style={customStyle}>
            {article}
        </div>
    </>
}

const customStyle = {
    width:"100%",
    height:"100%",
    margin:"10px",
}