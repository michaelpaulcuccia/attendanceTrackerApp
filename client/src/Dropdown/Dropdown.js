import React from 'react';
import '../Static/DropdownStyle.css';

const Dropdown = () => {
    return (
        
            <div>
                <select className='drop_down'>
                    <option disabled selected value>-- select your name -- </option>
                    <option></option>
                </select>
            </div>
        
    )
}

export default Dropdown
