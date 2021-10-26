import {useState, useEffect} from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Stack, Link, Container, Typography, TextFiel, Button, TextField, CardHeader} from '@material-ui/core';
// layouts
import axios from 'axios'
import settings from "../_mocks_/settings"
import Loading from "../utils/Loading"
import Page from "../components/Page"
import { useDispatch } from 'react-redux';
import { getUser } from 'src/action/user.action';
// ----------------------------------------------------------------------

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [emaile, setEmaile] = useState(0);
  const [password, setPassword] = useState("");
  const [passworde, setPassworde] = useState(0);
  const [success, setSuccess] = useState(0)
  const [set, setSet] = useState(new settings())
  const [appName, setAppName] = useState(set.init().APP_NAME)
  const [appOnline, setOnline] = useState(set.init().connected)
  const [load, setLoad] = useState(0)

  const handleEmail = function(e){
    const emailp = e.target.value;
    
    setEmail(emailp);

    if(emailp.length >= 1){
       setEmaile(0)
    }else{
      setEmaile(1)
    }
  }

  const handlePassword = function(e){
    const passworp = e.target.value;
    setPassword(passworp);

    if(passworp.length >= 1){
      setPassworde(0)
    }else{
      setPassworde(1)
    }
  }

  setTimeout(function(){
    setAppName(set.init().APP_NAME)
    const status = parseInt(set.init().connected)

    if(status === 1){
      setSuccess(1)
    }


  },2000)

  setTimeout(function(){
    setLoad(1)
  },2000)
  
  const handleSubmit = function(e){
      e.preventDefault()

      if(password.length >= 1){
        setPassworde(0)
      }else{
        setPassworde(1)
      }

      if(email.length >= 1){
       setEmaile(0)
        }else{
          setEmaile(1)
      }
      

      if((emaile+passworde)<1 && email.length > 1 && password.length > 1){

          const dataf = new FormData()
          dataf.append('email',email)
          dataf.append('password',password)
          axios.post(`${set.init().APP_URL}?page=connexion`,dataf)
          .then(res => {
            const data = res.data;
            if(data === null){
              setEmaile(1)
              setPassworde(1)
            }
            if (data.code === 1 && data !== null){ 
 
              localStorage.setItem("id", data.data[0].id)
              dispatch(getUser(data.data[0].id))

              setEmail("")
              setPassword("")
              localStorage.setItem("connected",1)
              if(parseInt(data.data[0].role_id) === 1){
                localStorage.setItem("admin", 1)
              }


              setTimeout(()=>{
                window.location = "/store"
              },200)
            }else{
              setEmaile(1)
              setPassworde(1)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }

  }

  return (
    <Page title={`Se connecter à ${set.init().APP_NAME}`}>
      <Container maxWidth="sm">
      {load == 0?
        <div>
          <Loading />
        </div>
        :  
        <div>
        {success == 0?
          <div>
            <Typography variant="h5">
              se connecter à <span>{appName}</span>
            </Typography>
            <br />
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2}>

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
              <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">Creer un compte</Link>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Connexion
              </Button>
            </Stack>
          </form>  
          </div>
          :
          <Card>
              <Typography variant="h4">Connexion reussis</Typography>
              <Navigate to="/store" />
          </Card>
        }
        </div>
      }
      </Container>
    </Page>
  );
}
