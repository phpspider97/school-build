import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner'   
import Breadcrum from '../Common/Breadcrum'
import BulkTeacherModal from './BulkTeacherModal'

import {useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularListQuery, useLazyListQuery} from '../../redux/api/TeacherApi.js'
  
export default function Index() {
    const [pageName] = useState([{
        title_1 : 'ADD TEACHER',
        title_2 : 'DELETE SELECTED TEACHER',
        title_3 : "EDIT TEACHER",
        title_4 : "TEACHER",
        title_5 : "ADD-MANAGE TEACHER'S",
        title_6 : "UPLOAD BULK TEACHER'S",
    }])

    const [data,setData] = useState([]) 
    const [dataID, setDataID] = useState(0) 
    const [bulkRecordID,setBulkRecordID] = useState([])
    const [deleteDisabled,setDeleteDisabled] = useState(true)
    const [loaderVisible,setLoaderVisible] = useState(true)   
    const [adminState] = useState(['Punjab','Haryana','Himachal'])
    const [genderList] = useState(['Male','Female','Other'])
    const [bloodGroupList] = useState(['O+','A+','B+','AB+','O-','A-','B-','AB-'])
    const [displayTeacherModal,setDisplayTeacherModal] = useState(false)

    const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm()
 
    const [addRecord] = useAddMutation() 
    const [editRecord] = useEditMutation()
    const [deleteRecord] = useDeleteMutation()
    const [deleteBulkRecord] = useDeleteBulkMutation()
    const [getAllRecord,{data:getAllValidationRecord}] = useLazyListQuery()
    const [getParticularRecord] = useLazyParticularListQuery()
 
    const columns = [
        {
          name: '#',
          selector: (row,key) => key+1,
          width:'50px'
        },
        {
          name: 'Name',
          selector: row => row.teacher_name
        },
        {
            name: 'Email',
            selector: row => row.teacher_email
          },
        {
            name: 'Status',
            selector: row => (row.is_active == 1)?<span className="badge rounded-pill badge-success me-1">Active</span>:<span className="badge rounded-pill badge-danger me-1">De-active</span>,
        },
        {
            name: 'Action',
            selector: row => <>  
                <i className="icofont icofont-ui-edit me-2 edit-link-custom" onClick={()=>{openEditModal(row._id)}} title="Edit record"></i> 
                <i className="icofont icofont-ui-delete me-2 delete-link-custom" onClick={()=>{   
                    deleteData(row._id) 
                    setLoaderVisible(true)
                }} title="Delete record"></i>  
            </>
        },
    ]
    const resetSubmit = () => {  
        reset() 
        setDataID(0)
        document.getElementById('close-modal').click()
        setLoaderVisible(false)
    }
    const onSubmit = (data) => { 
        if(dataID === 0){
            addRecord(data).then((response)=>{
                if(response?.data?.status){  
                    toast.success(response.data.message) 
                }else{ 
                    toast.error(response.error.data.message) 
                }
            }).catch((err)=>{ 
                toast.error(`Error : ${err.message}`)
            })
            resetSubmit()
        }else{ 
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
    }

    const openEditModal = async (record_id) => {   
        setDataID(record_id) 
        document.getElementById('open-modal').click() 
        getParticularRecord(record_id).then((response)=>{  
            setValue("teacher_email", response.data.data.teacher_email) 
            setValue("teacher_name", response.data.data.teacher_name) 
            setValue("teacher_gender", response.data.data.teacher_gender)  
            setValue("teacher_blood_group", response.data.data.teacher_blood_group)  
            setValue("teacher_number", response.data.data.teacher_number)   
            setValue("teacher_country", response.data.data.teacher_country)  
            setValue("teacher_state", response.data.data.teacher_state)  
            setValue("teacher_city", response.data.data.teacher_city)  
            setValue("teacher_address", response.data.data.teacher_address)  
            setValue("teacher_about", response.data.data.teacher_about)  
            setValue("teacher_facebook_link", response.data.data.teacher_facebook_link)  
            setValue("teacher_instagram_link", response.data.data.teacher_instagram_link)  
            setValue("is_active", response.data.data.is_active)  
        }).catch((err)=>{
            toast.error(`Error : ${err.message}`)
            setLoaderVisible(false)
        })
    }
    const deleteData = async (record_id) => {
        let text = "Are you sure to delete this record?";
        if(window.confirm(text) === true) {
            deleteRecord(record_id).then((response)=>{
                if(response?.data?.status){  
                    toast.success(response.data.message)
                    setLoaderVisible(false)
                }else{ 
                    toast.error(response.error.data.message) 
                }
            }).catch((err)=>{ 
                toast.error(`Error : ${err.message}`)
            })
        }
    }
    const deleteBulkData = async () => {
        let text = "Are you sure to delete this record?";
        if(window.confirm(text) === true) {
            deleteBulkRecord(bulkRecordID).then((response)=>{
                if(response?.data?.status){
                    toast.success(response.data.message)
                    setLoaderVisible(false)
                    setDeleteDisabled(true)
                }else{ 
                    toast.error(response.error.data.message) 
                }
            }).catch((err)=>{ 
                toast.error(`Error : ${err.message}`)
            })
        }
    }
    
    useEffect(()=>{  
        getAllRecord().then((response)=>{ 
            setData(response?.data?.data) 
            setLoaderVisible(false)
        }).catch((err)=>{ 
            toast.error(`Error : ${err.message}`)
        })
    },[getAllValidationRecord,displayTeacherModal])

    const handleChange = ({ selectedRows }) => {
        setDeleteDisabled(true)
        let selected_value = []
        selectedRows.map((data)=>{
            selected_value.push(data._id)
        })
        if(selected_value.length>0){
            setDeleteDisabled(false)
        }
        setBulkRecordID(selected_value) 
    }
    const checkDisplayBulkTeacherModal = (data) => {
        setDisplayTeacherModal(data)
    } 
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
                                <div className="card-body custom-card-list">
                                    <div className="list-product-header">
                                        <div> 
                                            {(!deleteDisabled)?
                                            <button className="btn btn-danger-gradien btn-sm" type="button" onClick={()=> { deleteBulkData() 
                                            setLoaderVisible(true) } } disabled={deleteDisabled}>
                                                <b>{pageName[0].title_2}</b>
                                            </button> 
                                            :''}

                                            <button className="btn btn-info-gradien btn-sm" type="button" onClick={()=>{   
                                                setDisplayTeacherModal(true)  
                                            }}>
                                                <b>{pageName[0].title_6}</b>
                                            </button> 

                                            <button className="btn btn-primary-gradien btn-sm" type="button" data-bs-toggle="modal" data-bs-target=".bd-example-modal-fullscreen" id="open-modal" onClick={()=>reset()}>
                                                <b>{pageName[0].title_1}</b>
                                            </button> 
                                        </div> 
                                    </div>
                                    <div className="list-product"> 
                                        <DataTable
                                            columns={columns}
                                            data={data}
                                            pagination
                                            selectableRows
                                            onSelectedRowsChange={handleChange}  
                                            persistTableHead  
                                        />    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                    
                <div className="modal fade bd-example-modal-fullscreen" tabindex="-1" role="dialog" aria-labelledby="myFullLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myFullLargeModalLabel">{pageName[0].title_5}</h4>
                            <button className="btn-close py-1" type="button" data-bs-dismiss="modal" aria-label="Close" id="close-modal" onClick={()=>{setDataID(0)}}></button>
                        </div>
                        <div className="modal-body dark-modal"> 
                            <div className="row border-dark">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form method="POST" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                                <div className="form theme-f">
                                                <div className="row"> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Teacher Name</label>
                                                            <input className="form-control" type="text" placeholder="Teacher Name" {...register('teacher_name', { required: 'This field is required.' })}/>
                                                            {errors.teacher_name && <p className="text-danger error-custom-single">{errors.teacher_name.message}</p>}
                                                        </div> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Teacher Email</label>
                                                            <input className="form-control" type="email" placeholder="Teacher Email" {...register('teacher_email', { required: 'This field is required.' })}/>
                                                            {errors.teacher_email && <p className="text-danger error-custom-single">{errors.teacher_email.message}</p>}
                                                        </div> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Teacher Password</label>
                                                            <input className="form-control" type="password" placeholder="Teacher Password" {...register('teacher_password', { required: false })}/>
                                                            <span className="info-text-custom">For change password enter password.</span>
                                                        </div> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Teacher Phone</label>
                                                            <input className="form-control" type="number" placeholder="Teacher Phone" {...register('teacher_number', { required: 'This field is required.' })}/>
                                                            {errors.teacher_number && <p className="text-danger error-custom-single">{errors.teacher_number.message}</p>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Teacher State</label>
                                                            <select className="form-control" id="report" {...register('teacher_state', { required: true })}>    
                                                                <option value="">Select</option> 
                                                                { adminState?.map((adminState,key)=>{
                                                                    return(  
                                                                        <option value={key+1}>{adminState}</option> 
                                                                    )})
                                                                } 
                                                            </select> 
                                                            {errors.teacher_state && <p className="text-danger error-custom-single">{errors.teacher_state.message}</p>}
                                                        </div> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Teacher City</label>
                                                            <input className="form-control" type="text" placeholder="Teacher City" {...register('teacher_city', { required: 'This field is required.' })}/>
                                                            {errors.teacher_city && <p className="text-danger error-custom-single">{errors.teacher_city.message}</p>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Select Gender</label>
                                                            <select className="form-control" id="report" {...register('teacher_gender', { required: true })}>    
                                                                <option value="">Select</option> 
                                                                { (genderList)?genderList.map((genderData,key)=>{
                                                                    return(  
                                                                        <option value={genderData}>{genderData}</option> 
                                                                    )}):''
                                                                } 
                                                            </select>
                                                            {errors.teacher_gender && <p className="text-danger error-custom-single">{errors.teacher_gender.message}</p>}
                                                        </div> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Select Blood Group</label>
                                                            <select className="form-control" id="report" {...register('teacher_blood_group', { required: true })}>    
                                                                <option value="">Select</option> 
                                                                { (bloodGroupList)?bloodGroupList.map((bloogData,key)=>{
                                                                    return(  
                                                                        <option value={bloogData}>{bloogData}</option> 
                                                                    )}):''
                                                                } 
                                                            </select>
                                                            {errors.teacher_blood_group && <p className="text-danger error-custom-single">{errors.teacher_blood_group.message}</p>}
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-md-6 mb-3">
                                                                <label>Facebook Link</label>
                                                                <input className="form-control" type="text" placeholder="Facebook Link" {...register('teacher_facebook_link', { required: false })}/> 
                                                            </div>   
                                                            <div className="col-md-6 mb-3">
                                                                <label>Instagram Link</label>
                                                                <input className="form-control" type="text" placeholder="Instagram Link" {...register('teacher_instagram_link', { required: false })}/> 
                                                            </div> 
                                                        </div> 
                                                        <div className="col-md-12 mb-3">
                                                            <label>About Teacher</label>
                                                            <textarea className="form-control" type="text" placeholder="Please write 2 line about yourself." {...register('teacher_about', { required: false })}/> 
                                                        </div> 
                                                        <div className="col-md-12 mb-3">
                                                            <label>Teacher Address</label>
                                                            <textarea className="form-control" type="text" placeholder="Teacher Address" {...register('teacher_address', { required: false })}/> 
                                                        </div>      
                                                        <div className="col-md-12"> 
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" id="flexSwitchCheckDefault" type="checkbox" role="switch" {...register('is_active', { required: false })} />
                                                                <label className="form-check-label"  for="flexSwitchCheckDefault">Is Active</label>
                                                            </div>
                                                        </div>            
                                                    </div> 
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="text-end">   
                                                                <button type="submit" className="btn btn-primary-gradien btn-lg border-dark me-3">
                                                                    <b>Save</b>
                                                                </button>
                                                                <button type="reset" className="btn btn-danger-gradien btn-lg border-dark">
                                                                    <b>Reset</b>
                                                                </button>
                                                            </div>
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
            </div>
            <BulkTeacherModal isDisplayModal={displayTeacherModal} checkDisplayBulkTeacherModal={checkDisplayBulkTeacherModal}/> 
        </div>    
    </>
    )
}