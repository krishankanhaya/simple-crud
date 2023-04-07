import { Button, Container, FormControl, Input, InputLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userPage } from '../Service/api';

function Login() {
    const initialValue = {
        email: '',
        phone: '',
    }
    const [user, setUser] = useState(initialValue);
    const {email, phone} = user;
    
    let navigate = useNavigate();
    //email validation
    function isEmail(str) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);
        }

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    const loginDetails = async() => {
        if(!email || !phone){
            window.alert("Fill All Details");
        }
        else if(!isEmail(email)){
            window.alert("Invalide Email");
        }
        else if(phone.length !== 10){
            window.alert("Invalide phone");
        }
        else{
            try {
                const response = await userPage(email);
                console.log(response.data);
                // navigate('/userpage', { state: response.data });
            } catch (error) {
                console.log(error);
            }
        }
    }
    
  return (
    <div style={{marginLeft: '45%', marginTop: '10%'}}>
        <Container>
            <Typography variant="h4">Log In</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input"/>
            </FormControl><br></br>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
            </FormControl><br></br>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => loginDetails()}>Log In</Button>
            </FormControl>
        </Container>
    </div>
  )
}

export default Login