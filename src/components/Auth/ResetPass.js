import React, { useState } from 'react'
import "./login.css"

import Button from '@mui/material/Button';
import { useForm } from "react-hook-form"
import FormGroup from '@mui/material/FormGroup';
import forgotPass from "../../media/forgotPass.svg"

import { PasswordInput } from "../Form/Form"
import {StackAlert} from "../Helpers/Helpers"



const ResetPass = () => {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const [resError, setResError] = useState(null)    

    const submitForm = (data) => {
        if (data.password === data.rPassword) {
            setResError(null)
            console.log(data)
        } else {
            setResError("Password and Repeat Password are not matching")
        }
    }

    return (
        <div className='loginPage'>

            <div className="loginPageFormDiv">
                <form onSubmit={handleSubmit(submitForm)}>
                    <h2>Reset Password</h2>
                    <FormGroup>
                        <PasswordInput
                            label="New Password"
                            name="password"
                            registerFields={{
                                required: {
                                    value: true,
                                    message: 'New Password is required'
                                }
                            }}
                            error={errors.password}
                            register={register}
                        />
                        <br />
                        <PasswordInput
                            label="Repeat New Password"
                            name="rPassword"
                            registerFields={{
                                required: {
                                    value: true,
                                    message: 'Repeat New Password is required'
                                }
                            }}
                            error={errors.rPassword}
                            register={register}
                        />
                        <br />
                        <div className="loginBtnDiv">
                            <Button variant="contained" type='submit'>Submit</Button>
                        </div>
                    </FormGroup>
                    {
                        resError &&
                        <StackAlert type="error" message={resError}/>                        
                    }
                </form>
            </div>
            <div className="loginPageImgDiv">
                <img src={forgotPass} alt="image" />
            </div>
        </div>
    )
}

export default ResetPass
