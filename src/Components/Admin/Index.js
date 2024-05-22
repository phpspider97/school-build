import React,{useState,useEffect} from 'react'  

export default function Index() {
    const [pageName] = useState([{
        title_1 : 'Dashboard',
        title_2 : 'UPLOAD BULK SCHOOL',
        title_3 : "UPDATE SCHOOL'S PERMISSION",
        title_4 : "SCHOOL",
        title_5 : "ADD-MANAGE SCHOOL'S",
    }])
    const [loaderVisible,setLoaderVisible] = useState(true) 
    
    useEffect(()=>{  
        setLoaderVisible(false)
    },[])
    return ( 
        <>  
            <div className="page-body">
                {loaderVisible?
                <div class="loader-wrapper">
                    <div class="theme-loader">    
                        <div class="loader-p"></div>
                    </div>
                </div>:''} 
                <div className="container-fluid">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-sm-6 ps-0"><h3>{pageName[0].title_1}</h3></div>
                            <div className="col-sm-6 pe-0">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="#">
                                            <svg className="stroke-icon">
                                                <use href="../assets/svg/icon-sprite.svg#stroke-home"></use>
                                            </svg>
                                        </a>
                                    </li> 
                                    <li className="breadcrumb-item active">{pageName[0].title_1}</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="container-fluid project-dashboard">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-6"> 
                                    <div className="card web-card">
                                        <div className="card-body">
                                            <div className="d-flex">
                                                <div className="header-top">
                                                    <div className="mobile-app bg-light-primary">
                                                        <span></span>
                                                        <svg>
                                                            <use href="../assets/svg/icon-sprite.svg#improvement"></use>
                                                        </svg>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h4>Web & mobile app</h4>
                                                        <span>Dribble Presentation</span>
                                                    </div>
                                                </div>
                                                <div className="dropdown icon-dropdown">
                                                    <button className="btn dropdown-toggle" id="userdropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="icon-more-alt"></i></button>
                                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userdropdown"><a className="dropdown-item" href="#">Weekly</a><a className="dropdown-item" href="#">Monthly</a><a className="dropdown-item" href="#">Yearly </a></div>
                                                </div>
                                            </div>
                                            <div className="comment">
                                                <ul>
                                                    <li>
                                                        <svg>
                                                            <use href="../assets/svg/icon-sprite.svg#calendar"></use>
                                                        </svg>
                                                        <span>June 18,2023</span>
                                                    </li>
                                                    <li>
                                                        <svg>
                                                            <use href="../assets/svg/icon-sprite.svg#message"></use>
                                                        </svg>
                                                        <span>18</span>
                                                    </li>
                                                    <li>
                                                        <svg>
                                                            <use href="../assets/svg/icon-sprite.svg#link"></use>
                                                        </svg>
                                                        <span>08</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="user-details customers">
                                                    <ul>
                                                        <li className="d-inline-block"><img src="../assets/images/dashboard-3/user/1.png" alt="user" /></li>
                                                        <li className="d-inline-block"><img src="../assets/images/dashboard-3/user/2.png" alt="user" /></li>
                                                        <li className="d-inline-block"><img src="../assets/images/dashboard-3/user/3.png" alt="user" /></li>
                                                    </ul>
                                                </div>
                                                <div className="progress-value">
                                                    <span>Progress<span>70%</span></span>
                                                    <div className="progress">
                                                        <div className="progress-bar bg-primary" role="progressbar" style={{width: '70%'}} aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>   
        </>
    )
}