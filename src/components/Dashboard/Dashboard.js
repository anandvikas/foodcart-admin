import React from 'react'
import {Breadcrumb} from '../Helpers/Helpers'

const Dashboard = () => {
    return (
        <div>
        <Breadcrumb array={
            [
                {name:"Dashboard", link:"/"},
                {name:"Vikas", link:"/vikas"},
                {name:"Anand", link:"/anand"}
            ]
        }/>
            Dashboard
        </div>
    )
}
export default Dashboard
