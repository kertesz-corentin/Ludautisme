import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import './adminloginnew.scss';
import { Grid,Link } from '@mui/material';


const theme = createTheme();
 export default function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const onToggleOpen = () => {
      setIsOpen(!isOpen)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('e-mail'),
      password: data.get('password'),
    });
  };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
    setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


  return (

    <div className="loginuser">


            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <SupervisorAccountIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Se connecter
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adresse e-mail"
                        name="e-mail"
                        autoComplete="email"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        />
                {/* Ici voir pour rendre disablle le bouton se connecter si les deux input ne sont pas remplies */}
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                        >
                        Se connecter
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                Mot de passe oublié
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                    </Box>
                </Container>
            </ThemeProvider>
    </div>
  );
}


