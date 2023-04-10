import { Container, FormControl, Input, InputLabel, Typography } from '@mui/material'
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'

import React, { useEffect, useState} from 'react'
import { useNavigate, unstable_HistoryRouter, Link } from 'react-router-dom';
import { deleteUser, userPage } from '../Service/api';
import {json, useHistory}  from 'react-router';
// //context 
// const MyContext = React.createContext();

function Login() {
    const [ruser, setRuser] = useState(false)
    const initialValue = {
        email: '',
        phone: '',
    }
    const [user, setUser] = useState(initialValue);
    const {email, phone} = user;
    
    let navigate = useNavigate();

    // logged user
    const [loggedUser, setLoggedUser] = useState('');
    //email validation
    function isEmail(str) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);
        }
        const[k, setK] = useState(-1)

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    useEffect(() => {
        setK(k)
      }, []);
    const loginDetails = async() => {
        if(!email || !phone){
            window.alert("Fill All Details");
        }
        else if(!isEmail(email)){
            window.alert("Invalid Email");
        }
        else if(phone.length !== 10){
            window.alert("Invalid phone.");
        }
        else{
            try {
                console.log(email);
                const response = await userPage(email);
                const data = response.data;
                const user = oneUser(email, data)
                let newObj = Object.entries(user).reduce((acc, [key, value]) => {
                    if (value !== undefined) {
                      acc[key] = value;
                      console.log(key)
                      
                      setK(key)
                    }
                    return acc;
                  }, {});
                  
                  console.log(newObj);
                  if(k == -1){
                    window.alert("Login Credential are incorrect")
                  }
                  const rUser = newObj[`${k}`];
                  setRuser(rUser);
                  
            } catch (error) {
                window.alert(error)
            }
        }
    }
    // getting one user from all
    const oneUser = (email, response) => {
        return response.map((user) => {
            if(user.email === email){
                return user;
            } 
        })
    }
    //deleting user
    const deleteUserData = async (id) => {
        await deleteUser(id);
        window.alert("User Deleted Successfully.")
        navigate('/')
        // getAllUsers();
    }

  return (
    <div>
        {
            (!ruser)?
            <div>
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
                <Button variant="contained"  color="primary" onClick={() => loginDetails()} >Log In</Button>
            </FormControl>
        </Container>
    </div>
            </div>:
            <div>
                {JSON.stringify(ruser)}
                <>
        <h1 style={{textAlign: 'center'}} >Now You are Logged In</h1>
        <p style={{textAlign: 'center'}}>You can Update and delete data.</p>
        <Table>
            <TableHead>
                <TableHead>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Pincode</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell></TableCell>
                </TableHead>
            </TableHead>
            <TableBody>
                   <TableRow key={ruser.id}>
                        <TableCell></TableCell> 
                        <TableCell>{ruser.name}</TableCell>
                        <TableCell>{ruser.pincode}</TableCell>
                        <TableCell>{ruser.email}</TableCell>
                        <TableCell>{ruser.phone}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${ruser._id}`}>Edit</Button> 
                            <Button color="secondary" variant="contained" onClick={() => deleteUserData(ruser._id)}>Delete</Button> 
                        </TableCell>
                    </TableRow>
                    <p>{}</p>
            </TableBody>
        </Table>
        </>
            </div>
        }
    </div>
    
  )
}

export default Login;