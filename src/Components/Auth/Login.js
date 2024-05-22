import React,{useState, useEffect} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useForm} from 'react-hook-form'  
import {useLoginMutation as useSuperAdminLoginMutation} from '../../redux/api/SuperAdminApi.js'
import {useLoginMutation as useAdminLoginMutation} from '../../redux/api/AdminApi.js'
 
export default function Login() {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors }, setValue} = useForm()
    const [loaderVisible,setLoaderVisible] = useState(false)
    const [searchData, setSearchData] = useState('')
    const [searchParams] = useSearchParams()
    const [superAdminLogin] = useSuperAdminLoginMutation()
    const [adminLogin] = useAdminLoginMutation()

    const submitForm = (data) => { 
        setLoaderVisible(true)
        if(data.login_role === 'super'){
            superAdminLogin(data).then((response)=>{ 
                setLoaderVisible(false)   
                if(response?.data?.status){
                    sessionStorage.setItem('token',response.data.token)
                    sessionStorage.setItem('login_role',data.login_role) 
                    sessionStorage.setItem('user_name',response.data.data.super_admin_name)
                    sessionStorage.setItem('user_image',response.data.data.data_image)
                    toast.success(response.data.message) 
                    navigate('/super')
                }else{ 
                    toast.error(response.error.data.message)
                }
            }).catch((err)=>{
                setLoaderVisible(false)
                toast.error(`Error : ${err.message}`)
            }) 
        }else if(data.login_role === 'admin'){
            adminLogin(data).then((response)=>{ 
                setLoaderVisible(false) 
                if(response?.data?.status){
                    sessionStorage.setItem('token',response.data.token)
                    sessionStorage.setItem('school_id',response.data.data.school_id)
                    sessionStorage.setItem('login_role',data.login_role) 
                    sessionStorage.setItem('user_name',response.data.data.admin_name)
                    sessionStorage.setItem('user_image',response.data.data.data_image)
                    toast.success(response.data.message) 
                    navigate('/admin')
                }else{ 
                    toast.error(response.error.data.message)
                }
            }).catch((err)=>{
                setLoaderVisible(false)
                toast.error(`Error : ${err.message}`)
            })
        }
    } 
    // const updateAdminCredential = (role) => { 
    //     if(role === 'admin'){
    //         setValue("email", "admin@gmail.com")
    //         setValue("password", 'Admin123@#')
    //     }else if(role === 'teacher'){
    //         setValue("email", "teacher-214-1@gmail.com")
    //         setValue("password", 123456)
    //     }else if(role === 'student'){
    //         setValue("email", "student-1167-1@gmail.com")
    //         setValue("password", 123456)
    //     }else{
    //         setValue("email", "pcartwright@example.org")
    //         setValue("password", 123456)
    //     } 
    // }
    //var pwShown = 0
    // const eyeClick = () => {
    //     if(pwShown === 0) {
    //         pwShown = 1
    //         document.getElementById('password').setAttribute('type', 'text')
    //         document.getElementById("pass_icon").classList.remove("bx-hide")
    //         document.getElementById("pass_icon").classList.add("bx-show")
    //     }else{
    //         pwShown = 0
    //         document.getElementById('password').setAttribute('type', 'password')
    //         document.getElementById("pass_icon").classList.remove("bx-show")
    //         document.getElementById("pass_icon").classList.add("bx-hide")
    //     }
    // }
    useEffect(()=>{
		let searchValue = searchParams.get('role')
        if(searchValue === 'super'){
		    setSearchData(searchValue)
        }
	}, []) 
    return (
        <div className="container-fluid p-0"> 
            {loaderVisible?
                <div class="loader-wrapper">
                    <div class="theme-loader">    
                        <div class="loader-p"></div>
                    </div>
            </div>:''} 
            <div className="row m-0">
                <div className="col-12 p-0">
                    <div className="login-card login-dark">
                        <div>
                            <div>
                                <a className="logo" href="index.html">
                                    <img className="img-fluid for-light" src="../assets/images/logo/logo-1.png" alt="looginpage" />
                                    <img className="img-fluid for-dark" src="../assets/images/logo/logo.png" alt="looginpage" />
                                </a>
                            </div> 
                            <div className="login-main"> 
                                <form id="formAuthentication" className="theme-form-old" onSubmit={handleSubmit(submitForm)} method="POST">
                                    <h3>Sign in to account</h3>
                                    <p>Enter your email & password to login</p>
                                       
                                    <div className="card-body common-flex main-radio-toggle mb-2"> 
                                  

                                        { searchData === null || searchData === ''?
                                            <div className="login-radio-div-custom horizontal-scroll">
                                                <input className="btn-check radio-light-primary" id="option1" type="radio" {...register('login_role', { required: true })} value="admin" />
                                                <label className="btn list-light-white custom-login-button" for="option1"><i className="fa fa-user"></i> Admin</label>

                                                <input className="btn-check radio-light-primary" id="option2" type="radio" {...register('login_role', { required: true })} value="teacher" />
                                                <label className="btn list-light-white custom-login-button" for="option2"><i className="fa fa-user"></i> Teacher</label>

                                                <input className="btn-check radio-light-primary" id="option3" type="radio" {...register('login_role', { required: true })} value="student" />
                                                <label className="btn list-light-white custom-login-button" for="option3"><i className="fa fa-user"></i> Student</label>
                                            </div>
                                            :
                                            <>
                                                <input className="btn-check radio-light-primary" id="option5" type="radio" {...register('login_role', { required: true })} value="super"/>
                                                <label className="btn list-light-light w-100 b-dark rounded-3" for="option5"><i className="fa fa-user"></i> Super Admin</label>
                                            </> 
                                        } 
                                        {errors.login_role && <p className="text-danger error-custom-single">Please select your role.</p>}
                                    </div> 
                                    <hr />
                                    <div className="form-group">
                                        <label className="col-form-label">Email Address</label>
                                        <input className="form-control" type="email" placeholder="Test@gmail.com" {...register("email", { required: 'This field is required.' })}/>
                                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Password</label>
                                        <div className="form-input position-relative">
                                            <input className="form-control" type="password" placeholder="*********" {...register("password", { required: 'This field is required', minLength: { value: 4, message: 'Password must be at least 8 characters'} })}/>
                                            <div className="show-hide" id="hide-show-click">
                                                <span className="show"></span>
                                            </div>
                                        </div>
                                        {errors.password && <span className="error-message">{errors.password.message}</span>}
                                    </div>
                                    <div className="form-group mb-0">
                                        <div className="checkbox p-0">
                                            <input id="checkbox1" type="checkbox" />
                                            <label className="text-muted" htmlFor="checkbox1">Remember password</label>
                                        </div>
                                        <a className="link" href="forget-password.html">Forgot password?</a>
                                        <div className="text-end mt-3">
                                            <button className="btn btn-primary btn-block w-100" type="submit">Sign in</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}