import {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {Card, Stack, Link, Container, Typography, TextFiel, Button, TextField, CardHeader} from '@material-ui/core';
// layouts
import axios from 'axios'
import settings from "../_mocks_/settings"
import Loading from "../utils/Loading"
import Page from "../components/Page"
// ----------------------------------------------------------------------

export default function Register() {
  const [nom, setNom] = useState("");
  const [nome, setNome] = useState(0)
  const [prenom, setPrenom] = useState("");
  const [prenome, setPrenome] = useState(0)
  const [email, setEmail] = useState("");
  const [emaile, setEmaile] = useState(0);
  const [password, setPassword] = useState("");
  const [passworde, setPassworde] = useState(0);
  const [passwordre, setPasswordre] = useState("");
  const [passwordree, setPasswordree] = useState(0);
  const [success, setSuccess] = useState(0)
  const [load, setLoad] = useState(0)
  const set = new settings()
  const [appName, setAppName] = useState(set.init().APP_NAME)

  const handleNom = function(e){
    const nomp = e.target.value;
    setNom(nomp);

    if(nomp.length >= 3){
      setNome(0)
    }else{
      setNome(1)
    }
  }

  const handlePrenom = function(e){
    const prenomp = e.target.value;
    setPrenom(prenomp);

    if(prenomp.length >= 3){
      setPrenome(0)
    }else{
      setPrenome(1)
    }
  }

  const handleEmail = function(e){
    const emailp = e.target.value;
    setEmail(emailp);

    if(emailp.length >= 5){
       setEmaile(0)
    }else{
      setEmaile(1)
    }
  }

  const handlePassword = function(e){
    const passworp = e.target.value;
    setPassword(passworp);

    if(passworp.length >= 8){
      setPassworde(0)
    }else{
      setPassworde(1)
    }
  }

  const handlePasswordre = function(e){
    const passwordrep = e.target.value;
    setPasswordre(passwordrep);

    if(password === passwordrep){
      setPasswordree(0)
    }else{
      setPasswordree(1)
    }
  }

  setTimeout(function(){
   setLoad(1)
  },2000)

  setTimeout(function(){
    setAppName(set.init().APP_NAME)
  },1000)

  const handleSubmit = async(e)=>{
      e.preventDefault()
      console.log(e)

      if(nom.length < 3){
        setNome(1)
      }

      if(prenom.length < 3){
        setPrenome(1)
      }

      if(email.length < 7){
        setEmaile(1)
      }

      if(password.length < 8){
        setPassworde(1)
      }

      if(password === passwordre){
        setPasswordree(0)
      }else{
        setPasswordree(1)
      }

      if((nome+prenome+emaile+passworde+passwordree)<1 && nom.length >= 3 && prenom.length >= 3 && email.length >= 7 && password.length >= 8 && password === passwordre){

          const dataf = new FormData()
          dataf.append('name',nom)
          dataf.append('username',prenom)
          dataf.append('email',email)
          dataf.append('password',password)
          dataf.append('tel',"")
          dataf.append('pseudo',"")
          await axios.post(`${set.init().APP_URL}?page=setUser`,dataf)
          .then(res => {
            const data = res.data;
            if (parseInt(data.code) === 0){
              setEmaile(1)
            }else{
              setNom("")
              setPrenom("")
              setEmail("")
              setPassword("")
              setPasswordre("")
              setSuccess(1)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }

  }

  return (
    <Page title={`Creer un compte ${set.init().APP_NAME}`}>
      <Container maxWidth="sm">
        {load == 0?
        <div>
          <Loading />
        </div>
        :  
        <div>
        {success == 0 ?
        <div>
          <Typography variant="h5">
            s'inscrire à <span>{appName}</span>
          </Typography>
          <br />
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                type="text"
                label="Nom"
                value = {nom}
                onChange = {handleNom}
                error = {nome}
              />

              <TextField
                fullWidth
                type="text"
                label="Prénom"
                value={prenom}
                onChange = {handlePrenom}
                error = {prenome}
              />

              <TextField
                fullWidth
                type="email"
                label="email"
                value = {email}
                onChange = {handleEmail}
                error = {emaile}
              />

              <TextField
                fullWidth
                type="password"
                label="Mot de passe"
                value={password}
                onChange = {handlePassword}
                error = {passworde}
              />

              <TextField
                fullWidth
                type="password"
                label="Confirmer le Mot de passe"
                value={passwordre}
                onChange = {handlePasswordre}
                error = {passwordree}
              />

            <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">Se connecter</Link>

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              s'inscrire
            </Button>
          </Stack>
        </form>  
        </div>
        :
        <Card>
            <Typography variant="h4">Inscription reussis</Typography>
        </Card>
      }
       </div>
      }
      </Container>
    </Page>
  );
}
