import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from '../Components/header.tsx'
import { useLocation } from 'react-router-dom'
import OutlinedCard from '../Components/card.tsx'
import { Container, Grid } from '@mui/material'
import { getEvents } from '../Utils/requests.tsx'

const Dashboard = () => {
    const location = useLocation();
    const userDetails = location.state
    const [eventList,setEventList] = useState([])
    useEffect(()=>{
        if(userDetails){
            getEvents().then(d=>{
                setEventList(d.data.events)
            })
            
        }
    },[userDetails])
    return (
        <div>
            <ResponsiveAppBar userDetails={userDetails} />
            <Container fixed>
            <Grid container spacing={4}>
            {
                eventList.map(el=>{
                   return <Grid item><OutlinedCard data={el}></OutlinedCard></Grid>
                })
            }
            </Grid>
            </Container>
            
            
           
        </div>
        
    )
}

export default Dashboard;