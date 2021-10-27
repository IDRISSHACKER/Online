import * as React from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Slide, TextField, Typography} from "@material-ui/core"
import { useDispatch } from 'react-redux';
import { getAvis, setAvi as setAvis, updateAvi } from 'src/action/avis.action';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalSignal({opened, post, avi}) {

  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(opened);
  const [plainte, setPlainte] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    const timeout = 400
    setTimeout(() => {
      setOpen(false);
      opened(false)
    }, timeout);
  };


  const handleSend = ()=>{
    const data = new FormData

    data.append("user_id", localStorage.getItem('id') ? localStorage.getItem('id') : 1)
    data.append("comment_id", avi.id)
    data.append("plainte", plainte)

    if(plainte){
        

        handleClose()

    }else{

      console.log("error")

    }
    
  }

  //dispatch(getAvis(post.id))
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby=""
      >
        <DialogTitle>{`signaler ${avi.title} `}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description ">
          </DialogContentText>
          <div className="msg">
            <Typography>service indisponible pour le moment</Typography>
         </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSend} variant="disable">Signaler</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
