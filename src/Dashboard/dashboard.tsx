import React from 'react'
import ResponsiveAppBar from '../Components/header.tsx'
import { NavigateOptions, useLocation } from 'react-router-dom'


const Dashboard = () => {
    const location = useLocation();
    const userDetails = location.state
    return (
        <ResponsiveAppBar userDetails={userDetails} />
    )
}

export default Dashboard;