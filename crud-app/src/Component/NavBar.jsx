
import { AppBar, Toolbar, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
// Constants
const Header = styled(AppBar)`
    background: #111111;
`
const Tabs = styled(NavLink)`
    color: #FFFFFF;
    margin-right: 20px;
    text-decoration: none;
    font-size: 20px;
    display: flex;
    justify-content: space-around;
`;
// Component
const NavBar = () => {
    return (
        <Header position="static">
            <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Tabs to="./" exact>Home</Tabs>
                <Tabs to="/register" exact>Register</Tabs>
                <Tabs to="/login" exact>Log In</Tabs>
            </Toolbar>
        </Header>
    )
}
export default NavBar;