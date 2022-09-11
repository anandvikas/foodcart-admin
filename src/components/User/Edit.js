import React, { useEffect } from 'react'

import Button from '@mui/material/Button';
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { CommonInput, SwitchInput } from "../Form/Form"


import useRequest from "../../hooks/UseRequest"
import { Breadcrumb } from "../Helpers/Helpers"


import { toast } from "react-toastify";


const Edit = ({ userData, setMode, setData }) => {
    const { handleSubmit, register, formState: { errors }, watch, reset } = useForm()

    useEffect(()=>{
        reset({...userData})
    },[])
    
    const { request, response } = useRequest()    
    const navigate = useNavigate()

    const submitForm = (data) => {
        data.userId = userData._id        
        request("PUT", "/user/update", data)
    }

    useEffect(() => {
        if (response) {
            if (response?.status === 'success') {
                toast.success(response.message)
                setMode('viewMode')
                setData(response?.updateResult)
            } else {
                toast.error(response.message)
            }
        }
    }, [response])


    return (
        <div >
            <form onSubmit={handleSubmit(submitForm)}>

                <div className="card shadow">
                    <h3>General Information</h3>
                    <div className="flexParent">
                        <div className="flexChild">
                            <CommonInput
                                error={errors?.fname}
                                label="First Name"
                                type='text'
                                name="fname"
                                register={register}
                                registerFields={{
                                    required: {
                                        value: true,
                                        message: 'this field is required'
                                    }
                                }}
                            />
                        </div>
                        <div className="flexChild">
                            <CommonInput
                                name="lname"
                                error={errors?.lname}
                                label="Last name"
                                type='text'
                                register={register}
                                registerFields={{
                                    required: {
                                        value: true,
                                        message: 'this field is required'
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="card shadow">
                    <h3>Credentials</h3>
                    <div className="flexParent">
                        <div className="flexChild">
                            <CommonInput
                                error={errors?.email}
                                label="Email"
                                type='text'
                                name="email"
                                register={register}
                                registerFields={{
                                    required: {
                                        value: true,
                                        message: 'Email is required'
                                    },
                                    pattern: {
                                        value: /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
                                        message: 'Please enter a valid email address'
                                    }
                                }}
                            />
                        </div>
                        <div className="flexChild">
                            <CommonInput
                                name="username"
                                error={errors?.username}
                                label="User Name"
                                type='text'
                                register={register}
                                registerFields={{
                                    required: {
                                        value: true,
                                        message: 'User Name is required'
                                    }
                                }}
                            />
                        </div>
                    </div>                    
                </div>
                <div className="card shadow">
                    <h3>Toggles</h3>
                    <div className="flexParent">
                        <div className="flexChild">
                            <SwitchInput
                                label='Active'
                                isChecked={userData.isActive}
                                name="isActive"
                                register={register}
                            />
                        </div>
                        <div className="flexChild">
                            <SwitchInput
                                label='Verified'
                                isChecked={userData.isVerified}
                                name="isVerified"
                                register={register}
                            />
                        </div>
                        <div className="flexChild">
                            <SwitchInput
                                label='Send Mails'
                                isChecked={userData.sendMail}
                                name="sendMail"
                                register={register}
                            />
                        </div>
                    </div>
                </div>
                <div className="card">
                    <Button variant="contained" type='submit'>Submit</Button>
                </div>
            </form>
        </div>
    )
}


export default Edit;
