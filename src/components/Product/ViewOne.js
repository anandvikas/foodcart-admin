import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import useRequest from "../../hooks/UseRequest"
import { Breadcrumb, imageLoader } from "../Helpers/Helpers"
import Edit from './Edit'
import { toast } from "react-toastify";

const ViewOne = () => {

    const { request, response } = useRequest()
    const { request: delReq, response: delRes } = useRequest()
    const navigate = useNavigate()
    const { productId } = useParams()
    const [data, setData] = useState(null)
    const [mode, setMode] = useState("viewMode")

    useEffect(() => {
        request("GET", `/product/getOne/${productId}`)
    }, [])

    useEffect(() => {
        if (response) {
            if (response?.status === 'success') {
                setData(response?.product)
            }
        }
    }, [response])

    useEffect(() => {
        if (delRes) {
            if (delRes?.status === 'success') {
                toast.success(delRes.message)
                navigate('/product')
            } else {
                toast.error(delRes.message)
            }
        }
    }, [delRes])

    const deleteHandler = () => {
        delReq('DELETE', '/product/delete', { productId })
    }

    return (
        <div>
            <div>
                <Breadcrumb heading="Products" array={[
                    { name: "Products", link: "/product" },
                    { name: data?.title ?? productId, link: `/product/${productId}` }
                ]} />
            </div>
            {
                data &&
                <>
                    <div className='card flexParent'>
                        <h2>{data?.title}</h2>
                        <div>
                            <button className={`btn ${mode === 'viewMode' ? 'activeBtn' : ''}`} onClick={() => { setMode('viewMode') }}>view</button>
                            <button className={`btn ${mode === 'editMode' ? 'activeBtn' : ''}`} onClick={() => { setMode('editMode') }}>edit</button>
                        </div>
                    </div>
                    <div>
                        {
                            mode === 'viewMode' &&
                            <div className='card'>
                                <table className='viewTable'>
                                    <tbody>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Title</td>
                                            <td className='viewTd'>{data?.title ? data?.title : "--"}</td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Sub Title</td>
                                            <td className='viewTd'>{data?.subTitle ? data?.subTitle : "--"}</td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Price</td>
                                            <td className='viewTd'>{data?.price ? data?.price : "--"}</td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Category</td>
                                            <td className='viewTd'>{data?.category ? data?.category : '--'}</td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Ingredients</td>
                                            <td className='viewTd'>{
                                                data?.ingredient && data.ingredient.length > 0 &&
                                                data.ingredient.map((val, ind) => <span className='keywordSpan' key={ind}>{val}</span>)
                                            }</td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Description</td>
                                            <td className='viewTd multilinePreview'>{data?.description ? data?.description : '--'}</td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Created On</td>
                                            <td className='viewTd'>
                                                {
                                                    data?.createdAt ?
                                                        `${new Date(data.createdAt).getDate()}-${new Date(data.createdAt).getMonth()}-${new Date(data.createdAt).getFullYear()}` :
                                                        "--"
                                                }
                                            </td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Updated On</td>
                                            <td className='viewTd'>
                                                {
                                                    data?.updatedAt ?
                                                        `${new Date(data.updatedAt).getDate()}-${new Date(data.updatedAt).getMonth()}-${new Date(data.updatedAt).getFullYear()}` :
                                                        "--"
                                                }
                                            </td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Image</td>
                                            <td className='viewTd'>{data?.image ? <img className='previewImg' src={imageLoader(data?.image)} alt='' /> : '--'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className='danger'>
                                    <button className={`btn ${mode === 'editMode' ? 'activeBtn' : ''}`} onClick={deleteHandler}>delete</button>
                                </div>
                            </div>
                        }
                        {
                            mode === 'editMode' &&
                            <Edit productData={data} setMode={setMode} setData={setData} />
                        }

                    </div>

                </>
            }
        </div>
    )
}


export default ViewOne;
