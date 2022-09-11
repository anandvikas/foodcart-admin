import React, { useState } from 'react'
import "./login.css"
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form"
import otp from "../../media/otp.svg"

import {StackAlert} from "../Helpers/Helpers"



const Otp = () => {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const submitForm = (data) => {
        let otp = `${data.num1}${data.num2}${data.num3}${data.num4}`
        console.log(otp)
    }

    const [resError, setResError] = useState(null)

    const setIndex = (e) => {
        let currentIndex = e.target.tabIndex
        if (e.key === "Backspace" || e.key === "Delete") {
            if(currentIndex === 0) {
                return
            }
            e.target.form[currentIndex - 1].focus()
            return
        }
        if (currentIndex === 3) {
            return
        }
        e.target.form[currentIndex + 1].focus()
    }
    return (
        <div className='loginPage'>
            <div className="loginPageImgDiv">
                <img src={otp} alt="image" />
            </div>
            <div className="loginPageFormDiv">
                <form onSubmit={handleSubmit(submitForm)}>
                    <h2>Enter the OTP</h2>
                    <p className="infoText">Send to the Registered email address.</p>
                    <div className="otpGroup">
                        <input
                            className="otpInput"
                            type='text'
                            tabIndex="0"
                            maxLength="1"
                            onKeyUp={setIndex}
                            {...register("num1", {
                                required: true,
                            })}
                        />
                        <input
                            className="otpInput"
                            type='text'
                            tabIndex="1"
                            maxLength="1"
                            onKeyUp={setIndex}
                            {...register("num2", {
                                required: true,
                            })}
                        />
                        <input
                            className="otpInput"
                            type='text'
                            tabIndex="2"
                            maxLength="1"
                            onKeyUp={setIndex}
                            {...register("num3", {
                                required: true,
                            })}
                        />
                        <input
                            className="otpInput"
                            type='text'
                            tabIndex="3"
                            maxLength="1"
                            onKeyUp={setIndex}
                            {...register("num4", {
                                required: true,
                            })}
                        />
                    </div>

                    <div className="loginBtnDiv">
                        <Button variant="contained" type='submit'>Submit</Button>
                    </div>
                    {
                        resError &&
                        <StackAlert type="error" message={resError}/>                        
                    }

                </form>
            </div>
        </div>
    )
}

export default Otp
