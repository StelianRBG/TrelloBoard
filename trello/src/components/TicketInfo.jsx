import { Typography, CssBaseline, Button, Grid, Container, Paper, TextField, Stack, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from "react";

const TicketInfo = React.forwardRef((props, ref)=> {
    const [name, setName] = useState(props.card["name"])
    const [description, setDescription] =  useState(props.card["description"])

    const handleChangeName = (event) => {
        setName(event.target.value)
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const editTicket = () => {
        let workspaces = JSON.parse(localStorage.getItem('workspaces'))
        let currWorkspace = JSON.parse(localStorage.getItem('currentWorkspace'))
        let columnIndex = workspaces[currWorkspace["name"]]["columns"].findIndex(col => col.name === props.column["name"])
        let currTicketIndex = workspaces[currWorkspace["name"]]["columns"][columnIndex]["cards"].findIndex(ticket => ticket.name === props.card["name"])
        workspaces[currWorkspace["name"]]["columns"][columnIndex]["cards"][currTicketIndex]["name"] = name
        workspaces[currWorkspace["name"]]["columns"][columnIndex]["cards"][currTicketIndex]["description"] = description
        currWorkspace = workspaces[currWorkspace["name"]]
        props.setCurrentWorkspace(currWorkspace)
        props.setWorkspaces(workspaces)
        localStorage.setItem("currentWorkspace", JSON.stringify(currWorkspace));
        localStorage.setItem("workspaces", JSON.stringify(workspaces));

        props.handleCloseTicketInfo()
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" style={{marginTop: "10%"}}>
                <Paper elevation={12} style={{padding: "8%"}}>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                    >
                        <IconButton size="large" onClick={props.handleCloseTicketInfo}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </Stack>
                    <Grid container spacing={5} justifyContent="center">
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h4" color="textPrimary" align="center">Ticket information</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                fullWidth
                                label = "Ticket name"
                                value = {name}
                                onChange ={handleChangeName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                fullWidth
                                label = "Ticket create date"
                                value = {Date(props.card["datetime"])}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                fullWidth
                                label = "Ticket description"
                                value = {description}
                                onChange ={handleChangeDescription}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Button variant="contained" color="success" size="large" onClick={editTicket}>Edit</Button>
                                </Grid>  
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
})

export default TicketInfo