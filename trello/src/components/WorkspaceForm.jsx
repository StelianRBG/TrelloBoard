import { Typography, CssBaseline, Button, Grid, Container, Paper, TextField } from '@mui/material'
import { useState } from "react"
import Alerts from './Alerts'

const WorkspaceForm = (props) => {
    const [name, setName] = useState('')
    const [WorkspaceAlreadyExist, setWorkspaceAlreadyExist] = useState(null)
    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const addWorkspace = () => {
        let workspaces = JSON.parse(localStorage.getItem('workspaces'))
        if(!localStorage.getItem('workspaces')) {
            workspaces = {}
        }
        if(workspaces[name]){
            setWorkspaceAlreadyExist("The workspace already exists")
            return
        }
        workspaces[name] = {"name": name}
        
        props.setCurrentWorkspace(workspaces[name])
        props.setWorkspaces(workspaces)
        localStorage.setItem("currentWorkspace", JSON.stringify(workspaces[name]))
        localStorage.setItem("workspaces", JSON.stringify(workspaces))
        
        props.handleCloseWorkspaceForm()
    }

    return (
        <>
            <CssBaseline />
            <Container maxWidth="xs" style={{marginTop: "10%"}}>
                <Paper elevation={12} style={{padding: "10%"}}>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h4" color="textPrimary" align="center">Add Workspace</Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Alerts err = {WorkspaceAlreadyExist}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <TextField
                                fullWidth
                                label = "Workspace name"
                                value = {name}
                                onChange ={handleChangeName}
                                style = {{marginTop: "8%"}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Grid container justifyContent="center" style = {{marginTop: "8%"}}>
                                <Grid item>
                                    <Button variant="contained" color="success" size="large" onClick={addWorkspace}>Create</Button>
                                </Grid>  
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    );
}

export default WorkspaceForm