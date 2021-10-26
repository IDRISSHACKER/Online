import { Grid, Typography } from "@material-ui/core";
import { isEmpty } from "src/utils/isEmpty";
import Avi from "./Avi";


export default function AvisList({avis}){

    return <>
        <Grid container>
            <Grid item sm={12}>
                <Typography variant="h6" containt="h2">Commentaires clients</Typography>
                <hr />
            </Grid>
            {!isEmpty(avis) && avis.map((avi, index)=>(
                <Grid className="w100" key={index} item sm={12} md={12} xl={12} >
                    <Avi className="w100" avi={avi} />
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