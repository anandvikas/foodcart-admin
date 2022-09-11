import React from 'react'
import { data } from "../../utils/SidebarData"
import { Link } from "react-router-dom";

import { styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Collapse from '@mui/material/Collapse';

import { ExpandMore } from '@mui/icons-material';
import { ExpandLess } from '@mui/icons-material';

import {useDispatch} from "react-redux";
import {setActivePage} from "../../store/action"
import {SET_ACTIVE_PAGE} from "../../store/actionTypes"

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);



const Item = ({ item, open, setOpen }) => {
    const dispatch = useDispatch()
    const [showChildren, setShowChildren] = React.useState(false)
    const toggleShowChildren = () => {
        setShowChildren(!showChildren)
    }
    return (
        item.child.length === 0 ? (
            <ListItem disablePadding sx={{ display: 'block', pl: 1 }}>
                <Link to={item.link} className="sideBarLink" onClick={()=>{dispatch(setActivePage(item.name))}}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }} s
                        onClick={toggleShowChildren}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {/* <InboxIcon /> */}
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </Link>
            </ListItem>
        ) : (
                <ListItem disablePadding sx={{ display: 'block', pl: 1 }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }} s
                        onClick={
                            ()=>{
                                toggleShowChildren()
                                setOpen(true)
                            }
                        }
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {/* <InboxIcon /> */}
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />

                        {open ? (showChildren ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItemButton>
                    {
                        open &&
                        <Collapse in={showChildren} timeout="auto" unmountOnExit>
                            <Itrator array={item.child} open={open} />                            
                        </Collapse>
                    }
                </ListItem>
            )
    )
}

const Itrator = ({ array, open, setOpen }) => {
    return (
        <>
            <List>
                {
                    array.map((element, i) => {
                        return (
                            <Item key={i} open={open} item={element} setOpen={setOpen}/>
                        )
                    })
                }
            </List>
            <Divider />
        </>
    )
}


const Sidebar = () => {
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                <div className='logoDiv'>{open ? <h2>LOGO</h2> : <></>}</div>
                <IconButton onClick={toggleDrawer}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}

                </IconButton>
            </DrawerHeader>
            <Divider />
            {
                data.map((catagory, i) => (<Itrator key={i} array={catagory} open={open} setOpen={setOpen}/>))
            }
        </Drawer>
    )
}

export default Sidebar
