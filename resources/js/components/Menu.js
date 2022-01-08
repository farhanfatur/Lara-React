import React from "react";
import {useHistory} from 'react-router-dom'
function Menu({ onLogout }) {
    let history = useHistory()

    return (
        <div className="col-1">
            <div className="btn-group-vertical" role="group" aria-label="label menu">
                <button type="button" className="btn btn-outline-primary" onClick={() => history.push('/home')}>Home</button>
                <button type="button" className="btn btn-outline-primary" onClick={() => history.push('/posts')}>Post</button>
                <button type="button" className="btn btn-outline-primary" onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Menu