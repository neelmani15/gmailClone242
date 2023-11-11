import React from 'react'
import { useState } from 'react';
import { Box, Button,styled,List,ListItem} from '@mui/material';
import { CreateOutlined } from '@mui/icons-material';
import { SIDEBAR_DATA } from '../constants/SideBarConfig';
import ComposeMail from './ComposeMail';
import { useParams,NavLink } from 'react-router-dom';
import { routes } from '../routes/routes';

const ComposeButton = styled(Button)({
    background:'#c2e7ff',
    color:'#001d35',
    padding:14,
    borderRadius:16,
    minWidth:140,
    textTransform:"none"
});

const ComposeMailBox = styled(Box)({
    display:'flex',
    justifyContent:'end',
    alignItems:'end'
})

const Container = styled(Box)({
    padding:8,
    '& > ul':{
        padding:'10px 0 0 5px',
        fontSize:14,
        fontweight:500,
        cursor:'pointer',
        '& > a':{
            textDecoration:'none',
            color:'inherit'
        }
    },
    '& > ul > a > li > svg':{
        marginRight:20
    }
})

export default function SideBarContent() {
  const [openDialog,setOpenDialog]=useState(false);
  const {type} =useParams();
  const onComposeClick=()=>{
    setOpenDialog(true);
  }
  return (
    // <div>SideBarContent</div>
    <Container>
        <ComposeButton onClick={()=>onComposeClick()}>
            <CreateOutlined />Compose
        </ComposeButton>
        <List>
            {
                SIDEBAR_DATA.map(data =>(
                    <NavLink key={data.name} to={`${routes.email.path}/${data.name}`}>
                        <ListItem style={type===data.name.toLowerCase()?{
                            backgroundColor:'#d3e3fd',
                            borderRadius:'0 16px 16px 0',
                            fontWeight:'700'
                        }:{}}>
                            <data.icon fontSize='small' />{data.title}
                        </ListItem>
                    </NavLink>
                ))
            }
        </List>
        <ComposeMailBox>
            <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </ComposeMailBox>
    </Container>
  )
}
