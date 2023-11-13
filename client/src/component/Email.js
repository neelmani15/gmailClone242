import React, { useEffect,useState } from 'react'
import { useOutletContext,useParams } from 'react-router-dom';
import { API_URLS } from '../services/apiUrl';
import useApi from '../hooks/useApi';
import { Box, Typography,Checkbox,List,ListItem } from '@mui/material';
import { DeleteOutline, Refresh,MoreVert, ArrowBackIos, ArrowForwardIos, Keyboard } from '@mui/icons-material';
import EmailData from './EmailData';
import NoMails from './NoMails';
import { EMPTY_TABS } from '../constants/constant';
import Emailtype from './Emailtype';


export default function Email() {
    const [starredEmail, setStarredEmail] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const {openDrawer} = useOutletContext();
    const {type} = useParams();
    const getEmailsService = useApi(API_URLS.getEmailFromType);
    const deleteEmailsService = useApi(API_URLS.deleteEmails);
    const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);
    useEffect(()=>{
        getEmailsService.call({},type);
    },[type,starredEmail]);

    const selectAllEmails = (e) => {
        if (e.target.checked) {
            const emails = getEmailsService?.response?.map(email => email._id);
            setSelectedEmails(emails);
        } else {
            setSelectedEmails([]);
        }
    }
    const deleteSelectedEmails = () => {
        if (type === 'bin') {
            deleteEmailsService.call(selectedEmails);
        } else {
            moveEmailsToBin.call(selectedEmails);
        }
        setStarredEmail(prevState => !prevState);
    }
  return (
    <div style={openDrawer ? {marginLeft:250,width:'calc(100%-250px)'}:{width:'100%'}}>
        <Box style={{padding:'10px 10px 0 10px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <Box style={{display:'flex',alignItems:'center'}}>
                <Checkbox size='small' onChange={(e) => selectAllEmails(e)} />
                <Refresh fontSize='small' style={{padding:'0 3px'}} />
                <DeleteOutline fontSize='small' style={{padding:'0 3px'}} onClick={(e) => deleteSelectedEmails(e)} />
                <MoreVert fontSize='small' style={{padding:'0 3px'}} />
            </Box>
            <Box style={{display:'flex',alignItems:'center',marginRight:15}}>
                <Typography style={{padding:'0 12px',fontSize:12}}>1-50 of 159</Typography>
                <ArrowBackIos fontSize='13px' style={{padding:'0 3px',color:'gray'}} />
                <ArrowForwardIos fontSize='13px' style={{padding:'0 3px'}} />
                <Keyboard fontSize='15px' style={{padding:'0 3px'}} />
            </Box>
        </Box>
        <Emailtype />
        <List>
            {
                getEmailsService?.response?.map(email=>(
                    <EmailData 
                        key={email._id}
                        email={email}
                        setStarredEmail={setStarredEmail}
                        selectedEmails={selectedEmails}
                        setSelectedEmails={setSelectedEmails}
                    />
                ))
            }
        </List>
        {
                getEmailsService?.response?.length === 0 &&
                <NoMails message={EMPTY_TABS[type]} />
        }
    </div>
  )
}
