import React,{useState} from 'react'
import { Link, NavLink } from 'react-router-dom' 
import {useSelector} from 'react-redux'
export default function MenuBar(){
    const globalState = useSelector((state)=>state.sessionData.value)
    const [userRole] = useState(globalState?.login_role)
    const [superAdminMenuLink] = useState([
        {'id':1,'name':'Dashboard','icon':'curved-left','link':'super','svgIconID':'fill-home'}, 
        {'id':1,'name':'Add School','icon':'curved-left','link':'super/school','svgIconID':'landing-avatar'},
    ]); 
    const [adminMenuLink] = useState([
        {'name':'Dashboard','icon':'curved-left','link':'admin','svgIconID':'fill-home'}, 
        {'name':'Edit School','icon':'curved-left','link':'admin/edit-school','svgIconID':'edit-content'},
        {'name':'Teacher','icon':'curved-left','link':'admin/add-teacher','svgIconID':'landing-avatar'},
        {'name':'Student','icon':'curved-left','link':'admin/add-student','svgIconID':'fill-user'},
        {'name':'Attendance','icon':'curved-left','link':'admin/student-attendance','svgIconID':'fill-task'},
        {'name':'Class','icon':'curved-left','link':'admin/add-class','svgIconID':'fill-board'},
        {'name':'Subject','icon':'curved-left','link':'admin/add-subject','svgIconID':'fill-board'},
        {'name':'Department','icon':'curved-left','link':'admin/add-department','svgIconID':'landing-button'},
        {'name':'Assignment','icon':'curved-left','link':'admin/add-assignment','svgIconID':'fill-file'},
        {'name':'Routine','icon':'curved-left','link':'admin/add-routine','svgIconID':'fill-icons'},
        {'name':'Exam','icon':'curved-left','link':'admin/add-exam-schedule','svgIconID':'dash'},
        {'name':'Attendance','icon':'curved-left','link':'admin/exam-attendance','svgIconID':'fill-task'},
        {'name':'Exam Mark','icon':'curved-left','link':'admin/exam-mark','svgIconID':'fill-bookmark'},
        {'name':'Noticeboard','icon':'curved-left','link':'admin/add-notice','svgIconID':'fill-calender'},
        {'name':'Event','icon':'curved-left','link':'admin/add-event','svgIconID':'fill-animation'},
        {'name':'Room','icon':'curved-left','link':'admin/add-room','svgIconID':'fill-animation'},
    ]); 
    return (
        <>
        <div className="sidebar-wrapper" data-layout="fill-svg"> 
            <div>
                <div className="logo-wrapper">
                    <Link to="/"><img className="img-fluid" src="https://cdn.pixabay.com/photo/2016/10/06/19/03/bus-1719744_1280.png" alt="logo" style={{width:'80px',height:'35px'}}/></Link>
                    <div className="toggle-sidebar">
                        <svg className="sidebar-toggle">
                            <use href="../assets/svg/icon-sprite.svg#toggle-icon"></use>
                        </svg>
                    </div>
                </div>
                <div className="logo-icon-wrapper">
                    <Link to="/">
                        <img className="img-fluid" src="https://cdn.pixabay.com/photo/2016/10/06/19/03/bus-1719744_1280.png" alt="logo" style={{width:'45px',height:'35px'}}/>
                    </Link>
                </div>
                <nav className="sidebar-main">
                    <div className="left-arrow" id="left-arrow"><i data-feather="arrow-left"></i></div>
                    <div id="sidebar-menu">
                        <ul className="sidebar-links" id="simple-bar">
                            <li className="back-btn">
                                <a href="index.html"><img className="img-fluid" src="../assets/images/logo/logo-icon.png" alt=""/></a>
                                <div className="mobile-back text-end"><span>Back</span><i className="fa fa-angle-right ps-2" aria-hidden="true"></i></div>
                            </li>
                            <li className="pin-title sidebar-main-title">
                                <div>
                                    <h6>Pinned</h6>
                                </div>
                            </li>
                            <li className="sidebar-main-title">
                                <div>
                                    <h6 className="lan-1">Menu List</h6>
                                </div>
                            </li> 

                            {(userRole === 'super')?superAdminMenuLink.map((menu_data,key)=>{
                                return ( 
                                    <li className="sidebar-list">
                                        {/* <i className="fa fa-thumb-tack"></i> */}
                                        <NavLink className="sidebar-link sidebar-title link-nav toggle-sidebar-custom" to={`/${menu_data.link}`}>
                                            <svg className="stroke-icon">
                                                <use href="../assets/svg/icon-sprite.svg#stroke-file"></use>
                                            </svg>
                                            <svg className="fill-icon">
                                                <use href={`../assets/svg/icon-sprite.svg#${menu_data.svgIconID}`}></use>
                                            </svg> 
                                            <span> 
                                                <i className={`icofont icofont-${menu_data.icon}`}></i>  {menu_data.name}  
                                            </span>
                                        </NavLink>
                                    </li> 
                                )
                            }):''} 

                            {(userRole === 'admin')?adminMenuLink.map((menu_data,key)=>{
                                return ( 
                                    <li className="sidebar-list">
                                        {/* <i className="fa fa-thumb-tack"></i> */}
                                        <NavLink className="sidebar-link sidebar-title link-nav toggle-sidebar-custom" to={`/${menu_data.link}`}>
                                            <svg className="stroke-icon">
                                                <use href="../assets/svg/icon-sprite.svg#stroke-file"></use>
                                            </svg>
                                            <svg className="fill-icon">
                                                <use href={`../assets/svg/icon-sprite.svg#${menu_data.svgIconID}`}></use>
                                            </svg> 
                                            <span> 
                                                <i className={`icofont icofont-${menu_data.icon}`}></i> {menu_data.name} 
                                            </span>
                                        </NavLink>
                                    </li> 
                                )
                            }):''}  

                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="fa fa-home"></i> &nbsp; Dashboard
                                    </span>
                                </Link>
                            </li> 
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/school" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Add School
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/edit-school" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Edit School
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/add-student" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Add Student
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/student-attendance" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Attendance
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/add-teacher" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Add Teacher
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/teacher-permission" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Permission
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/add-class" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Add Class
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/add-department" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Department
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/add-event" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Add Event
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/add-notice" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Noticeboard
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/add-subject" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Add Subject
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/add-exam-schedule" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Add Exam
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/exam-attendance" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Attendance
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/exam-mark" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Mark
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/add-room" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Add Room
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/add-assignment" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Assignment
                                    </span>
                                </Link>
                            </li>
                            <li className="sidebar-list d-none">
                                <i className="fa fa-thumb-tack"></i>
                                <Link to="/admin/add-routine" className="sidebar-link sidebar-title link-nav"> 
                                    <span> 
                                        <i className="icofont icofont-school-bus"></i> &nbsp; Routine
                                    </span>
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                    <div className="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
                </nav>
            </div>  
        </div> 
        </>
    )
}