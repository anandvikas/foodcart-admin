import React, { useEffect } from 'react'

import Button from '@mui/material/Button';
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CommonInput, PasswordInput, CheckboxInput } from "../Form/Form"


import useRequest from "../../hooks/UseRequest"
import { Breadcrumb } from "../Helpers/Helpers"


import { toast } from "react-toastify";


const Add = () => {
    const { handleSubmit, register, formState: { errors }, watch } = useForm()
    const { request, response } = useRequest()
    const navigate = useNavigate()

    const submitForm = (data) => {
        // console.log(data)        
        request("POST", "/user/create", data)
    }

    useEffect(() => {
        if (response) {
            if (response?.status === 'success') {
                toast.success(response.message)
                navigate("/user")
            } else {
                toast.error(response.message)
            }
        }
    }, [response])

    return (
        <div >
            <div>
                <Breadcrumb heading="Add User" array={[                    
                    { name: "Users", link: "/user" },
                    { name: "Add User", link: "/user/add" }
                ]} />
            </div>
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
                    <div className="flexParent">
                        <div className="flexChild">
                            <CheckboxInput
                                name='sendMail'
                                label='Send Email Notifications'
                                checked={true}
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


export default Add;
