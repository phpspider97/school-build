import React,{useState,useEffect} from 'react'
import {Helmet} from "react-helmet"
import Breadcrum from '../Common/Breadcrum'
export default function Index() {
    const [pageName] = useState([{
        title_1 : 'Dashboard',
        title_2 : 'UPLOAD BULK SCHOOL',
        title_3 : "UPDATE SCHOOL'S PERMISSION",
        title_4 : "SCHOOL",
        title_5 : "ADD-MANAGE SCHOOL'S",
    }]); 
    const [isRender,setIsRender] = useState(false)
    useEffect(() => {
        setIsRender(true)
    }, []);
    return ( 
        <>  
            <div className="page-body">
                <Breadcrum title={pageName[0].title_1} /> 
                <div className="container-fluid general-widget">
                    <div className="row"> 
                        <div class="col-xl-6 col-xl-100 box-col-12">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div class="card since">
                                                <div class="card-body p-3">
                                                    <div class="customer-card d-flex b-l-primary border-2">
                                                        <div class="ms-3">
                                                            <h3 class="mt-1">Customers</h3>
                                                            <h5 class="mt-1">1.485</h5>
                                                        </div>
                                                        <div class="dashboard-user bg-light-primary">
                                                            <span></span>
                                                            <svg>
                                                                <use href="../assets/svg/icon-sprite.svg#male"></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="customer">
                                                        <span class="me-1">
                                                            <svg>
                                                                <use href="../assets/svg/icon-sprite.svg#arrow-up"></use>
                                                            </svg>
                                                        </span>
                                                        <span class="font-success me-2">+ 4.6%</span><span>Since last Week</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div class="card since">
                                                <div class="card-body money p-3">
                                                    <div class="customer-card d-flex b-l-secondary border-2">
                                                        <div class="ms-3">
                                                            <h3 class="mt-1">Revenue</h3>
                                                            <h5 class="mt-1">$5.873</h5>
                                                        </div>
                                                        <div class="dashboard-user bg-light-secondary">
                                                            <span></span>
                                                            <svg>
                                                                <use href="../assets/svg/icon-sprite.svg#money"></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="customer">
                                                        <span class="me-1">
                                                            <svg>
                                                                <use href="../assets/svg/icon-sprite.svg#arrow-up"></use>
                                                            </svg>
                                                        </span>
                                                        <span class="font-success me-2">+ 3.10%</span><span>Since last Week</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6">
                                            <div class="card since">
                                                <div class="card-body money p-3">
                                                    <div class="customer-card d-flex b-l-secondary border-2">
                                                        <div class="ms-3">
                                                            <h3 class="mt-1">Revenue</h3>
                                                            <h5 class="mt-1">$5.873</h5>
                                                        </div>
                                                        <div class="dashboard-user bg-light-secondary">
                                                            <span></span>
                                                            <svg>
                                                                <use href="../assets/svg/icon-sprite.svg#money"></use>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="customer">
                                                        <span class="me-1">
                                                            <svg>
                                                                <use href="../assets/svg/icon-sprite.svg#arrow-up"></use>
                                                            </svg>
                                                        </span>
                                                        <span class="font-success me-2">+ 3.10%</span><span>Since last Week</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-lg-12 box-col-12 xl-100">
                                            <div class="card">
                                                <div class="card-header">
                                                    <h3>School Created</h3>
                                                </div>
                                                <div class="card-body">
                                                    <div class="chart-container skill-chart">
                                                        <div id="revenuegrowth-2"></div>
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
            { isRender && (isRender === true)?
                <Helmet>  
                    <script src="/assets/js/chart/apex-chart/moment.min.js"></script>
                    <script src="/assets/js/chart/apex-chart/apex-chart.js"></script>
                    <script src="/assets/js/chart/apex-chart/stock-prices.js"></script>
                    <script src="/assets/js/chart-widget.js"></script>
                </Helmet>
                :''
            }
        </>
    )
}