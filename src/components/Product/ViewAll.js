import React, { useState, useEffect } from 'react'

import useRequest from "../../hooks/UseRequest"
import { Breadcrumb, EditElem } from "../Helpers/Helpers"

const ViewAll = () => {

    const { request, response } = useRequest()
    const [data, setData] = useState(null)

    useEffect(() => {
        request("GET", "/product/getAll")
    }, [])

    useEffect(() => {
        if (response) {
            // console.log(response.products)
            setData(response.products)
        }
    }, [response])

    const tableFormat = {
        "Title": "title",
        "Subtitle": "subTitle",
        "Created At": "createdAt",
    }

    return (
        <div >
            <div>
                <Breadcrumb heading="Products" array={[
                    { name: "Products", link: "/product" },
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
                                                <td className='listTd'>
                                                    <EditElem link={`/product/${row._id}`} />
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
