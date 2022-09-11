import React, { useState } from 'react'
import { toast } from "react-toastify";
import {useSelector} from "react-redux"

import axios from "axios"
const server = process.env.REACT_APP_SERVER_URL

const useRequest = () => {
    const [response, setResponse] = useState(null)
    const {token, schoolId} = useSelector(state => state.generalReducer.adminAuth)
    const request = (method, path, data) => {
        let url = `${server}${path}`
        let config = {
            method,
            url,
            headers: {
                Authorization: `Bearer ${token}`,
                schoolId:schoolId
            },            
            data
        }
        axios(config)
            .then((res) => {
                setResponse(res.data)
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message || "something went wrong")
            })
    }
    return {
        request,
        response
    }
}

export default useRequest
