import React, { useState, useEffect } from 'react'
import "./login.css"

import Button from '@mui/material/Button';
import { useForm } from "react-hook-form"
import FormGroup from '@mui/material/FormGroup';
import image from "../../media/login.svg"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { CommonInput, PasswordInput } from "../Form/Form"
import { StackAlert } from "../Helpers/Helpers"

import useRequest from "../../hooks/UseRequest"

import { setLogin } from "../../store/action"


const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const [resError, setResError] = useState(null)
    const { request, response } = useRequest()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitForm = (data) => {
        request("POST", "/admin/login", data)
    }

    useEffect(() => {
        if (response) {
            console.log(response)
            if (response.status === "success") {
                dispatch(setLogin(response.data))
                navigate("/")
            } else {
                setResError(response.message)
            }
        }
    }, [response])

    return (
        <div className='loginPage'>
            <div className="loginPageImgDiv">
                <img src={image} alt="image" />
            </div>
            <div className="loginPageFormDiv">
                <form onSubmit={handleSubmit(submitForm)}>
                    <h2>Admin Login</h2>
                    <FormGroup>
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
                                }
                            }}
                        />
                        <br />
                        <div className="loginBtnDiv">
                            <p><Link className="fpLink" to="/forgotPassword">forgot password</Link></p>
                            <Button variant="contained" type='submit'>Login</Button>
                        </div>
                        <p className="infoText">don't have an account <Link className="fpLink" to="/signup">Register</Link></p>
                    </FormGroup>
                    {
                        resError &&
                        <StackAlert type="error" message={resError} />
                    }
                </form>
            </div>
        </div>
    )
}


export default Login
