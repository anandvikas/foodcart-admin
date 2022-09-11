import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import useRequest from "../../hooks/UseRequest"
import { Breadcrumb, ActiveStatus, VerifiedStatus } from "../Helpers/Helpers"
import Edit from './Edit'
import EditPassword from './EditPassword'
import { toast } from "react-toastify";

const ViewOne = () => {

    const { request, response } = useRequest()
    const {request : delReq, response : delRes} = useRequest()
    const navigate = useNavigate()
    const { userId } = useParams()
    const [data, setData] = useState(null)
    const [mode, setMode] = useState("viewMode")

    useEffect(() => {
        request("GET", `/user/getOne/${userId}`)
    }, [])

    useEffect(() => {
        if (response) {
            if (response?.status === 'success') {
                setData(response?.user)
            }
            console.log(response)
            // setData(response.users)
        }
    }, [response])

    useEffect(()=>{
        if(delRes){
            if (delRes?.status === 'success') {
                toast.success(delRes.message)
                navigate('/user')
            } else {
                toast.error(delRes.message)
            }
        }
    }, [delRes])

    const deleteHandler = () => {
        delReq('DELETE', '/user/delete', {userId})
    }

    return (
        <div>
            <div>
                <Breadcrumb heading="Users" array={[                    
                    { name: "Users", link: "/user" },
                    { name: data?.username ?? userId, link: `/user/${userId}` }
                ]} />
            </div>
            {
                data &&
                <>
                    <div className='card flexParent'>
                        <h2>{data?.username}</h2>
                        <div>
                            <button className={`btn ${mode === 'viewMode' ? 'activeBtn' : ''}`} onClick={() => { setMode('viewMode') }}>view</button>
                            <button className={`btn ${mode === 'editMode' ? 'activeBtn' : ''}`} onClick={() => { setMode('editMode') }}>edit</button>
                            <button className={`btn ${mode === 'passwordMode' ? 'activeBtn' : ''}`} onClick={() => { setMode('passwordMode') }}>change password</button>
                        </div>
                    </div>
                    <div>
                        {
                            mode === 'viewMode' &&
                            <div className='card'>
                                <table className='viewTable'>
                                    <tbody>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>First Name</td>
                                            <td className='viewTd'>{data?.fname ? data?.fname : "--"}</td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Last Name</td>
                                            <td className='viewTd'>{data?.lname ? data?.lname : "--"}</td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Username</td>
                                            <td className='viewTd'>{data?.username ? data?.username : "--"}</td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Email</td>
                                            <td className='viewTd'>{data?.email ? data?.email : "--"}</td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Active Status</td>
                                            <td className='viewTd'><ActiveStatus handler={() => { }} data={data} /></td>
                                        </tr>
                                        <tr className='viewTr'>
                                            <td className='viewTd'>Verified Status</td>
                                            <td className='viewTd'><VerifiedStatus handler={() => { }} data={data} /></td>
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
                                    </tbody>
                                </table>
                                <div className='danger'>
                                    <button className={`btn ${mode === 'editMode' ? 'activeBtn' : ''}`} onClick={deleteHandler}>delete</button>
                                </div>
                            </div>
                        }
                        {
                            mode === 'editMode' &&
                            <Edit userData={data} setMode={setMode} setData={setData} />
                        }
                        {
                            mode === 'passwordMode' &&
                            <EditPassword userData={data} setMode={setMode} setData={setData} />
                        }

                    </div>

                </>
            }
        </div>
    )
}


export default ViewOne;
