import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllUsers from './Component/AllUsers';
import AddUser from './Component/AddUser';
import EditUser from './Component/EditUser';
import NavBar from './Component/NavBar';
import NotFound from './Component/NotFound'; 
import Home from './Component/Home';
import Login from './Component/Login';

function App() {
  return (
    <BrowserRouter >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/:email" element={<AllUsers /> } />
        <Route path="/register" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />\
        <Route path="/login" element={<Login />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
