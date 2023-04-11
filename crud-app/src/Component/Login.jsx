// Essential Imports
import { Container, FormControl, Input, InputLabel, Typography,Table, TableHead, TableCell, TableRow, TableBody, Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { deleteUser, userPage } from '../Service/api';

// Component
function Login() {
    // All constants
    const initialValue = {
        email: '',
        phone: '',
    }
    let count = 0;
    // User Details
    const [user, setUser] = useState(initialValue);
    const { email, phone } = user;
    const [k, setK] = useState(-1);
    // login status
    const [lst, setLSt] = useState(false)
    const [ruser, setRuser] = useState(false)
    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    // All Utilities
    let navigate = useNavigate();
    function isEmail(str) {
        //regular expression email validation
        var pattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str);
    }
    // getting one user from all
    const oneUser = (email, response) => {
        return response.map((user) => {
            if (user.email === email) {
                return user;
            }else{
                return undefined;
            }
        })
    }
    //deleting user from database
    const deleteUserData = async (id) => {
        const cnf = window.confirm("Are you sure want delete your account.")
        if (cnf) {
            await deleteUser(id);
            window.alert("Your account deleted successfully.");
            navigate('/');

        }
    }
    // Login Handlers
    const loginDetails = async () => {
        if (!email || !phone) {
            window.alert("Fill All Details");
        }
        else if (!isEmail(email)) {
            window.alert("Invalid Email");
        }
        else if (phone.length !== 10) {
            window.alert("Invalid phone.");
        }
        else {
            try {
                console.log(email);
                const response = await userPage(email);
                const data = response.data;
                const user = oneUser(email, data)
                let newObj = Object.entries(user).reduce((acc, [key, value]) => {
                    if (value !== undefined) {
                        acc[key] = value;
                        console.log(k)
                        setK(key)
                        count++;
                    }
                    return acc;
                }, {});
                const rUser = newObj[`${k}`];
                setRuser(rUser);
                if (k === -1 && !lst) {
                    window.alert(`Email: ${email} And Mobile: ${phone}`);
                    setLSt(true)
                    document.getElementById('login-btn').click();
                } else {
                    if(count>=1){
                        window.alert("You are logged in successfully.");
                    }else{
                        window.alert("User with this given email is not found.");
                    }
                }
            } catch (error) {
                window.alert(error);
            }
        }
    }
    return (
        <div>
            {
                (!ruser) ?
                    <>
                        <div style={{ marginLeft: '45%', marginTop: '0%' }}>
                            <Container style={{ marginLeft: '-5%', marginTop: '10%' }}>
                                <Typography style={{ marginLeft: '5%'}} variant="h4">Log In</Typography>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Email</InputLabel>
                                    <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" />
                                </FormControl><br></br>
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Phone</InputLabel>
                                    <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
                                </FormControl><br></br>
                                <FormControl>
                                    <Button style={{ marginLeft: '10%', marginTop: '10%', width: '10rem' }} id='login-btn' variant="contained" color="primary" onClick={() => loginDetails()} >Log In</Button>
                                </FormControl>
                            </Container>
                        </div>
                    </> :
                    <div>
                        <>
                            <h1 style={{ textAlign: 'center' }} >Now You are Logged In</h1>
                            <p style={{ textAlign: 'center' }}>You can Update and delete data.</p>
                            <Table>
                                <TableHead>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Pincode</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell></TableCell>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={ruser.id}>
                                        <TableCell>{ruser._id}</TableCell>
                                        <TableCell>{ruser.name}</TableCell>
                                        <TableCell>{ruser.pincode}</TableCell>
                                        <TableCell>{ruser.email}</TableCell>
                                        <TableCell>{ruser.phone}</TableCell>
                                        <TableCell>
                                            <Button color="primary" variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edit/${ruser._id}`}>Edit</Button>
                                            <Button color="secondary" variant="contained" onClick={() => deleteUserData(ruser._id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </>
                    </div>
            }
        </div>

    )
}

export default Login;