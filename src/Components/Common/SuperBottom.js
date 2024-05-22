import React from 'react'

export default function SuperBottom() {
    return (
        <footer className="footer">
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 p-0 footer-copyright">
                <p className="mb-0">Copyright 2023 © Dunzo theme by pixelstrap.</p>
                </div>
                <div className="col-md-6 p-0">
                <p className="heart mb-0">Hand crafted &amp; made with
                    <svg className="footer-icon">
                    <use href="../assets/svg/icon-sprite.svg#heart"></use>
                    </svg>
                </p>
                </div>
            </div>
            </div>
        </footer>
    )
}
