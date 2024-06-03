import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner'  
import Breadcrum from '../Common/Breadcrum'
import BulkStudentModal from './BulkStudentModal'

import {useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularListQuery, useLazyListQuery} from '../../redux/api/StudentApi.js'

import {useLazyListQuery as useLazyClassListQuery} from '../../redux/api/ClassApi.js'

export default function AddStudent() {
    const [pageName] = useState([{
        title_1 : 'ADD STUDENT',
        title_2 : 'DELETE SELECTED STUDENT',
        title_3 : "EDIT STUDENT",
        title_4 : "STUDENT",
        title_5 : "ADD-MANAGE STUDENT'S",
        title_6 : "UPLOAD BULK STUDENT'S",
    }])

    const [data,setData] = useState([]) 
    const [classData,setClassData] = useState([]) 
    const [sectionData,setSectionData] = useState([]) 
    const [dataID, setDataID] = useState(0) 
    const [bulkRecordID,setBulkRecordID] = useState([])
    const [deleteDisabled,setDeleteDisabled] = useState(true)
    const [loaderVisible,setLoaderVisible] = useState(true)   
    const [adminState] = useState(['Punjab','Haryana','Himachal'])
    const [genderList] = useState(['Male','Female','Other'])
    const [bloodGroupList] = useState(['O+','A+','B+','AB+','O-','A-','B-','AB-'])
    const [displayStudentModal,setDisplayStudentModal] = useState(false)

    const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm()
 
    const [addRecord] = useAddMutation() 
    const [editRecord] = useEditMutation()
    const [deleteRecord] = useDeleteMutation()
    const [deleteBulkRecord] = useDeleteBulkMutation()
    const [getAllRecord,{data:getAllValidationRecord}] = useLazyListQuery()
    const [getParticularRecord] = useLazyParticularListQuery()
    const [getAllClassRecord,{data:getAllValidationClassRecord}] = useLazyClassListQuery()
 
    const columns = [
        {
          name: '#',
          selector: (row,key) => key+1,
          width:'50px'
        },
        {
            name: 'Class',
            selector: row => 'One'
        },
        {
        name: 'Section',
        selector: row => 'A'
        },
        {
          name: 'Name',
          selector: row => row.student_name
        },
        {
            name: 'Email',
            selector: row => row.student_email
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
            setValue("student_class", response.data.data.student_class)  
            setValue("student_email", response.data.data.student_email) 
            setValue("student_name", response.data.data.student_name) 
            setValue("student_gender", response.data.data.student_gender)  
            setValue("student_blood_group", response.data.data.student_blood_group)  
            setValue("student_number", response.data.data.student_number)   
            setValue("student_country", response.data.data.student_country)  
            setValue("student_state", response.data.data.student_state)  
            setValue("student_city", response.data.data.student_city)  
            setValue("student_address", response.data.data.student_address)  
            setValue("student_about", response.data.data.student_about)  
            setValue("student_facebook_link", response.data.data.student_facebook_link)  
            setValue("student_instagram_link", response.data.data.student_instagram_link)  
            setValue("is_active", response.data.data.is_active)  
            updateSectionData()
            setTimeout(() => {
                setValue("student_section", response.data.data.student_section)
            }, 300)
                     
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
    },[getAllValidationRecord,displayStudentModal])

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
    
    const getClassData = () => {
        getAllClassRecord().then((response)=>{ 
            setClassData(response?.data?.data) 
            setLoaderVisible(false)
        }).catch((err)=>{ 
            toast.error(`Error : ${err.message}`)
        })
    }
    useEffect(()=>{  
        getClassData()
    },[getAllValidationClassRecord])

    const updateSectionData = () => {  
        const select_id = document.getElementById('classSelectBox')
        const select_data = select_id.options[select_id.selectedIndex].id
        const class_data = JSON.parse(select_data) 
        setSectionData(class_data.class_section)
    }
    const checkDisplayBulkStudentModal = (data) => {
        setDisplayStudentModal(data)
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
                                                setDisplayStudentModal(true)  
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
                                                            <label>Student Class</label>
                                                            <select className="form-control" {...register('student_class', { required: true })} onChange={(e)=>updateSectionData(e)} id="classSelectBox">    
                                                            <option value="">Select Class</option>
                                                                { (classData)?classData.map((classItem,key)=>{
                                                                    return(  
                                                                        <option value={classItem._id} id={JSON.stringify(classItem)} key={key}>{classItem.class_name}</option> 
                                                                    )}):''
                                                                }  
                                                            </select> 
                                                            {errors.student_class && <p className="text-danger error-custom-single">{errors.student_class.message}</p>}
                                                        </div> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Student Section</label>
                                                            <select className="form-control" {...register('student_section', { required: true })}>    
                                                                <option value="">Select Section</option>
                                                                { (sectionData)?sectionData.map((sectionItem,key)=>{
                                                                    return(  
                                                                        <option value={sectionItem._id} key={key}>{sectionItem.section_name}</option> 
                                                                    )}):''
                                                                } 
                                                            </select> 
                                                            {errors.student_section && <p className="text-danger error-custom-single">{errors.student_section.message}</p>}
                                                        </div>  
                                                        <div className="col-md-4 mb-3 position-relative">
                                                            <label className="form-label">Student Name</label>
                                                            <div className="input-group">
                                                                <span className="input-group-text" id="basic-addon1">
                                                                    <i className="icofont icofont-boy"></i>
                                                                </span>
                                                                <input className="form-control" type="text" placeholder="Student Name" {...register('student_name', { required: 'This field is required.' })}/> 
                                                            </div>
                                                            {errors.student_name && <p className="text-danger error-custom-single">{errors.student_name.message}</p>}
                                                        </div> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Student Email</label>
                                                            <input className="form-control" type="email" placeholder="Student Email" {...register('student_email', { required: 'This field is required.' })}/>
                                                            {errors.student_email && <p className="text-danger error-custom-single">{errors.student_email.message}</p>}
                                                        </div> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Student Password</label>
                                                            <input className="form-control" type="password" placeholder="Student Password" {...register('student_password', { required: false })}/>
                                                            <span className="info-text-custom">For change password enter password.</span>
                                                        </div> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Student Phone</label>
                                                            <input className="form-control" type="number" placeholder="Student Phone" {...register('student_number', { required: 'This field is required.' })}/>
                                                            {errors.student_number && <p className="text-danger error-custom-single">{errors.student_number.message}</p>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Student State</label>
                                                            <select className="form-control" {...register('student_state', { required: true })}>    
                                                                <option value="">Select</option> 
                                                                { adminState?.map((adminState,key)=>{
                                                                    return(  
                                                                        <option value={key+1}>{adminState}</option> 
                                                                    )})
                                                                } 
                                                            </select> 
                                                            {errors.student_state && <p className="text-danger error-custom-single">{errors.student_state.message}</p>}
                                                        </div> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Student City</label>
                                                            <input className="form-control" type="text" placeholder="Student City" {...register('student_city', { required: 'This field is required.' })}/>
                                                            {errors.student_city && <p className="text-danger error-custom-single">{errors.student_city.message}</p>}
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label>Select Gender</label>
                                                            <select className="form-control" {...register('student_gender', { required: true })}>    
                                                                <option value="">Select</option> 
                                                                { (genderList)?genderList.map((genderData,key)=>{
                                                                    return(  
                                                                        <option value={genderData}>{genderData}</option> 
                                                                    )}):''
                                                                } 
                                                            </select>
                                                            {errors.student_gender && <p className="text-danger error-custom-single">{errors.student_gender.message}</p>}
                                                        </div> 
                                                        <div className="col-md-4 mb-3">
                                                            <label>Select Blood Group</label>
                                                            <select className="form-control" {...register('student_blood_group', { required: true })}>    
                                                                <option value="">Select</option> 
                                                                { (bloodGroupList)?bloodGroupList.map((bloogData,key)=>{
                                                                    return(  
                                                                        <option value={bloogData}>{bloogData}</option> 
                                                                    )}):''
                                                                } 
                                                            </select>
                                                            {errors.student_blood_group && <p className="text-danger error-custom-single">{errors.student_blood_group.message}</p>}
                                                        </div> 
                                                        <div className="row">
                                                            <div className="col-md-6 mb-3">
                                                                <label>Facebook Link</label>
                                                                <input className="form-control" type="text" placeholder="Facebook Link" {...register('student_facebook_link', { required: false })}/> 
                                                            </div>   
                                                            <div className="col-md-6 mb-3">
                                                                <label>Instagram Link</label>
                                                                <input className="form-control" type="text" placeholder="Instagram Link" {...register('student_instagram_link', { required: false })}/> 
                                                            </div> 
                                                        </div> 
                                                        <div className="col-md-12 mb-3">
                                                            <label>About student</label>
                                                            <textarea className="form-control" type="text" placeholder="Please write 2 line about yourself." {...register('student_about', { required: false })}/> 
                                                        </div> 
                                                        <div className="col-md-12 mb-3">
                                                            <label>Student Address</label>
                                                            <textarea className="form-control" type="text" placeholder="Student Address" {...register('student_address', { required: false })}/> 
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
            <BulkStudentModal isDisplayModal={displayStudentModal} checkDisplayBulkStudentModal={checkDisplayBulkStudentModal}/>
        </div>    
    </>
    )
}