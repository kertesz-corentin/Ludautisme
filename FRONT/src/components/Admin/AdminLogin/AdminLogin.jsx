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
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router';
import api from '../../../requests/index';
import RecoverPasswordModal from '../../Front-Office/User/RecoverPasswordModal/RecoverPasswordModal';
import { Fab } from '@mui/material';
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './adminlogin.scss';

const theme = createTheme();
export default function SignIn() {
    const navigate = useNavigate();

    const [recover, setRecover] = useState(true);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        try {
            const response = await api.login(email, password);

            if (response.status === 200) {
                navigate('/admin/home');
            } else {
                toast.error(`email ou mot de passe incorrect`);
            }
            return response
        }
        catch (err) {
            toast.error(err.response.data.message);
        }
    }

    const handleRecover = () => {
        setRecover(!recover);
    }

    return (

        <><div className="admin-login">
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
                        <Avatar
                            sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <SupervisorAccountIcon />
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
                                label="Adresse email"
                                name="email"
                                autoComplete="email"
                                autoFocus />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password" />
                            {/* Ici voir pour rendre disablle le bouton se connecter si les deux input ne sont pas remplies */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className="admin-login-submit"
                                sx={{ mt: 1, mb: 2 }}
                            >
                                Se connecter
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    <Button variant="outlined" onClick={handleRecover}>
                                        Mot de Passe oublié
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            <>
                {!recover && (
                    <RecoverPasswordModal />
                )}
            </>
        </div>
            <div className='help'>
                <Fab color="primary" aria-label="help" href="https://docs.google.com/document/d/1azHxxaSMG5iP1BnD2iVOMvsVlJFNHLw1SFzD0LNVbio/edit?usp=sharing" target='_blank' size='small'>
                    <QuestionMarkOutlinedIcon color='' />
                </Fab>
            </div></>
    );
}


