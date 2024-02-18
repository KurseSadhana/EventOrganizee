import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { addEvents, updateEvent } from '../Utils/requests.ts';

const ValidationTextField = styled(TextField)({
  '& input:valid + fieldset': {
    borderColor: '#E0E3E7',
    borderWidth: 1,
  },
  '& input:invalid + fieldset': {
    borderColor: 'red',
    borderWidth: 1,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 4,
    padding: '4px !important', // override inline-style
  },
});

export default function CustomizedForm(props) {
  const [formData, setFormData] = useState({
    eventName: props.selectedEvent?.name?.html || '',
    eventDetails: props.selectedEvent?.description?.html || '',
    start: {
      timezone: "America/Los_Angeles",
      utc: props.selectedEvent?.start?.utc ? dayjs(props.selectedEvent.start.utc) : null
    },
    end: {
      timezone: "America/Los_Angeles",
      utc: props.selectedEvent?.end?.utc ? dayjs(props.selectedEvent.end.utc) : null
    },
    currency: 'USD'
  });

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name.length) {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = (event) => {
    let convertedFormat = {
      event: {
        name: {
          html: formData.eventName
        },
        description: {
          html: formData.eventDetails
        },
        start: {
          ...formData.start,
          utc: formData.start.utc?.toISOString().split('.')[0]+"Z" 
        },
        end: {
          ...formData.end,
          utc: formData.end.utc?.toISOString().split('.')[0]+"Z" 
        },
        currency: formData.currency
      }
    }

    if(props.selectedEvent.name){
      updateEvent({id:props.selectedEvent.id,...convertedFormat} ).then(() => {
        props.close()
        props.fetchEvents()
      })
    }
    else{
      addEvents(convertedFormat).then(() => {
        props.close()
        props.fetchEvents()
      })
      
    }
    
  }

  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: 'grid',
        gap: 2,
      }}
    >
      <FormControl variant="standard" onChange={handleChange}>
        <ValidationTextField defaultValue={formData.eventName} name="eventName" required id="eventName" label="Event Name">
          Event Name
        </ValidationTextField>

        <ValidationTextField
          id="eventDetails"
          label="Event Details"
          required
          placeholder="Event Details"
          multiline
          name="eventDetails"
          defaultValue={formData.eventDetails}
        />
        <ValidationTextField
          label="Currency"
          name="currency"
          value={formData.currency}
          id="currency"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={[
              'DateTimePicker'
            ]}
          >
            <DemoItem
            >
              <DateTimePicker value={formData.start.utc} onChange={(newValue) => {
                let from = dayjs(newValue)
                setFormData({
                  ...formData,
                  start: {
                    ...formData.start,
                    utc: from
                  }
                })
              }} />
              <DateTimePicker value={formData.end.utc} onChange={(newValue) => {
                let end = dayjs(newValue)
                setFormData({
                  ...formData,
                  end: {
                    ...formData.end,
                    utc: end
                  }
                });
              }} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <Button type="submit" onClick={(e) => { e.preventDefault(); handleSubmit(e) }} size="small">Submit</Button>
      </FormControl>
    </Box>
  );
}