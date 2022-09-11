import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CommonInput, AreaInput, FileInput, SelectInput } from "../Form/Form"


import useRequest from "../../hooks/UseRequest"
import { Breadcrumb } from "../Helpers/Helpers"


import { toast } from "react-toastify";


const Add = () => {
    const { handleSubmit, register, formState: { errors }, watch, getValues } = useForm()
    const { request, response } = useRequest()
    const navigate = useNavigate()

    const [imgSrc, setImgSrc] = useState(null)

    const submitForm = (data) => {

        let ingredient = data.ingredient.split(",").map((ele) => {
            return ele.trim();
        })
        data.ingredient = ingredient
        // console.log(data)
        const formData = new FormData();

        formData.append("foodImages", data.image[0])
        formData.append("data", JSON.stringify({
            title: data.title,
            subTitle: data.subTitle,
            price: data.price,
            category: data.category,
            description: data.description,
            ingredient: data.ingredient
        }))
        // console.log(formData)
        request("POST", "/product/create", formData)
    }

    useEffect(() => {
        if (response) {
            if (response?.status === 'success') {
                toast.success(response.message)
                navigate("/product")
            } else {
                toast.error(response.message)
            }
        }
    }, [response])

    return (
        <div >
            <div>
                <Breadcrumb heading="Add Product" array={[
                    { name: "Products", link: "/product" },
                    { name: "Add Product", link: "/product/add" }
                ]} />
            </div>
            <form onSubmit={handleSubmit(submitForm)}>

                <div className="card shadow">
                    <h3>General Information</h3>
                    <div className="flexParent">
                        <div className="flexChild">
                            <CommonInput
                                error={errors?.title}
                                label="Title"
                                type='text'
                                name="title"
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
                                name="subTitle"
                                error={errors?.subTitle}
                                label="Sub Title"
                                type='text'
                                register={register}
                            />
                        </div>
                    </div>
                    <div className="flexParent">
                        <div className="flexChild">
                            <CommonInput
                                error={errors?.price}
                                label="Price"
                                type='number'
                                name="price"
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
                            <SelectInput
                                error={errors?.category}
                                label="Category"
                                name="category"
                                register={register}
                                options={[
                                    { value: 'meal', text: 'Meal' },
                                    { value: 'drink', text: 'Drink' },
                                    { value: 'snack', text: 'Snack' }
                                ]}
                                registerFields={{
                                    required: {
                                        value: true,
                                        message: 'this field is required'
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="flexParent">
                        <div className="flexChild">
                            <CommonInput
                                error={errors?.ingredient}
                                label="Ingredients"
                                type='text'
                                name="ingredient"
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
                    <h3>Description</h3>
                    <div className="flexParent">
                        <div className="flexChild">
                            <AreaInput
                                error={errors?.description}
                                label="Description"
                                type='text'
                                name="description"
                                register={register}
                                registerFields={{
                                    required: {
                                        value: true,
                                        message: 'Description is required'
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="card shadow">
                    <h3>Images</h3>
                    <div className="flexParent">
                        <div className="flexChild">
                            <FileInput
                                error={errors?.image}
                                label="Add Image"
                                name="image"
                                register={register}                                
                                registerFields={{
                                    required: {
                                        value: true,
                                        message: 'Image is required'
                                    },
                                    onChange: (e) => {
                                        setImgSrc(URL.createObjectURL(e?.target?.files[0]))
                                    }
                                }}
                            />
                        </div>
                        <div className="flexChild">
                            <img className='previewImg' src={imgSrc} alt='' />
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
