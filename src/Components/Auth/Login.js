import React,{useState, useEffect} from 'react'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useForm} from 'react-hook-form'  
import { useDispatch } from 'react-redux';
import {useLoginMutation as useSuperAdminLoginMutation} from '../../redux/api/SuperAdminApi.js'
import {useLoginMutation as useAdminLoginMutation} from '../../redux/api/AdminApi.js'
import { setCredential } from '../../redux/storeData/StoreData.js'
 
export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
                    dispatch(setCredential({
                        token:response.data.token,
                        login_role:data.login_role,
                        user_name:response.data.data.super_admin_name,
                        user_image:response.data.data.data_image,
                    }))
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
                    dispatch(setCredential({
                        token:response.data.token,
                        login_role:data.login_role,
                        user_name:response.data.data.super_admin_name,
                        user_image:response.data.data.data_image,
                        school_id:response.data.data.school_id,
                    }))
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
                <div className="loader-wrapper">
                    <div className="theme-loader">    
                        <div className="loader-p"></div>
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

                                    <div className="col-md-12">
                                        <div className="card-wrapper border rounded-3 checkbox-checked">
                                            <h6 className="sub-title">Please select your role!!</h6>
                                            { searchData === null || searchData === ''? 
                                                <div className="form-check-size mt-3">
                                                    <div className="form-check form-check-inline radio radio-primary">
                                                        <input className="form-check-input" id="radioinline1" type="radio" {...register('login_role', { required: true })} value="admin" />
                                                        <label className="form-check-label" for="radioinline1">Admin</label>
                                                    </div>
                                                    <div className="form-check form-check-inline radio radio-primary">
                                                        <input className="form-check-input" id="radioinline2" type="radio"  {...register('login_role', { required: true })} value="teacher" />
                                                        <label className="form-check-label" for="radioinline2">Teacher</label>
                                                    </div>
                                                    <div className="form-check form-check-inline radio radio-primary">
                                                        <input className="form-check-input" id="radioinline3" type="radio"  {...register('login_role', { required: true })} value="student" />
                                                        <label className="form-check-label" for="radioinline3">Student</label>
                                                    </div>
                                                </div>
                                            : 
                                            <div className="form-check-size mt-3">
                                                <div className="form-check form-check-inline radio radio-primary">
                                                    <input className="form-check-input" id="radioinline1" type="radio" {...register('login_role', { required: true })} value="super" />
                                                    <label className="form-check-label" for="radioinline1">Super</label>
                                                </div>
                                            </div>}
                                        </div>

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