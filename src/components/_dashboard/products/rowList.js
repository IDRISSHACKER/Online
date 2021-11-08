import {React, useEffect, useState} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// axios
import axios from 'axios';
//
import LoadingButton from '@material-ui/lab/LoadingButton';
// utils
import {fFcfa, fCurrency} from './../../../utils/formatNumber';
import path from './../../../utils/path';

export default function RowList({rowg, indexg}) {
  const [row, setRow] = useState(rowg);
  const [index, setIndex] = useState(indexg)
  const [id, setId] = useState(1);
  const [prix, setPrix] = useState(row.prix);
  const [qtt, setQtt] = useState(parseInt(row.quantite)-parseInt(row.vendu));
  const [titre, setTitre] = useState(row.titre);
  const [sup, setSup] = useState(0);

  const handleDelet = (e)=>{
    setSup(1);
    let id = e.target.id;
    let data = new FormData();
    data.append("id", id);
    axios.post(path("index.php?page=removePost/"), data)
    .then(res=>{
      setTimeout(()=>{setSup(0),100});
    })
    .catch(err=>{console.log(err)}); 
  }

  const updatePrix = (e)=>{
    const value = e.target.value;
    setPrix(value);
    let data = new FormData();
    data.append("prix", value);
    data.append("id", row.id);
    axios.post(path("index.php?page=updatePrixA/"), data).then(res=>{console.log(res.data)}).catch(err=>{console.log(err)});
  
  }

  const updateQtt = (e)=>{
    const value = e.target.value;
    setQtt(value);
    let data = new FormData();
    data.append("qtt", value);
    data.append("id", row.id);
    axios.post(path("index.php?page=updateQttA/"), data).then(res=>{console.log(res.data)}).catch(err=>{console.log(err)});
  
  }
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <img className="img-panier" src={"http://localhost/dc/public/img/"+row.apercu} alt={titre} />{titre}
      </TableCell>
      <TableCell component="th" scope="row">
        <TextField type="number" onChange={updateQtt} value={qtt} label="quantié" />
      </TableCell>
      <TableCell component="th" scope="row">
        <TextField type="number" onChange={updatePrix} value={prix} label="prix" />
      </TableCell>
      <TableCell align="right">
        {sup==0 ?
        <Button id={row.id} onClick={handleDelet}>X</Button>
        :
        <LoadingButton loading>supression</LoadingButton>
        }
      </TableCell>
    </TableRow>
  );
}
