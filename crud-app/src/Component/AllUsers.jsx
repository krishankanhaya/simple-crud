import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'
import { deleteUser, getUsersD } from '../Service/api';
import { Link } from 'react-router-dom';

// Constants
const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;
const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #fff;
        color: #000;
    }
`;
const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;
// Components
const AllUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers();
    }, []);
    const deleteUserData = async (id) => {
        await deleteUser(id);
        getAllUsers();
    }
    const getAllUsers = async (email) => {
        let response = await getUsersD(email);
        setUsers(response.data);

    }
    return (
        <>
            <h1 style={{ textAlign: 'center' }} >Now You are Logged In</h1>
            <p style={{ textAlign: 'center' }}>You can Update and delete data.</p>
            <StyledTable>
                <TableHead>
                    <THead>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Pincode</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell></TableCell>
                    </THead>
                </TableHead>
                <TableBody>
                    <TRow key={users.id}>
                        <TableCell></TableCell>
                        <TableCell>{users.name}</TableCell>
                        <TableCell>{users.pincode}</TableCell>
                        <TableCell>{users.email}</TableCell>
                        <TableCell>{users.phone}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{ marginRight: 10 }} component={Link} to={`/edit/${users._id}`}>Edit</Button>
                            <Button color="secondary" variant="contained" onClick={() => deleteUserData(users._id)}>Delete</Button>
                        </TableCell>
                    </TRow>
                </TableBody>
            </StyledTable>
        </>
    )
}

export default AllUsers;