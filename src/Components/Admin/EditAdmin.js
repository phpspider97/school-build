import React,{useState, useEffect} from 'react'   
//import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
import { useForm } from "react-hook-form"
import {ThreeDots} from 'react-loader-spinner'  
 
import {useTokenBaseGetQuery, useTokenBaseEditMutation} from '../../redux/api/AdminApi.js'

const EditAdmin = () => {
    const [pageName] = useState([{
        title_1 : 'UPDATE ADMIN',
        title_2 : 'DELETE SELECTED ADMIN',
        title_3 : "EDIT ADMIN",
        title_4 : "ADMIN",
        title_5 : "ADD-MANAGE ADMIN'S",
    }])  
    const [dataID, setDataID] = useState(0)
    const [loaderVisible,setLoaderVisible] = useState(true)  
    const [adminState] = useState(['Punjab','Haryana','Himachal'])
    const [genderList] = useState(['Male','Female','Other'])
    const [bloodGroupList] = useState(['O+','A+','B+','AB+','O-','A-','B-','AB-'])

    const {register, handleSubmit, formState: { errors }, setValue} = useForm()
    
    const [editRecord] = useTokenBaseEditMutation() 
    const {data:getParticularRecord} = useTokenBaseGetQuery()
 
    const resetSubmit = () => {
        setDataID(0) 
        setLoaderVisible(false)
    }
    const onSubmit = (data) => {
        editRecord(data).then((response)=>{
            if(response?.data?.status){  
                toast.success(response.data.message) 
            }else{ 
                toast.error(response.error.data.message) 
            } 
        }).catch((err)=>{
            toast.error(`Error : ${err.message}`)
            setLoaderVisible(false)
        })
        resetSubmit()
    }

    useEffect(()=>{
        if(getParticularRecord !== undefined){ 
            setValue("admin_email", getParticularRecord.data.admin_email) 
            setValue("admin_name", getParticularRecord.data.admin_name) 
            setValue("admin_gender", getParticularRecord.data.admin_gender)  
            setValue("admin_blood_group", getParticularRecord.data.admin_blood_group)  
            setValue("admin_number", getParticularRecord.data.admin_number)   
            setValue("admin_country", getParticularRecord.data.admin_country)  
            setValue("admin_state", getParticularRecord.data.admin_state)  
            setValue("admin_city", getParticularRecord.data.admin_city)  
            setValue("admin_address", getParticularRecord.data.admin_address)  
            setValue("admin_about", getParticularRecord.data.admin_about)  
            setValue("admin_facebook_link", getParticularRecord.data.admin_facebook_link)  
            setValue("admin_instagram_link", getParticularRecord.data.admin_instagram_link)   
            //setDataImage(<img src={(response.data.data.data_image)?response.data.data.data_image:'https://cdn.pixabay.com/photo/2014/04/03/10/25/reading-310397_1280.png'} className="d-block rounded modal-box-custom p-1" height="100" width="100" id="uploadedAvatar"/>)
            setLoaderVisible(false)
        }
    },[getParticularRecord])
      
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body-custom custom-card-list">
                                    <div className="form theme-form-old">
                                        <form method="POST" onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
                                            <div className="row"> 
                                                <div className="col-md-4 mb-3">
                                                    <label>Admin Name</label>
                                                    <input className="form-control" type="text" placeholder="Admin Name" {...register('admin_name', { required: 'This field is required.' })}/>
                                                    {errors.admin_name && <p className="text-danger error-custom-single">{errors.admin_name.message}</p>}
                                                </div> 
                                                <div className="col-md-4 mb-3">
                                                    <label>Admin Email</label>
                                                    <input className="form-control" type="email" placeholder="Admin Email" {...register('admin_email', { required: 'This field is required.' })}/>
                                                    {errors.admin_email && <p className="text-danger error-custom-single">{errors.admin_email.message}</p>}
                                                </div> 
                                                <div className="col-md-4 mb-3">
                                                    <label>Admin Password</label>
                                                    <input className="form-control" type="password" placeholder="Admin Password" {...register('admin_password', { required: false })}/>
                                                    <span className="info-text-custom">For change password enter password.</span>
                                                </div> 
                                                <div className="col-md-4 mb-3">
                                                    <label>Admin Phone</label>
                                                    <input className="form-control" type="number" placeholder="Admin Phone" {...register('admin_number', { required: 'This field is required.' })}/>
                                                    {errors.admin_number && <p className="text-danger error-custom-single">{errors.admin_number.message}</p>}
                                                </div>
                                                <div className="col-md-4 mb-3">
                                                    <label>Admin State</label>
                                                    <select className="form-control" id="report" {...register('admin_state', { required: true })}>    
                                                        <option value="">Select</option> 
                                                        { adminState?.map((adminState,key)=>{
                                                            return(  
                                                                <option value={key+1}>{adminState}</option> 
                                                            )})
                                                        } 
                                                    </select> 
                                                    {errors.admin_state && <p className="text-danger error-custom-single">{errors.admin_state.message}</p>}
                                                </div> 
                                                <div className="col-md-4 mb-3">
                                                    <label>Admin City</label>
                                                    <input className="form-control" type="text" placeholder="Admin City" {...register('admin_city', { required: 'This field is required.' })}/>
                                                    {errors.admin_city && <p className="text-danger error-custom-single">{errors.admin_city.message}</p>}
                                                </div>
                                                <div className="col-md-4 mb-3">
                                                    <label>Select Gender</label>
                                                    <select className="form-control" id="report" {...register('admin_gender', { required: true })}>    
                                                        <option value="">Select</option> 
                                                        { (genderList)?genderList.map((genderData,key)=>{
                                                            return(  
                                                                <option value={genderData}>{genderData}</option> 
                                                            )}):''
                                                        } 
                                                    </select>
                                                    {errors.admin_gender && <p className="text-danger error-custom-single">{errors.admin_gender.message}</p>}
                                                </div> 
                                                <div className="col-md-4 mb-3">
                                                    <label>Select Gender</label>
                                                    <select className="form-control" id="report" {...register('admin_blood_group', { required: true })}>    
                                                        <option value="">Select</option> 
                                                        { (bloodGroupList)?bloodGroupList.map((bloogData,key)=>{
                                                            return(  
                                                                <option value={bloogData}>{bloogData}</option> 
                                                            )}):''
                                                        } 
                                                    </select>
                                                    {errors.admin_blood_group && <p className="text-danger error-custom-single">{errors.admin_blood_group.message}</p>}
                                                </div> 
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label>Facebook Link</label>
                                                        <input className="form-control" type="text" placeholder="Facebook Link" {...register('admin_facebook_link', { required: false })}/> 
                                                    </div>   
                                                    <div className="col-md-6 mb-3">
                                                        <label>Instagram Link</label>
                                                        <input className="form-control" type="text" placeholder="Instagram Link" {...register('admin_instagram_link', { required: false })}/> 
                                                    </div> 
                                                </div> 
                                                <div className="col-md-12 mb-3">
                                                    <label>About Admin</label>
                                                    <textarea className="form-control" type="text" placeholder="Please write 2 line about yourself." {...register('admin_about', { required: false })}/> 
                                                </div> 
                                                <div className="col-md-12 mb-3">
                                                    <label>Admin Address</label>
                                                    <textarea className="form-control" type="text" placeholder="Admin Address" {...register('admin_address', { required: false })}/> 
                                                </div>      

                                            </div>
                                            
                                            <div className="row">
                                                <div className="col">
                                                    <div className="text-end">
                                                        <button type="submit" className="btn btn-primary-gradien btn-lg me-3"><b>Update</b></button>
                                                        <button type="reset" className="btn btn-danger-gradien btn-lg"><b>Reset</b></button>
                                                        <ThreeDots
                                                            height="50"
                                                            width="50"
                                                            radius="9"
                                                            color="#696cff"
                                                            ariaLabel="three-dots-loading"
                                                            wrapperStyle={{}}
                                                            wrapperClassName=""
                                                            visible={loaderVisible}
                                                            className="text-center"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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
export default EditAdmin