import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';

import '../styles/History.css'

export default function History() {

    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([])

    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {}
        }

        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }

    return (
        <div className="zoom-container">

            {/* Header */}
            <div className="zoom-header">
                <IconButton
                    className="zoom-home-btn"
                    onClick={() => routeTo("/home")}
                >
                    <HomeIcon />
                </IconButton>

                <h2 className="zoom-title">Meeting History</h2>
            </div>

            {/* Cards */}
            <div className="zoom-grid">
                {
                    (meetings.length !== 0) ? meetings.map((e, i) => {
                        return (
                            <Card key={i} className="zoom-card">

                                <CardContent>
                                    <div className="zoom-code">
                                        {e.meetingCode}
                                    </div>

                                    <div className="zoom-date">
                                        {formatDate(e.date)}
                                    </div>
                                </CardContent>

                            </Card>
                        )
                    }) : (
                        <div className="zoom-empty">
                            No meetings yet 😕
                        </div>
                    )
                }
            </div>

        </div>
    )
}