import { Box, Typography, styled } from '@mui/material';
// Constants
const Header = styled(Box)`
    margin: 50px;
    & > div {
        margin-top: 50px;
    }
`;
// Components
const Home = () => {

    return (
        <Header style={{textAlign: 'center'}}>
            <Typography variant="h4">This is Home Page</Typography>
        </Header>
    )
}
export default Home;