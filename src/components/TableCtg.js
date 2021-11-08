import {React, useEffect, useState} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// axios
import axios from 'axios';

const api9 = axios.create({
  baseURL: `http://localhost/dc/index.php?page=getCtg/`
});

function createData(name, id) {
  return { name, id};
}

const rows = [];
let lCtg = [];

if(localStorage.getItem("Ctg")){
  lCtg = JSON.parse(localStorage.getItem("Ctg"))
}else {
  lCtg = [{id:1, title:"pc"}, {id:1, title:"pc"}];
}

lCtg.forEach((ctg, index)=>{
  rows.push(createData(ctg.title, ctg.id));
})

function handleDelet (e){
  let element = e.target.id;
  let fData = new FormData();
  fData.append("id", element);
  axios.post("http://localhost/dc/index.php?page=ctg_delete/", fData)
  .then(res =>{
    console.log(res.data);
  })
  .catch(err =>{
    console.log(err);
  });
}

export default function TableCtg() {
  const [Ctg, setCtg] = useState([]);

  useEffect(()=>{
     api9.get('/')
    .then(res => {
       setCtg(res.data);
    });
  });

  return (
    <Card>
    <CardContent>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom de la categorie</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Ctg.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">
                <Button id={row.id} onClick={handleDelet}>supprimer</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
    </Card>
  );
}
