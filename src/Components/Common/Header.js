import React from 'react'
import {useSelector} from 'react-redux' 
import {Link, useNavigate} from 'react-router-dom'
export default function Header() { 
    const globalState = useSelector((state)=>state.sessionData.value)
    const navigation = useNavigate()
    const logout = () => {
        sessionStorage.clear() 
        navigation('/')
    }
    return (
        <div className="page-header">
            <div className="header-wrapper row m-0">
                <div className="header-logo-wrapper col-auto p-0">
                    <div className="logo-wrapper"><a href="index.html"><img className="img-fluid for-light" src="../assets/images/logo/logo-1.png" alt=""/><img className="img-fluid for-dark" src="../assets/images/logo/logo.png" alt=""/></a></div>
                    <div className="toggle-sidebar">
                        <svg className="sidebar-toggle">
                            <use href="../assets/svg/icon-sprite.svg#stroke-animation"></use>
                        </svg>
                    </div>
                </div>
                
                <div className="nav-right col-xxl-7 col-xl-6 col-auto box-col-6 pull-right right-header p-0 ms-auto">
                    <ul className="nav-menus">  
                        <li className="profile-nav onhover-dropdown p-0">
                            <div className="d-flex align-items-center profile-media">
                                <img className="b-r-10 img-40" src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" alt=""/>
                                <div className="flex-grow-1">
                                    <span>{globalState?.user_name}</span>
                                    <p className="mb-0">{globalState?.login_role?.toUpperCase()} <i className="middle fa fa-angle-down"></i></p>
                                </div>
                            </div>
                            <ul className="profile-dropdown onhover-show-div">
                                {/* <li><a href="user-profile.html"><i data-feather="user"></i><span>Account </span></a></li>
                                <li><a href="email-application.html"><i data-feather="mail"></i><span>Inbox</span></a></li>
                                <li><a href="task.html"><i data-feather="file-text"></i><span>Taskboard</span></a></li> */}
                                <li>
                                    <Link to="/admin/edit-admin">
                                        <i data-feather="settings"></i><span>Edit Profile</span>
                                    </Link>
                                </li>
                                <li><a href="#" onClick={()=>{logout()}}><i data-feather="log-in"> </i><span>Log out</span></a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <script className="result-template" type="text/x-handlebars-template">
                    <div className="ProfileCard u-cf">                        
                        <div className="ProfileCard-avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-airplay m-0"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon></svg>
                        </div>
                        <div className="ProfileCard-details">
                            <div className="ProfileCard-realName">Name</div>
                        </div>
                    </div>
                </script>
                <script className="empty-template" type="text/x-handlebars-template">
                    <div className="EmptyMessage">Your search turned up 0 results. This most likely means the backend is down, yikes!</div>
                </script>
            </div>
        </div> 
    )
}
