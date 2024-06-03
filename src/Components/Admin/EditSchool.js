import React,{useState, useEffect} from 'react'    
import {toast} from 'react-toastify'
import { useForm } from "react-hook-form"
import {ThreeDots} from 'react-loader-spinner'  
import {useSelector} from 'react-redux' 
import Breadcrum from '../Common/Breadcrum'

import {useParticularQuery, useEditMutation} from '../../redux/api/SchoolApi.js'

const EditSchool = () => {
    const globalState = useSelector((state)=>state.sessionData.value)
    const [pageName] = useState([{
        title_1 : 'UPDATE SCHOOL',
        title_2 : 'DELETE SELECTED ADMIN',
        title_3 : "EDIT ADMIN",
        title_4 : "ADMIN",
        title_5 : "ADD-MANAGE ADMIN'S",
    }])  
    const [dataID, setDataID] = useState(0)
    const [loaderVisible,setLoaderVisible] = useState(true)   

    const {register, handleSubmit, formState: { errors }, setValue} = useForm()
    
    const [editRecord] = useEditMutation() 
    const {data:getParticularRecord} = useParticularQuery(globalState.school_id)
 
    const resetSubmit = () => {
        setDataID(0) 
        setLoaderVisible(false)
    }
    const onSubmit = (data) => {
        editRecord({dataID,...data}).then((response)=>{
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
            setValue("school_email", getParticularRecord.data.school_email) 
            setValue("school_name", getParticularRecord.data.school_name)   
            setValue("school_number", getParticularRecord.data.school_number)  
            setValue("school_address", getParticularRecord.data.school_address)  
            setValue("school_about", getParticularRecord.data.school_about)  
            setValue("school_facebook_link", getParticularRecord.data.school_facebook_link)  
            setValue("school_instagram_link", getParticularRecord.data.school_instagram_link)   
            //setDataImage(<img src={(response.data.data.data_image)?response.data.data.data_image:'https://cdn.pixabay.com/photo/2014/04/03/10/25/reading-310397_1280.png'} className="d-block rounded modal-box-custom p-1" height="100" width="100" id="uploadedAvatar"/>)
            setLoaderVisible(false)
            setDataID(globalState.school_id) 
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
                <Breadcrum title={pageName[0].title_1} />  
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body-custom custom-card-list">
                                    <div className="form theme-form-old">
                                        <form method="POST" onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
                                            <div className="row"> 
                                                <div className="col-md-4 mb-3">
                                                    <label>School Name</label>
                                                    <input className="form-control" type="text" placeholder="School Name" {...register('school_name', { required: 'This field is required.' })}/>
                                                    {errors.school_name && <p className="text-danger error-custom-single">{errors.school_name.message}</p>}
                                                </div> 
                                                <div className="col-md-4 mb-3">
                                                    <label>School Email</label>
                                                    <input className="form-control" type="email" placeholder="School Email" {...register('school_email', { required: 'This field is required.' })}/>
                                                    {errors.school_email && <p className="text-danger error-custom-single">{errors.school_email.message}</p>}
                                                </div>  
                                                <div className="col-md-4 mb-3">
                                                    <label>School Phone</label>
                                                    <input className="form-control" type="number" placeholder="School Phone" {...register('school_number', { required: 'This field is required.' })}/>
                                                    {errors.school_number && <p className="text-danger error-custom-single">{errors.school_number.message}</p>}
                                                </div> 
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <label>Facebook Link</label>
                                                        <input className="form-control" type="text" placeholder="Facebook Link" {...register('school_facebook_link', { required: false })}/> 
                                                    </div>   
                                                    <div className="col-md-6 mb-3">
                                                        <label>Instagram Link</label>
                                                        <input className="form-control" type="text" placeholder="Instagram Link" {...register('school_instagram_link', { required: false })}/> 
                                                    </div> 
                                                </div> 
                                                <div className="col-md-12 mb-3">
                                                    <label>About School</label>
                                                    <textarea className="form-control" type="text" placeholder="Please write 2 line about your school." {...register('school_about', { required: false })}/> 
                                                </div> 
                                                <div className="col-md-12 mb-3">
                                                    <label>School Address</label>
                                                    <textarea className="form-control" type="text" placeholder="School Address" {...register('school_address', { required: false })}/> 
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
export default EditSchool