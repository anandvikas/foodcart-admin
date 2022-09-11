import React, { useEffect, useState } from 'react'
import "./login.css"

import Button from '@mui/material/Button';
import { useForm } from "react-hook-form"
import image from "../../media/login.svg"

import { Link, useNavigate } from "react-router-dom"
import { CommonInput, PasswordInput } from "../Form/Form"
import { StackAlert } from "../Helpers/Helpers"
import useRequest from "../../hooks/UseRequest"
import { toast } from "react-toastify";



const SignUp = () => {
    const { handleSubmit, register, formState: { errors }, setValue, watch } = useForm()
    const [resError, setResError] = useState(null)
    const { request, response } = useRequest()
    const navigate = useNavigate()

    const submitForm = (data) => {
        setResError(null)
        request("POST", "/admin/signup", data)
    }

    useEffect(() => {
        if (response) {
            // console.log(response)
            if (response.status === 'success') {
                toast.success(response.message)
                navigate("/")
            } else {
                setResError(response.message)
            }
        }
    }, [response])

    return (
        <div className='loginPage'>
            <div className="loginPageFormDiv">
                <form onSubmit={handleSubmit(submitForm)}>
                    <h2>Admin Sign-up</h2>
                    <CommonInput
                        error={errors.username}
                        label="Username"
                        type='text'
                        name="username"
                        register={register}
                        registerFields={{
                            required: {
                                value: true,
                                message: 'this field is required'
                            }
                        }}
                    />
                    <br />
                    <CommonInput
                        name="email"
                        error={errors.email}
                        label="Email"
                        type='text'
                        register={register}
                        registerFields={{
                            required: {
                                value: true,
                                message: 'this field is required'
                            },
                            pattern: {
                                value: /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
                                message: 'Please enter a valid email address'
                            }
                        }}
                    />
                    <br />
                    <PasswordInput
                        name="password"
                        error={errors.password}
                        label="Password"
                        register={register}
                        registerFields={{
                            required: {
                                value: true,
                                message: 'this field is required'
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
                    <br />
                    <PasswordInput
                        name="rPassword"
                        error={errors.rPassword}
                        label="Repeat Password"
                        register={register}
                        registerFields={{
                            required: {
                                value: true,
                                message: 'this field is required'
                            },
                            validate: (val) => {
                                if (watch('password') != val) {
                                    return "Passwords do no match";
                                }
                            },
                        }}
                    />
                    <br />
                    <div className="loginBtnDiv">
                        <p className="infoText">Already have account <Link className="fpLink" to="/">LOGIN</Link></p>
                        <Button variant="contained" type='submit'>Sign Up</Button>
                    </div>
                    {
                        resError &&
                        <StackAlert type="error" message={resError} />
                    }
                </form>
            </div>
            <div className="loginPageImgDiv">
                <img src={image} alt="image" />
            </div>
        </div>
    )
}
export default SignUp
