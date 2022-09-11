import React, { useState, useEffect } from 'react'

import useRequest from "../../hooks/UseRequest"
import { Breadcrumb, EditElem, SuccessSpan, ErrorSpan } from "../Helpers/Helpers"

const ViewAll = () => {

    const { request, response } = useRequest()
    const [data, setData] = useState(null)

    useEffect(() => {
        request("GET", "/user/getAll")
    }, [])

    useEffect(() => {
        if (response) {
            console.log(response.users)
            setData(response.users)
        }
    }, [response])

    const tableFormat = {
        "Username": "username",
        "Email": "email",
        "Created At": "createdAt",
    }

    return (
        <div >
            <div>
                <Breadcrumb heading="Users" array={[
                    { name: "Users", link: "/user" },
                ]} />
            </div>
            {
                data && data.length > 0 ?
                    <div className='card'>
                        <table className='listTable'>
                            <thead>
                                <tr>
                                    {
                                        Object.keys(tableFormat).map((val, i) => {
                                            return <th className='listTh' key={i}>{val}</th>
                                        })
                                    }
                                    <th className='listTh'>Active Status</th>
                                    <th className='listTh'>Verified Status</th>
                                    <th className='listTh'>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((row, i) => {
                                        return (
                                            <tr key={i}>
                                                {
                                                    Object.values(tableFormat).map((val, ind) => {
                                                        return (
                                                            <td className='listTd' key={ind}>{row[val]}</td>
                                                        )
                                                    })
                                                }

                                                <td className='listTd'>{row.isActive ? <SuccessSpan text='Active' /> : <ErrorSpan text='In-Active' />}</td>
                                                <td className='listTd'>{row.isVerified ? <SuccessSpan text='Verified' /> : <ErrorSpan text='Not-Verified' />}</td>

                                                <td className='listTd'>
                                                    <EditElem link={`/user/${row._id}`} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> :
                    <>
                        <h2>No data available</h2>
                    </>
            }
        </div>
    )
}


export default ViewAll;
