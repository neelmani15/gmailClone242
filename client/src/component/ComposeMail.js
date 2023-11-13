import React,{useState} from 'react';
import { Dialog,Box,Typography,styled, InputBase, TextField ,Button } from '@mui/material';
import { Close,
    Minimize, 
    OpenInFull,
    DeleteOutline,
    FormatColorText,
    AttachFile,
    InsertLink,
    Mood,
    AddToDrive,
    ImageOutlined,
    LockClockOutlined,
    CreateOutlined,
    MoreVert,
    CloseFullscreen
} from '@mui/icons-material';

import useApi from '../hooks/useApi';
import { API_URLS } from '../services/apiUrl';

const dialogStyle = {
    height:'72%',
    width:'42%',
    maxWidth:'100%',
    maxHeight:'100%',
    // position:'absolute',
    // bottom:0,
    // right:0,
    boxshadow:'none',
    borderRadius:'10px 10px 0 0',
}

const Headers = styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'6px 10px',
    background:'#E7EAF8',
    '& > p':{
        fontSize:14,
        fontWeight:600
    }
});

const RecipientsWrapper = styled(Box)({
    display:'flex',
    flexDirection:'column',
    padding:'0 10px',
    '& > div':{
        fontSize:14,
        borderBottom:'1px solid #F5F5F5',
        marginTop:4
    }
});

const FooterWrapper = styled(Box)({
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    padding:'15px 10px'
});

const SendButton = styled(Button)({
    background:'#0B57d0',
    color:'#fff',
    fontWeight:500,
    textTransform:'none',
    borderRadius:18,
    width:100
});

const Wrapper = styled(Box)({
    display:'flex',
    alignItems:'center',
    margin:'0 5px',
})

export default function ComposeMail({openDialog,setOpenDialog}) {
    const [data,setData]=useState({});
    const [maximized, setMaximized] = useState(false);
    const sentEmailService = useApi(API_URLS.saveSentEmail);
    const saveDraftService = useApi(API_URLS.saveDraftEmails);

    const toggleMaximize = () => {
        setMaximized(!maximized);
    };

    const toggleMinimize = () => {
        setOpenDialog(false);
    };

    const config={
        Host : "smtp.elasticemail.com",
        Username : process.env.REACT_APP_USERNAME,
        Password : process.env.REACT_APP_PASSWORD,
        Port:2525,
    }
    const closeComposeMail=(e)=>{
        e.preventDefault();
        const payload={
            to:data.to,
            from:'neelmani264@gmail.com',
            subject:data.subject,
            body:data.body,
            date:new Date(),
            attach:'',
            name:'Neelmani',
            starred:false,
            type:'drafts'
        }
        saveDraftService.call(payload);
        if(!saveDraftService.error){
            setOpenDialog(false);
            setData({});
        }else{

        }
        setOpenDialog(false);
    }
    const sendMail=(e)=>{
        e.preventDefault();
        if(window.Email){
            window.Email.send({
               ...config,
                To : data.to,
                From : "neelmani264@gmail.com",
                Subject : data.subject,
                Body : data.body
            }).then(
              message => alert(message)
            );
        }
        const payload={
            to:data.to,
            from:'neelmani264@gmail.com',
            subject:data.subject,
            body:data.body,
            date:new Date(),
            attach:'',
            name:'Neelmani',
            starred:false,
            type:'sent'
        }
        sentEmailService.call(payload);
        if(!sentEmailService.error){
            setOpenDialog(false);
            setData({});
        }else{

        }
        setOpenDialog(false);
    }
    const deleteIcon=()=>{
        setOpenDialog(false);
    }
    const onValueChange = (e)=>{
        // console.log(e.target.name,e.target.value);
        setData({...data,[e.target.name]:e.target.value});
        // console.log(data);
    }
  return (
    <Dialog 
        open={openDialog}
        PaperProps={{
        sx: {
          ...dialogStyle,
          height: maximized ? '94%' : dialogStyle.height,
          width: maximized ? '75%' : dialogStyle.width,
          position:maximized?'':'absolute',
          bottom:maximized?'':0,
          right:maximized?'':0
        },
      }}
    >
        <Headers>
            <Typography>New Message</Typography>
            <Box>
                <Minimize fontSize='14px' onClick={toggleMinimize} />
                {maximized ?<CloseFullscreen fontSize='14px' onClick={toggleMaximize} />:<OpenInFull fontSize='14px' onClick={toggleMaximize} />}
                <Close fontSize='14px' onClick={(e)=>closeComposeMail(e)} />
            </Box>
        </Headers>
        <RecipientsWrapper>
            <InputBase placeholder='Recipients' name='to' onChange={(e)=>onValueChange(e)} />
            <InputBase placeholder='Subject' name='subject' onChange={(e)=>onValueChange(e)} />
        </RecipientsWrapper>
        <TextField 
            multiline
            rows={13}
            sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'}}}
            onChange={(e)=>onValueChange(e)}
            name='body'
        />
        <FooterWrapper style={{paddingTop:maximized ? 180:''}}>
            <Wrapper>
                <SendButton onClick={(e)=>sendMail(e)}>Send</SendButton>
                <FormatColorText fontSize='small' style={{padding:'0 3px'}} />
                <AttachFile fontSize='small' style={{padding:'0 3px'}} />
                <InsertLink fontSize='small' style={{padding:'0 3px'}} />
                <Mood fontSize='small' style={{padding:'0 3px'}} />
                <AddToDrive fontSize='small' style={{padding:'0 3px'}} />
                <ImageOutlined fontSize='small' style={{padding:'0 3px'}} />
                <LockClockOutlined fontSize='small' style={{padding:'0 3px'}} />
                <CreateOutlined fontSize='small' style={{padding:'0 3px'}} />
                <MoreVert fontSize='small' style={{padding:'0 3px'}} />
            </Wrapper>
            <DeleteOutline onClick={()=>deleteIcon()}/>
        </FooterWrapper>
    </Dialog>
  )
}
