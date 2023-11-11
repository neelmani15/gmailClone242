import React from 'react'
import {AppBar,Toolbar,styled,InputBase, Box} from '@mui/material';
import {AccountCircleOutlined, AppsOutlined, HelpOutlineRounded, Menu as MenuIcon,Search,SettingsOutlined,Tune} from '@mui/icons-material';
import { gmailLogo } from '../constants/constant';

const StyledAppBar = styled(AppBar)({
    background:'#F1F1F1',
    boxShadow:'none'
})

const SearchBar = styled(Box)({
    background:'#E1E4F5',
    marginLeft:80,
    borderRadius:28,
    minWidth:690,
    maxWidth:720,
    height:50,
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    padding:'0 20px',
    '& > div':{
        width:'100%',
        padding:'0 10px'
    }
})

const IconWrapper = styled(Box)({
    width:'100%',
    display:'flex',
    justifyContent:'end',
    '& > svg':{
        marginLeft:20
    }
})

export default function Headers({toggleDrawer}) {
  return (
    // <div>Headers Page</div>
    <StyledAppBar position='static'>
        <Toolbar>
            <MenuIcon color='action' onClick={toggleDrawer} />
            <img src={gmailLogo} alt='logo' style={{width:110,marginLeft:15}} />
            <SearchBar>
                <Search color='action' />
                <InputBase placeholder='Search mail' />
                <Tune color='action' />
            </SearchBar>
            <IconWrapper>
                <HelpOutlineRounded color='action' />
                <SettingsOutlined color='action' />
                <AppsOutlined color='action' />
                <AccountCircleOutlined color='action'/>
            </IconWrapper>
        </Toolbar>
    </StyledAppBar>
  )
}
