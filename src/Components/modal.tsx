import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CustomizedForm from './form.tsx';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography } from '@mui/material';
import { deleteEvent } from '../Utils/requests.ts';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign:'center'
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    props.setOpenModal(false)
    return setOpen(false)
  };

  React.useEffect(() => {

    if (props.open) {
      handleOpen()
    }
    else {
      handleClose()
    }

  }, [props.open])

  const confirmDelete = () =>{
    console.log(props.selectedEvent)
    deleteEvent(props.selectedEvent).then(() => {
      handleClose()
      props.fetchEvents()
    })
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Typography variant="h4" gutterBottom>
            {props.selectedEvent.name ? "Update Event" : "Create Event"}
          </Typography>
          <div style={{ float: 'right' }}>{props.selectedEvent.name && <DeleteIcon onClick={confirmDelete}></DeleteIcon>}</div>
          <CustomizedForm selectedEvent={props.selectedEvent} fetchEvents={props.fetchEvents} open={handleOpen} close={handleClose}></CustomizedForm>
        </Box>
      </Modal>
    </div>
  );
}