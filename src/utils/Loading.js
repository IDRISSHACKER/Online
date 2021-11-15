//import { RotateCircleLoading } from 'react-loadingg';
//import { CommonLoading } from 'react-loadingg';
import {useState} from "react"
import ReactLoading from 'react-loading';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
    return (
        <div className="custom-load">
            <ReactLoading type={"spin"} color={"#5fCf99"} height={367} width={175} />
        </div>
    )
}
//const loading2 = () => <CommonLoading  />

export default Loading;