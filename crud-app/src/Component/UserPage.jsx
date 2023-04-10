import React, { useEffect, useState } from 'react'
import { getUsersD } from '../Service/api';
import { useParams } from 'react-router-dom';

function UserPage() {
  const initialValue = {
    name: '',
    pincode: '',
    email: '',
    phone: ''
}
  const [user, setUser] = useState(initialValue);
  const { email } = useParams();

  useEffect(() => {
    loadUserDetails();
}, );
const loadUserDetails = async() => {
  const response = await getUsersD(email);
  setUser(response.data);
}
  return (
    <div>
    <p>userpage</p>
    </div>
  )
}





export default UserPage;