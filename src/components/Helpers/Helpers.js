import React from 'react'
import { Link } from "react-router-dom"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import { useNavigate } from 'react-router-dom';

import "./helpers.css"

export const Breadcrumb = ({ heading, array }) => {
    return (
        <div className="breadcrumb">
            <span>{heading}</span>
            <Breadcrumbs aria-label="breadcrumb">
                {
                    array.map((item, i) => <Link className="breadcrumbLink" key={i} to={item.link}>{item.name}</Link>)
                }
            </Breadcrumbs>
        </div>
    )
}

export const SuccessSpan = ({ text }) => {
    return <span className='successSpan'>{text}</span>
}

export const ErrorSpan = ({ text }) => {
    return <span className='errorSpan'>{text}</span>
}

export const StackAlert = ({ type, message }) => {
    return (
        <Stack sx={{ width: '100%', my: 3 }} spacing={2}>
            <Alert severity={type}>{message}</Alert>
        </Stack>
    )
}

// export const DeleteElem = ({ data, handler }) => {
//     return <Tooltip title="Delete" placement="top"><span onClick={() => { handler(data) }}><DeleteIcon /></span></Tooltip>
// }

export const ActiveStatus = ({ handler, data }) => {
    return (
        <Tooltip title={data.isActive ? "Deactivate" : "Activate"} placement="top">
            <span onClick={() => { handler(data) }}>
                {data?.isActive ? <SuccessSpan text='Active' /> : <ErrorSpan text='Deactive' />}
            </span>
        </Tooltip>
    )
}

export const VerifiedStatus = ({ handler, data }) => {
    return (
        <Tooltip title={data.isVerified ? "Un-verify" : "Verify"} placement="top">
            <span onClick={() => { handler(data) }}>
                {data?.isVerified ? <SuccessSpan text='Verified' /> : <ErrorSpan text='Not verified' />}
            </span>
        </Tooltip>
    )
}

export const ViewElem = ({ link, id }) => {
    const navigate = useNavigate()
    return <Tooltip title="View" placement="top"><span onClick={() => { navigate(`${link}/${id}`) }}><VisibilityIcon /></span></Tooltip>
}

export const EditElem = ({ link }) => {
    const navigate = useNavigate()
    return <Tooltip title="Edit" placement="left"><span onClick={() => { navigate(link) }}><EditIcon style={{cursor:'pointer'}} /></span></Tooltip>
}

export const imageLoader = (link) => {
    let fullLink = `${process.env.REACT_APP_SERVER_URL}/image?file=${link}`
    return fullLink
}