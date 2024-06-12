import React,{useState,useEffect} from 'react'  
import Breadcrum from '../Common/Breadcrum'

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
                <div className="loader-wrapper">
                    <div className="theme-loader">    
                        <div className="loader-p"></div>
                    </div>
                </div>:''} 
                <Breadcrum title={pageName[0].title_1} /> 
                <div className="container-fluid default-dashboard">
                    <div className="row">
                        <div className="col-xxl-4 col-xl-100 box-col-12 ps-4 pe-4 left-background">
                            <div className="row bg-light h-100 p-3 pt-4 pb-4">
                                <div className="col-12 col-xl-50 box-col-6">
                                    <div className="card welcome-card">
                                        <div className="card-body p-3">
                                            <div className="d-flex">
                                                <div className="flex-grow-1">
                                                    <h1>Hello, Admin</h1>
                                                    <p>Welcome back! Let's start from where you left.</p>
                                                    <a className="btn" href="/edit-profile.php">View Profile</a>
                                                </div> 
                                                <div className="flex-shrink-0"> <img src="/assets/images/dashboard/welcome.png" alt="" /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-50 box-col-6">
                                    <div className="row">
                                        <div className="col-12 col-lg-12 col-md-6 box-col-12">
                                            <div className="card total-earning">
                                                <div className="card-body-custom">
                                                    <div className="row">
                                                        <div className="col-sm-7 box-col-7">
                                                            <div className="d-flex">
                                                                <h3 className="font-primary">Total Earning</h3>
                                                            </div>
                                                            <h5>$20.790</h5>
                                                            <span>+ 16.06% than last week</span>
                                                        </div>
                                                        <div className="col-sm-5 box-col-5 p-0">
                                                            <div id="income-chart"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-12 col-md-6 box-col-12">
                                            <div className="card total-earning">
                                                <div className="card-body-custom pb-0">
                                                    <div className="row">
                                                        <div className="col-sm-7 box-col-7">
                                                            <div className="d-flex">
                                                                <h3 className="font-primary">Total Expense</h3>
                                                            </div>
                                                            <h5>$4,683.90</h5>
                                                            <span>+ 10.34% than last week</span>
                                                        </div>
                                                        <div className="col-sm-5 box-col-5 p-0">
                                                            <div id="expense-chart"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-8 col-xl-100 box-col-12">
                                    <div className="row"> 
                                        <div className="col-xxl-3 col-xl-50 col-sm-6 proorder-xl-4">
                                            <div className="card since border">
                                                <div className="card-body-custom profit">
                                                    <div className="customer-card d-flex b-l-danger border-2">
                                                        <div className="ms-3">
                                                            <h3 className="mt-1">Website Visitor</h3>
                                                            <h5 className="mt-1">22</h5>
                                                        </div>
                                                        <div className="dashboard-user bg-light-danger">
                                                            <span></span>
                                                            <svg>
                                                                <use href="assets/svg/icon-sprite.svg#profile"></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="customer mt-2">
                                                        <span className="me-1">
                                                            <svg>
                                                                <use href="assets/svg/icon-sprite.svg#arrow-down"></use>
                                                            </svg>
                                                        </span>
                                                        <span className="font-danger me-2">+ 2.3%</span><span>Since last Week</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-xl-50 col-sm-6 proorder-xl-5">
                                            <div className="card since border">
                                                <div className="card-body-custom invoice-profit">
                                                    <div className="customer-card d-flex b-l-success border-2">
                                                        <div className="ms-3">
                                                            <h3 className="mt-1">Invoices</h3>
                                                            <h5 className="mt-1">1.256</h5>
                                                        </div>
                                                        <div className="dashboard-user bg-light-success">
                                                            <span></span>
                                                            <svg>
                                                                <use href="assets/svg/icon-sprite.svg#invoice"></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="customer mt-2">
                                                        <span className="me-1">
                                                            <svg>
                                                                <use href="assets/svg/icon-sprite.svg#arrow-up"></use>
                                                            </svg>
                                                        </span>
                                                        <span className="font-success me-2">+ 6.3%</span><span>Since last Week</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>   
                                    </div>
                                </div>
                                <div className="col-xl-12 col-xl-100 col-md-12 box-col-12 d-none">
                                    <div className="card sales overview">
                                        <div className="card-header card-no-border pb-0">
                                            <div className="header-top">
                                                <h4>Sales Overview</h4>
                                                <div className="dropdown icon-dropdown">
                                                    <button className="btn dropdown-toggle" id="userdropdown5" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="icon-more-alt"></i></button>
                                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userdropdown5"><a className="dropdown-item" href="#">Weekly</a><a className="dropdown-item" href="#">Monthly</a><a className="dropdown-item" href="#">Yearly</a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body-custom p-0">
                                            <div className="sales-chart">
                                                <div className="shap-2">
                                                    <div className="rounded-shap animate-bg-secondary"><i></i><i></i></div>
                                                </div>
                                                <div className="shap-2">
                                                    <div className="rounded-shap animate-bg-secondary"><i></i><i></i></div>
                                                </div>
                                                <div className="shap-2">
                                                    <div className="rounded-shap animate-bg-secondary"><i></i><i></i></div>
                                                </div>
                                                <div className="shap-2">
                                                    <div className="rounded-shap animate-bg-secondary"><i></i><i></i></div>
                                                </div>
                                                <div id="sales-overview"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 

                                <div className="col-xl-12 col-xl-100 col-md-12 box-col-12">
                                    <div className="card news-update">
                                        <div className="card-header pb-0">
                                            <div className="header-top">
                                                <h4>News & Update</h4>
                                                <div className="dropdown icon-dropdown">
                                                    <button className="btn dropdown-toggle" id="userdropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="icon-more-alt"></i></button>
                                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userdropdown"><a className="dropdown-item" href="#">Weekly</a><a className="dropdown-item" href="#">Monthly</a><a className="dropdown-item" href="#">Yearly</a></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body-custom">
                                            <div className="d-flex align-items-center pt-0">
                                                <img src="assets/images/dashboard/1.jpg" alt="" />
                                                <div className="flex-grow-1 ms-3">
                                                    <a href="social-app.html">
                                                        <h5>Indonesian Navy Lauds Mental Perseverance of Teenager...</h5>
                                                        <span>Today's News Headlines, Breaking...</span>
                                                    </a>
                                                </div>
                                                <div className="flex-shrink-0"> 
                                                    <button className="btn">10 Min ago </button>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <img src="assets/images/dashboard/2.jpg" alt="" />
                                                <div className="flex-grow-1 ms-3">
                                                    <a href="social-app.html">
                                                        <h5>Why now may be the 'golden age' for Southeast asia start-ups...</h5>
                                                        <span>Check out the latest news from...</span>
                                                    </a>
                                                </div>
                                                <div className="flex-shrink-0"> 
                                                    <button className="btn">2 Min ago </button>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <img src="assets/images/dashboard/3.jpg" alt="" />
                                                <div className="flex-grow-1 ms-3">
                                                    <a href="social-app.html">
                                                        <h5>China's renewed crypto crackdown wipes nearly $400...</h5>
                                                        <span>Technology and indian business news...</span>
                                                    </a>
                                                </div>
                                                <div className="flex-shrink-0"> 
                                                    <button className="btn">14 Min ago </button>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <img src="assets/images/dashboard/4.jpg" alt="" />
                                                <div className="flex-grow-1 ms-3">
                                                    <a href="social-app.html">
                                                        <h5>Indonesian Navy Lauds Mental Perseverance of Teenager...</h5>
                                                        <span>Today's News Headlines, Breaking...</span>
                                                    </a>
                                                </div>
                                                <div className="flex-shrink-0"> 
                                                    <button className="btn">17 Min ago </button>
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