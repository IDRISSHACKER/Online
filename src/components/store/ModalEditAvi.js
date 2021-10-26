import * as React from 'react';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Slide, TextField, Typography} from "@material-ui/core"
import { useDispatch } from 'react-redux';
import { getAvis, setAvi as setAvis, updateAvi } from 'src/action/avis.action';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalEditAvi({opened, post, oldAvi}) {

  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(opened);
  const [note, setNote] = React.useState("0");
  const [motif, setMotif] = React.useState(oldAvi.title);
  const [avi, setAvi] = React.useState(oldAvi.comment);

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
      
    console.log("id",oldAvi.id)

    const data = new FormData
    data.append("id", localStorage.getItem('id') ? localStorage.getItem('id') : 1)
    data.append("comment_id", oldAvi.id)
    data.append("note", note)
    data.append("post_id", post.id)
    data.append("title", motif)
    data.append("comment", avi)

    if(note && motif && avi){

      if(dispatch(updateAvi(data))){
        console.log("success")

        setNote("")
        setAvi("")
        setMotif("")
        
      }

      handleClose()


    }else{

      console.log("error")

    }


    console.log("Avis mise à jour avec success ")
    dispatch(getAvis(post.id))
    dispatch(getAvis(post.id))
    dispatch(getAvis(post.id))
    dispatch(getAvis(post.id))
    dispatch(getAvis(post.id))
    dispatch(getAvis(post.id))
    
  }

  const handlerRating = (ev, newRat)=>{
    setNote(`${newRat}`)

    //const connected = localStorage.getItem('connected') ? parseInt(localStorage.getItem('connected')) : 0
    
  }
  //dispatch(getAvis(post.id))
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="Donner son avis"
      >
        <DialogTitle>{`Donner son avis sur ${post.title} `}</DialogTitle>
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
            value={motif}
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
                value={avi}
            />
         </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSend}>Mettre à jour</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
