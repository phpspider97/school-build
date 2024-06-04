import React,{useEffect,useState} from 'react'
import {Helmet} from "react-helmet"

export default function SuperBottom() {
    const [isRender,setIsRender] = useState(false)
    useEffect(() => {
        setIsRender(true)
      }, []);
    return (
        <footer className="footer"> 
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 p-0 footer-copyright">
                        <p className="mb-0">Copyright 2024 © Thecoderjob.com </p>
                    </div>
                    <div className="col-md-6 p-0 d-none">
                        <p className="heart mb-0">
                            Hand crafted &amp; made with
                            <svg className="footer-icon">
                                <use href="../assets/svg/icon-sprite.svg#heart"></use>
                            </svg>
                        </p>
                    </div>
                </div>
            </div>
            { isRender && (isRender === true)?
                <Helmet>  
                    <script src="/assets/js/scrollbar/simplebar.js"></script>
                    <script src="/assets/js/scrollbar/custom.js"></script> 
                    <script src="/assets/js/sidebar-menu.js"></script> 
                    <script src="/assets/js/sidebar-pin.js"></script> 
                </Helmet>
                :''
            }
            
        </footer>
    )
}