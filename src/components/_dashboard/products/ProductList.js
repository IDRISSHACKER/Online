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
import RowList from './rowList';
// axios
import axios from 'axios';
// utils
import {fFcfa, fCurrency} from './../../../utils/formatNumber';
import Loading from './../../../utils/Loading';
import path from './../../../utils/path';

export default function ProductList() {
  const [list, setList] = useState([]);
  const [id, setId] = useState(1);
  const [total, setTotal] = useState();
  const [load, setLoad] = useState(1);

  const api = axios.create({
    baseURL: path(`index.php?page=getAllPosts/`)
  });

  const sum = (table)=>{
    let somme = 0;
    table.forEach((element)=>{
      somme += parseInt(element.prix) * parseInt(element.qtt);
    });
    return somme;   
  }

  useEffect(()=>{
    setTotal(sum(list));
    setId(parseInt(localStorage.getItem("status")) === 2 ? JSON.parse(localStorage.getItem("user")).id : 1);
   // console.log(id);
  });

  useEffect(()=>{
    api.get("/").then(res=>{
      setList(res.data);
      setTimeout(()=>{
        setLoad(0);
      },500)
    });
  });

  const handleDelet = (e)=>{
    let id = e.target.id;
    let data = new FormData();
    data.append("id", id);
    axios.post(path("index.php?page=removePanier/"), data)
    .then(res=>{})
    .catch(err=>{console.log(err)}); 
  }

  return (
    <>
    {load===1 ? 
      <Loading />
      :
    <Card>
    <CardContent>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom du produit</TableCell>
            <TableCell>En stock</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell align="right">Supprimer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row, index) => (
            <RowList rowg={row} indexg={index} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
    </Card>
    }
    </>
  );
}
