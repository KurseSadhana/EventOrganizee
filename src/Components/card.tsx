import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const CustomCard = (props) => {
    const { data } = props
    return (
        <div onClick={props.onClick}>
            <CardContent >
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {data.description.text}
                </Typography>
                <Typography variant="h5" component="div">
                    {data.name.text}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {data.currency}
                </Typography>
                <Typography variant="body2">
                    {data.start.timezone}
                    <br />
                    {data.start.local}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </div>
    )
};

export default function OutlinedCard(props) {
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined"><CustomCard onClick={props.onClick} data={props.data}></CustomCard></Card>
        </Box>
    );
}
