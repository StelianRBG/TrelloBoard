import { CssBaseline, Button, Stack, Typography, IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Modal, Grid, Paper } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect } from "react"
import Ticket from './Ticket';
import TicketForm from './TicketForm';
import WorkspaceForm from './WorkspaceForm';

const Column = (props) => {
    // menue
    const [columnMenue, setColumnMenue] = useState(null)
    const [openWorkspaceForm, setOpenForm] = useState(false);
    const [oldName, setOldName] = useState("")
    const [formPurpose, setFormPurpose] = useState(null)

    const isOpenForm = Boolean(openWorkspaceForm);
    const isOpen = Boolean(columnMenue);
    const handleCloseWorkspaceForm = () => setOpenForm(false);
    const handleColumnMenue = (event) => {
        setColumnMenue(event.currentTarget);
    };
    const handleCloseColumnMenue = () => {
        setColumnMenue(null);
    };

    const editColumn = () => {
        setOpenForm(true)
        setFormPurpose("editColumn")
        setOldName(props.column["name"])
        handleCloseColumnMenue()
    }

    // form
    const [openTicketForm, setOpenTicketForm] = useState(false);
    const handleOpenTicketForm = () => {
        handleCloseColumnMenue()
        setOpenTicketForm(true);
    }
    const handleCloseTicketForm = () => setOpenTicketForm(false);

    const deleteColumn = () => {
        let workspaces = JSON.parse(localStorage.getItem('workspaces'))
        let currWorkspace = JSON.parse(localStorage.getItem('currentWorkspace'))
        let columnIndex = currWorkspace["columns"].findIndex(col => col.name === props.column["name"])
        workspaces[currWorkspace["name"]]["columns"].splice(columnIndex, 1)
        currWorkspace = workspaces[currWorkspace["name"]]
        props.setCurrentWorkspace(currWorkspace)
        props.setWorkspaces(workspaces)
        localStorage.setItem("currentWorkspace", JSON.stringify(currWorkspace));
        localStorage.setItem("workspaces", JSON.stringify(workspaces));

    }
    return (
        <>
            <CssBaseline />
            <Paper elevation={6} sx={{ border: 1, padding: "1%", backgroundColor: "#eeeeee"}}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6" color="textPrimary">{props.column["name"]}</Typography>
                    <IconButton 
                        id="column-button"
                        aria-controls={isOpen ? 'column-menue' : undefined}
                        aria-haspopup="true"
                        aria-expanded={isOpen ? 'true' : undefined}
                        onClick={handleColumnMenue}
                    >
                        <MoreVertIcon />
                    </IconButton> 
                    <Menu
                        id="column-menue"
                        anchorEl={columnMenue}
                        open={isOpen}
                        onClose={handleCloseColumnMenue}
                        aria-labelledby="column-button"
                    >
                        <MenuItem onClick={handleOpenTicketForm}>
                            <ListItemIcon>
                                <AddCircleIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText>Add ticket</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={editColumn}>
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Edit column</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={deleteColumn}>
                            <ListItemIcon>
                                <ArchiveIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Archive column</ListItemText>
                        </MenuItem>
                    </Menu>
                    <Modal
                        open={openTicketForm}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <TicketForm handleCloseTicketForm={handleCloseTicketForm} setCurrentWorkspace={props.setCurrentWorkspace} setWorkspaces={props.setWorkspaces} column={props.column}/>
                    </Modal>
                    <Modal
                        open={isOpenForm}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <WorkspaceForm handleCloseWorkspaceForm={handleCloseWorkspaceForm} setWorkspaces={props.setWorkspaces} setCurrentWorkspace={props.setCurrentWorkspace} formPurpose={formPurpose} workspaceName={props.currentWorkspace["name"]} oldName={oldName}/>
                    </Modal>
                </Stack>
                <hr/>
                <Grid container  direction="row" spacing={3} sx={{width: 350, maxHeight: "65vh", overflow: "auto", marginTop: "2%"}}>
                    {props.column["cards"].length != 0 ? 
                        props.column["cards"].map(card => <Ticket card={card} key={props.column["cards"].indexOf(card)} column={props.column} setCurrentWorkspace={props.setCurrentWorkspace} setWorkspaces={props.setWorkspaces}/>) 
                    : null}
                </Grid>
            </Paper>
        </>
    )
}

export default Column