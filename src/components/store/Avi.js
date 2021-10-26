import {Card, CardContent, CardHeader, Rating, Typography, Avatar, IconButton} from "@material-ui/core"
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import AnnouncementTwoToneIcon from '@mui/icons-material/AnnouncementTwoTone';

export default function Avi({avi}){

    const id = localStorage.getItem("id") ? parseInt(localStorage.getItem("id")) : 0

    return <>
        <Card>
            <CardHeader 
            avatar={<Avatar>{avi.surname[0]}</Avatar> }
            title={avi.email} 
            subheader={<Typography variant={"body1"}><Rating defaultValue={parseFloat(avi.note)} precision={0.5} readOnly   />{avi.title}</Typography>}
            action={id === parseInt(avi.userId) ?
                <IconButton title="Editer votre commentaire">
                    <ModeEditTwoToneIcon color="primary" />
                </IconButton>:
                <IconButton title="Signaler ce commentaire">
                    <AnnouncementTwoToneIcon variant="primary" />
                </IconButton>
            }
            />
            <CardContent>
                <Typography variant="body2">
                    {avi.comment}
                </Typography>
            </CardContent>
        </Card>
    </>
}