import { AppBar, Toolbar, Box, Typography, Container    } from '@mui/material';
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
import { useContext } from 'react';
import { TokenContext } from '../context/TokenContext';

export const Header = () => {

  const {token, setToken} = useContext(TokenContext)

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setToken(null);
  };

  return (
    <AppBar position='static' sx={{ width:"100%" }}>
      <Container>
        <Toolbar sx={{ m:"0px", p:"0px", display:"flex", justifyContent:"space-between", flexDirection:{xs:"column", sm:"row", md:"row", lg:"row",  } }} disableGutters>
          <Link to="/">
            <img src={logo} alt="" height={50} />
          </Link>
          <Box sx={{ display:"flex", gap:"20px" }}>
            <Link to="/" style={{ textDecoration:"none" }}>
              <Typography color="secondary">Blog</Typography>
            </Link>
            <Link to="/contact" style={{ textDecoration:"none" }}>
              <Typography color="secondary">Contact</Typography>
            </Link>
            {token ? (
              <>
                <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                  <Typography color='secondary'>Dashboard</Typography>
                </Link>
                <Link onClick={handleLogout} style={{ textDecoration: 'none' }}>
                  <Typography color='secondary'>Logout</Typography>
                </Link>
              </>
            ) : (
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <Typography color='secondary'>Login</Typography>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
