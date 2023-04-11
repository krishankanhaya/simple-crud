import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { addUser } from '../Service/api';

// Constants
const initialValue = {
    name: '',
    pincode: '',
    email: '',
    phone: '',
    image: ''
}
const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;
const AddUser = () => {
    const [user, setUser] = useState(initialValue);
    const { name, pincode, email, phone,image } = user;

    const onValueChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }
    // fucction to check  email is valid or Not
    function isEmail(str) {
    var pattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);
    }
    const addUserDetails = async() => {
        if(name && email && phone && pincode){
        if(name.length <= 3 ){
            window.alert("Name should be 4 or More character long.")
        }
        else if(!isEmail(email)){
            window.alert("Enter Email Correctly.")
        }
        else if(phone.length !== 10){
            window.alert("Phone number must have 10 digits.")
        }
        else if(pincode.length !== 6){
            window.alert("Pincode must have 6 digits.")
        }
        else{
            try{
                const signInSuccessful = await addUser(user);
                setUser(initialValue)
                    if(signInSuccessful){
                        window.alert(`Registration Successfull. Name : ${user.name} and Email : ${user.email}`);
                    }
                }
            catch(error){
              if(error.response.status === 409){
                window.alert('User with the given email address is already exist.')
              }
            }
        }
    }else{
        window.alert("You Have to fill all details.")
    }
        }
    return (
        <Container>
            <Typography style={{textAlign: 'center'}} variant="h4">Registration</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input type={`text`} onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" required />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input  type={`email`}  onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input  type={`tel`}   onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Pincode</InputLabel>
                <Input  type={`email`}  onChange={(e) => onValueChange(e)} name='pincode' value={pincode} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Image</InputLabel>
                <Input type='file' onChange={(e) => onValueChange(e)} name='image' value={image} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add User</Button>
            </FormControl>
        </Container>
    )
}
export default AddUser;