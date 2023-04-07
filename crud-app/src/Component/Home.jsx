

import { Box, Typography, styled } from '@mui/material';


const Header = styled(Box)`
    margin: 50px;
    & > div {
        margin-top: 50px;
    }
`;



const Home = () => {

    return (
        <Header>
            <Typography variant="h4">This is Home Page</Typography>
        </Header>
    )
}

export default Home;