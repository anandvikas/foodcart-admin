import * as React from 'react';

import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const Interface = ({children}) => {
    return (
        <div className="interfaceDiv">
            <Sidebar/>            
            <div className="bodyDiv">
                <Header/>
                <div className="workspace">{children}</div>
                <Footer/>
            </div>
        </div>
    );
}

export default Interface;