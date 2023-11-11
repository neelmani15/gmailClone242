import React, { Suspense } from 'react';
import { useState } from 'react';
import Headers from '../component/Headers';
import SideBar from '../component/SideBar';
import Email from '../component/Email';
import SuspenseLoading from '../Error/SuspenseLoading';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function Main() {
    const [openDrawer,setOpenDrawer]=useState(true);
    const toggleDrawer = ()=>{
        setOpenDrawer(prevState => !prevState);
    }
  return (
    <div>
        <Headers toggleDrawer={toggleDrawer} />
        <Box>
            <SideBar openDrawer={openDrawer} />
            <Suspense fallback={<SuspenseLoading />}>
                <Outlet context={{openDrawer}} />
            </Suspense>
        </Box>
    </div>
  )
}
