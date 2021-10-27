import { Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { isEmpty } from "src/utils/isEmpty";
import Avi from "./Avi"; 



export default function AvisList({avis, post}){

    return <>
        <Grid container>

            {!isEmpty(avis) && avis.map((avi, index)=>(
                <Grid className="w100" key={index} item sm={12} md={12} xl={12} >
                    <Avi className="w100" avi={avi} post={post} />
                    <br />
                </Grid>
            ))}
            {isEmpty(avis) ?
                <Grid className="w100" item sm={12} md={12} xl={12} >
                    <span>aucun commentaires pour cet article !</span>
                </Grid>:<></>
            }
        </Grid>
    </>

}