import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers, editUser } from '../Service/api';

// Constants
const initialValue = {
    name: '',
    pincode: '',
    email: '',
    phone: ''
}
const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;
const EditUser = () => {
    const [user, setUser] = useState(initialValue);
    const { name, pincode, email, phone } = user;
    const { id } = useParams();
    let navigate = useNavigate();
    useEffect(() => {
        const getUser = async () => {
            const response = await getUsers(id);
            setUser(response.data);
        };
        getUser();
    }, [id]);
    const editUserDetails = async () => {
        await editUser(id, user);
        window.alert("Your Data is Updated Successfully.");
        navigate("/");
    }
    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <Container injectFirst>
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="name-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="name-input" aria-describedby="name-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="pincode-input">Pincode</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='pincode' value={pincode} id="pincode-input" aria-describedby="pincode-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="email-input" aria-describedby="email-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="phone-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="phone-input" aria-describedby="phone-helper-text" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" type="button" onClick={() => editUserDetails()}>Edit User</Button>
            </FormControl>
        </Container>
    )
}
export default EditUser;
