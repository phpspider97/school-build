import React from 'react'
import './Fallback.css'; 

export default function Fallback() {
    return (
        <div className="loading">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    )
}
