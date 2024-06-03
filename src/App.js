import React,{Suspense} from "react"
import {HashRouter as Routers,Routes,Route} from 'react-router-dom'  
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useSelector} from 'react-redux'

import ProtectedRoute from './Components/Auth/ProtectedRoute'
import RedirectIfLogin from './Components/Auth/RedirectIfLogin'
// import MenuBar from './Components/Common/MenuBar'
// import Header from './Components/Common/Header'
// import Bottom from './Components/Common/Bottom' 
import Fallback from './Components/Common/Fallback' 

const MenuBar = React.lazy(() => import('./Components/Common/MenuBar'))
const Header = React.lazy(() => import('./Components/Common/Header'))
const Bottom = React.lazy(() => import('./Components/Common/Bottom'))

const Login = React.lazy(() => import('./Components/Auth/Login'))
const SuperAdmin = React.lazy(() => import('./Components/Super/Index'))
const AddSchool = React.lazy(() => import('./Components/Super/AddSchool'))
const Admin = React.lazy(() => import('./Components/Admin/Index')) 
const EditSchool = React.lazy(() => import('./Components/Admin/EditSchool')) 
const EditAdmin = React.lazy(() => import('./Components/Admin/EditAdmin'))
const AddTeacher = React.lazy(() => import('./Components/Teacher/AddTeacher'))
const AddStudent = React.lazy(() => import('./Components/Student/AddStudent'))
const AddClass = React.lazy(() => import('./Components/Teacher/AddClass'))
const AddDepartment = React.lazy(() => import('./Components/Teacher/AddDepartment')) 
const AddEvent = React.lazy(() => import('./Components/Admin/AddEvent')) 
const AddNotice = React.lazy(() => import('./Components/Admin/AddNotice')) 
const AddSubject = React.lazy(() => import('./Components/Admin/AddSubject')) 
const TeacherPermission = React.lazy(() => import('./Components/Teacher/TeacherPermission'))  
const StudentAttendance = React.lazy(() => import('./Components/Student/StudentAttendance')) 
const ExamAttendance = React.lazy(() => import('./Components/Teacher/ExamAttendance')) 
const ExamMark = React.lazy(() => import('./Components/Teacher/ExamMark')) 
const AddExamSchedule = React.lazy(() => import('./Components/Admin/AddExamSchedule')) 
const AddRoom = React.lazy(() => import('./Components/Admin/AddRoom')) 
const AddAssignment = React.lazy(() => import('./Components/Admin/AddAssignment')) 
const AddRoutine = React.lazy(() => import('./Components/Admin/AddRoutine')) 


const App = () => {  
    const globalState = useSelector((state)=>state.sessionData.value)
    return (
        <> 
            {/* <MenuBar /> */}
            <ToastContainer /> 
            <Routers> 
                <Suspense fallback={<Fallback />}>
                    <Routes>
                        <Route path="/" element={<Login/>} /> 
                        <Route element={<RedirectIfLogin />}>
                            <Route exact path="/" element={<Login/>} />
                        </Route> 
                    </Routes>
                    <div className="tap-top"><i data-feather="chevrons-up"></i></div>
                    <div className="page-wrapper compact-wrapper" id="pageWrapper">
                    {(globalState?.token != null)?<Header />:''}
                    <div className="page-body-wrapper horizontal-menu"> 
                    <div class="page-body-wrapper">
                    {(globalState?.token != null)?<MenuBar />:''} 
                    <Routes>     
                        <Route element={<ProtectedRoute />}>   
                            <Route exact path="/super" element={<SuperAdmin/>} />
                            <Route exact path="/super/school" element={<AddSchool/>} />
                            <Route exact path="/admin" element={<Admin/>} />
                            <Route exact path="/admin/edit-admin" element={<EditAdmin/>} />
                            <Route exact path="/admin/edit-school" element={<EditSchool/>} />
                            <Route exact path="/admin/add-teacher" element={<AddTeacher/>} />
                            <Route exact path="/admin/add-student" element={<AddStudent/>} />
                            <Route exact path="/admin/add-class" element={<AddClass/>} /> 
                            <Route exact path="/admin/add-department" element={<AddDepartment/>} />
                            <Route exact path="/admin/add-event" element={<AddEvent/>} />
                            <Route exact path="/admin/add-notice" element={<AddNotice/>} />
                            <Route exact path="/admin/add-subject" element={<AddSubject/>} />ExamAttendance
                            <Route exact path="/admin/teacher-permission" element={<TeacherPermission/>} />
                            <Route exact path="/admin/student-attendance" element={<StudentAttendance/>} />
                            <Route exact path="/admin/exam-attendance" element={<ExamAttendance/>} />
                            <Route exact path="/admin/exam-mark" element={<ExamMark/>} />
                            <Route exact path="/teacher/student-attendance" element={<StudentAttendance/>} />
                            <Route exact path="/admin/add-exam-schedule" element={<AddExamSchedule/>} />
                            <Route exact path="/admin/add-room" element={<AddRoom/>} />
                            <Route exact path="/admin/add-assignment" element={<AddAssignment/>} />
                            <Route exact path="/admin/add-routine" element={<AddRoutine/>} />
                        </Route>
                    </Routes> 
                    </div>
                    {(globalState?.token != null)?<Bottom />:''}
                    </div>
                    </div>
                </Suspense>
                
            </Routers>
        </>
    );
}  
export default App;