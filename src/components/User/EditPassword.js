import React, { useEffect } from 'react'

import Button from '@mui/material/Button';
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { CommonInput, SwitchInput, PasswordInput } from "../Form/Form"


import useRequest from "../../hooks/UseRequest"



import { toast } from "react-toastify";


const EditPassword = ({ userData, setMode }) => {
    const { handleSubmit, register, formState: { errors }, watch } = useForm()
    const { request, response } = useRequest()     

    const submitForm = (data) => {
        data.userId = userData._id      
        // console.log(data)  
        request("PUT", "/user/changePassword", data)
    }

    useEffect(() => {
        if (response) {
            if (response?.status === 'success') {
                toast.success(response.message)
                setMode('viewMode')                
            } else {
                toast.error(response.message)
            }
        }
    }, [response])

    return (
        <div >
            <form onSubmit={handleSubmit(submitForm)}>

                <div className="card shadow">
                    <h3>Change Password</h3>
                    <div className="flexParent">
                        <div className="flexChild">
                            <PasswordInput
                                name="password"
                                error={errors?.password}
                                label="Password"
                                type='password'
                                register={register}
                                registerFields={{
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'length of password must be 8 - 16 characters'
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: 'length of password must be 8 - 16 characters'
                                    },
                                    pattern: {
                                        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                                        message: "Password must contain number, one lowercase letter, one uppercase letter, one special character and no space"
                                    }
                                }}
                            />
                        </div>
                        <div className="flexChild">
                            <PasswordInput
                                name="rPassword"
                                error={errors?.rPassword}
                                label="Repeat Password"
                                type='password'
                                register={register}
                                registerFields={{
                                    required: {
                                        value: true,
                                        message: 'Password is required'
                                    },
                                    validate: (val) => {
                                        if (watch('password') != val) {
                                            return "Passwords do not match";
                                        }
                                    },
                                }}
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


export default EditPassword;
