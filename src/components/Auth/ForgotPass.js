import React, { useState } from 'react'
import "./login.css"

import Button from '@mui/material/Button';
import { useForm } from "react-hook-form"
import FormGroup from '@mui/material/FormGroup';
import forgotPass from "../../media/forgotPass.svg"


import { CommonInput } from "../Form/Form"
import { StackAlert } from "../Helpers/Helpers"




const ForgotPass = () => {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const submitForm = (data) => {
        console.log(data)
    }

    const [resError, setResError] = useState(null)

    return (
        <div className='loginPage'>

            <div className="loginPageFormDiv">
                <form onSubmit={handleSubmit(submitForm)}>
                    <h2>Forgot Password</h2>
                    <FormGroup>
                        <CommonInput
                            name="email"
                            label="Registered Email Id"
                            type="text"
                            register={register}
                            error={errors.email}
                            registerFields={{
                                required: {
                                    value: true,
                                    message: "Registered Email Id is required"
                                },
                                pattern: {
                                    value: /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/,
                                    message: 'Please enter a valid email address'
                                }
                            }}
                        />
                        <br />

                        <p className="infoText">We will send an OTP to the registered email address.</p>
                        <div className="loginBtnDiv">
                            <Button variant="contained" type='submit'>Get OTP</Button>
                        </div>
                    </FormGroup>
                    {
                        resError &&
                        <StackAlert type="error" message={resError} />
                    }
                </form>
            </div>
            <div className="loginPageImgDiv">
                <img src={forgotPass} alt="image" />
            </div>
        </div>
    )
}

export default ForgotPass
