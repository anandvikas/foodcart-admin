import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FaceIcon from '@mui/icons-material/Face';
import HailIcon from '@mui/icons-material/Hail';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FastfoodIcon from '@mui/icons-material/Fastfood';

export const data = [
    [
        {
            name: "Dashboard",
            icon:<><DashboardIcon/></>,
            link: "/",
            child: []
        },
        {
            name: "Users",
            icon:<><FaceIcon/></>,
            link: "",
            child: [
                {
                    name: "View Users",
                    icon:<><ListAltIcon/></>,
                    link: "/user",
                    child: []
                },
                {
                    name: "Add User",
                    icon:<><AddBoxIcon/></>,
                    link: "/user/add",
                    child: []
                }
            ]
        },
        {
            name: "Products",
            icon:<><FastfoodIcon/></>,
            link: "",
            child: [
                {
                    name: "View Products",
                    icon:<><ListAltIcon/></>,
                    link: "/product",
                    child: []
                },
                {
                    name: "Add Product",
                    icon:<><AddBoxIcon/></>,
                    link: "/product/add",
                    child: []
                }
            ]
        },
        // {
        //     name: "Email Templets",
        //     icon:<><InboxIcon/></>,
        //     link: "/email-templets",
        //     child: []
        // },
        // {
        //     name: "Masters",
        //     icon:<><InboxIcon/></>,
        //     link: "/masters",
        //     child: []
        // },
        // {
        //     name: "Other",
        //     icon:<><InboxIcon/></>,
        //     link: "/other",
        //     child: []
        // },
    ],
    [
        // {
        //     name: "Email Templets",
        //     icon:<><InboxIcon/></>,
        //     link: "/email-templets",
        //     child: []
        // },
        // {
        //     name: "Masters",
        //     icon:<><InboxIcon/></>,
        //     link: "/masters",
        //     child: []
        // },
        // {
        //     name: "Test",
        //     icon:<><InboxIcon/></>,
        //     link: "/test",
        //     child: []
        // },
    ]
]