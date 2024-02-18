import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {login,authenticate} from '../Utils/requests.ts'
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [errorMsg,setErrorMsg] = useState("")
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const token = data.get('privateToken') as String
        if(token){
            let result = login(token)
            result.then((d)=>{
                navigate("/dashboard",{state:d.data});
                
            }).catch((err)=>{
                console.log(err)
                setErrorMsg("Please check the credentials")
            })
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="privateToken"
                label="Private Token"
                name="privateToken"
                autoFocus
                />

                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
                
                <Grid item>
                    <Link target='tab' href="https://www.eventbrite.com/" variant="body2">
                    {"Don't have an private code? get here"}
                    </Link>
                </Grid>
                <Grid item>
                    <Link>
                    {errorMsg}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
    );
}