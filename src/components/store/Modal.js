import * as React from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, TextField, Typography} from "@material-ui/core"
import { useDispatch } from 'react-redux';
import { setAvi as setAvis } from 'src/action/avis.action';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({opened, post, parent_note}) {

  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(true);
  const [note, setNote] = React.useState("3");
  const [motif, setMotif] = React.useState("");
  const [avi, setAvi] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    opened(false)
  };


  const handleSend = ()=>{

    const data = new FormData
    data.append("note", note)
    data.append("title", motif)
    data.append("comment", avi)

    console.log("note", note)
    console.log("title", motif)
    console.log("comment", avi)

    if(note && motif && avi){

      if(dispatch(setAvis(data))){
        console.log("success")

        setNote("")
        setAvi("")
        setMotif("")
        

        handleClose()
        opened(false)
        setOpen(false)
      }

    }else{

      console.log("error")

    }

    console.log("Avis prise en compte ")
    
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="Doner son avis"
      >
        <DialogTitle>{`Doner son avis sur ${post.title} `}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description ">
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="motif"
            label="Entrez le motif"
            type="text"
            fullWidth
            variant="standard"
            onChange={e=>setMotif(e.target.value)}
          />
          <br />
          <div className="msg">
            <TextField
                margin="dense"
                id="msg"
                label="Rediger votre commentaire"
                type="text"
                fullWidth
                variant="standard"
                multiline
                rows={5}
                onChange={e=>setAvi(e.target.value)}
            />
         </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSend}>Envoyé</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
