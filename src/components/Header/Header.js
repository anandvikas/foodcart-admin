import React from 'react'
import "./header.css"

import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {useDispatch} from "react-redux"
import {setLogout} from "../../store/action"

import {useNavigate} from "react-router-dom"

const Header = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const userOptions = [
        {
            name: "Profile",
            icon: <AccountCircleIcon fontSize="small" />
        },
        {
            name: "Logout",
            icon: <Logout fontSize="small" />
        }
    ]
    return (
        <div className="header">
            {/* <div><h3>Admin Panel</h3></div> */}
            <div>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="xyz" src="" />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {/* {userOptions.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <ListItemIcon>
                                {setting.icon}
                            </ListItemIcon>
                            {setting.name}
                        </MenuItem>
                    ))} */}


                    <MenuItem onClick={handleCloseUserMenu}>
                        <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={()=>{
                        
                        dispatch(setLogout())
                        // window.location.reload()
                        navigate("/")
                    }}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Log Out
                    </MenuItem>

                </Menu>
            </div>
        </div>
    )
}

export default Header
