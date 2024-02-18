import React, { useEffect, useState } from 'react'
import ResponsiveAppBar from '../Components/header.tsx'
import { useLocation } from 'react-router-dom'
import OutlinedCard from '../Components/card.tsx'
import { Container, Grid } from '@mui/material'
import { getEvents } from '../Utils/requests.ts'
import BasicModal from '../Components/modal.tsx'

const Dashboard = () => {
    const location = useLocation();
    const userDetails = location.state
    const [eventList,setEventList] = useState([])
    const [openModal,setOpenModal] = useState(false)
    const [selectedPage,setSelectedPage] = useState("")
    const [selectedEvent,setSelectedEvent] = useState({})

    
    useEffect(()=>{
        if(userDetails){
            fetchEvents()
        }
    },[userDetails])
    useEffect(()=>{
        if(!openModal){
            setSelectedPage("")
        }
        
    },[openModal])


    useEffect(()=>{
        if(selectedPage === "Create Event"){
            setOpenModal(true)
            setSelectedEvent({})
        }
        else{
            setOpenModal(false)
            getEvents().then(d=>{
                setEventList(d.data.events)
            })
            setSelectedPage("")
        }
    },[selectedPage])


    const fetchEvents = () =>{
        getEvents().then(d=>{
            setEventList(d.data.events)
        })
    }

    const cardClicked = (el) => {
        setSelectedEvent(el)
        setOpenModal(true)
    }
    return (
        <div>
            <ResponsiveAppBar setSelectedPage={setSelectedPage} userDetails={userDetails} />
            <Container fixed>
            <Grid container spacing={4}>
            {
                eventList.map(el=>{
                   return <Grid item><OutlinedCard data={el} onClick={()=>{cardClicked(el)}}></OutlinedCard></Grid>
                })
            }
            </Grid>
            </Container>
            <BasicModal selectedEvent={selectedEvent} fetchEvents={fetchEvents} open={openModal} setOpenModal={setOpenModal}></BasicModal>
        </div>
        
    )
}

export default Dashboard;