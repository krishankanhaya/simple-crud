import AllUsers from './Component/AllUsers';
import AddUser from './Component/AddUser';
import EditUser from './Component/EditUser';
import NavBar from './Component/NavBar';
import NotFound from './Component/NotFound'; 
import Home from './Component/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import UserPage from './Component/UserPage';

function App() {
  return (
    <BrowserRouter >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/:email" element={<AllUsers /> } />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        {/* <Route path="/login/:email" element={<AllUsers />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/email" element={<UserPage />} /> 
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
