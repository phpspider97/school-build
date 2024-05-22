import React,{useState, useEffect} from 'react'
import {useForm} from "react-hook-form"
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
//import {ThreeDots} from 'react-loader-spinner'

import {useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularQuery, useLazyListQuery} from '../../redux/api/AssignmentApi.js' 
import {useLazyListQuery as useLazyClassListQuery} from '../../redux/api/ClassApi.js' 

export default function AddExamSchedule() {
    const [pageName] = useState([{
        title_1 : 'ADD ASSIGNMENT',
        title_2 : 'DELETE SELECTED ASSIGNMENT',
        title_3 : "EDIT ASSIGNMENT",
        title_4 : "ASSIGNMENT",
        title_5 : "ADD-MANAGE ASSIGNMENT'S",
    }])

    const [data,setData] = useState([]) 
   // const [examData,setExamData] = useState([]) 
    const [classData,setClassData] = useState([]) 
    const [sectionData,setSectionData] = useState([])
    const [subjectData,setSubjectData] = useState([]) 
    const [dataID, setDataID] = useState(0) 
    const [bulkRecordID,setBulkRecordID] = useState([])
    const [deleteDisabled,setDeleteDisabled] = useState(true)
    const [loaderVisible,setLoaderVisible] = useState(true)  
    const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm()
 
    const [addRecord] = useAddMutation() 
    const [editRecord] = useEditMutation()
    const [deleteRecord] = useDeleteMutation()
    const [deleteBulkRecord] = useDeleteBulkMutation()
    const [getAllRecord,{data:getAllValidationRecord}] = useLazyListQuery()
    const [getParticularRecord] = useLazyParticularQuery()
 
    const [getAllClassRecord,{data:getAllValidationClassRecord}] = useLazyClassListQuery() 
 
    const columns = [
        {
            name: '#',
            selector: (row,key) => key+1,
            width:'50px'
        },
        {
            name: 'Assignment Title',
            selector: row => row.assignment_title
        },
        {
            name: 'Assignment Class',
            selector: row => {
                return (
                    <div>
                        {row.class_data[0].class_name} - ({row.section_data[0].section_name})
                    </div>
                )
            }
        },
        {
            name: 'Assignment Subject',
            selector: row => row.subject_data[0].subject_name
        },
        {
            name: 'Status',
            selector: row => (row.is_active === 1)?<span className="badge rounded-pill badge-success me-1">Active</span>:<span className="badge rounded-pill badge-danger me-1">De-active</span>,
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
            setValue("assignment_title", response.data.data.assignment_title) 
            setValue("assignment_description", response.data.data.assignment_description)  
            setValue("assignment_class", response.data.data.assignment_class)   
            setValue("assignment_deadline", response.data.data.assignment_deadline)  
            setValue("is_active", response.data.data.is_active) 
            updateSectionData()
            setTimeout(() => {
                setValue("assignment_section", response.data.data.assignment_section)  
                setValue("assignment_subject", response.data.data.assignment_subject)
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
    },[getAllValidationRecord])

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
    
    useEffect(()=>{  
        getAllClassRecord().then((response)=>{ 
            setClassData(response?.data?.data) 
            setLoaderVisible(false)
        }).catch((err)=>{ 
            toast.error(`Error : ${err.message}`)
        })
    },[getAllValidationClassRecord])

    const updateSectionData = () => { 
        const select_id = document.getElementById('classSelectBox')
        const select_data = select_id.options[select_id.selectedIndex].id
        const class_data = JSON.parse(select_data) 
        setSectionData(class_data.class_section)
        setSubjectData(class_data.class_subject)
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
                <div className="container-fluid">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-sm-6 ps-0"><h3>{pageName[0].title_1}</h3></div>
                            <div className="col-sm-6 pe-0">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="#">
                                            <svg className="stroke-icon">
                                                <use href="../assets/svg/icon-sprite.svg#stroke-home"></use>
                                            </svg>
                                        </Link>
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
                                <div className="card-body custom-card-list">
                                    <div className="list-product-header">
                                        <div>   
                                            {(!deleteDisabled)?
                                            <button className="btn btn-danger-gradien btn-sm" type="button" onClick={()=> { deleteBulkData() 
                                            setLoaderVisible(true) } } disabled={deleteDisabled}>
                                                <b>
                                                    <i className="fa fa-minus"></i>&nbsp; {pageName[0].title_2}
                                                </b>
                                            </button> 
                                            :''}

                                            <button className="btn btn-primary-gradien btn-sm" type="button" data-bs-toggle="modal" data-bs-target=".bd-example-modal-fullscreen" id="open-modal" onClick={()=>reset()}>
                                                <b> 
                                                    <i className="fa fa-plus"></i>&nbsp; {pageName[0].title_1}
                                                </b>
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
                                                <div className="form theme-form-old">
                                                    <div className="row"> 
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Assignment Class</label>
                                                                <select className="form-select" {...register('assignment_class', { required: 'This field is required.' })} onChange={(e)=>{
                                                                            updateSectionData(e.target.value)
                                                                        }} id="classSelectBox">  
                                                                    <option value="">Select Class</option>
                                                                    { (classData)?classData.map((classItem,key)=>{
                                                                        return(  
                                                                            <option id={JSON.stringify(classItem)} value= {classItem._id} key={key}>{classItem.class_name}</option> 
                                                                        )}):''
                                                                    }  
                                                                </select>
                                                                {errors.assignment_class && <span className="error-message">{errors.assignment_class.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Assignment Section</label>
                                                                <select className="form-select" id="floatingSelectGrid" {...register('assignment_section', { required: 'This field is required.' })}> 
                                                                    <option value="">Select Section</option>
                                                                    { (sectionData)?sectionData.map((sectionItem,key)=>{
                                                                        return(  
                                                                            <option value={sectionItem._id} key={key}>{sectionItem.section_name}</option> 
                                                                        )}):''
                                                                    }  
                                                                </select>
                                                                {errors.assignment_section && <span className="error-message">{errors.assignment_section.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Assignment Subject</label>
                                                                <select className="form-select" id="floatingSelectGrid" {...register('assignment_subject', { required: 'This field is required.' })}> 
                                                                    <option value="">Select Subject</option>
                                                                    { (subjectData)?subjectData.map((subjectItem,key)=>{
                                                                        return(  
                                                                            <option value={subjectItem._id} key={key}>{subjectItem.subject_name}</option> 
                                                                        )}):''
                                                                    }  
                                                                </select>
                                                                {errors.assignment_subject && <span className="error-message">{errors.assignment_subject.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Assignment Deadline</label>
                                                                <input className="form-control" type="date" {...register('assignment_deadline', { required: 'This field is required.' })} />
                                                                {errors.assignment_deadline && <span className="error-message">{errors.assignment_deadline.message}</span>}
                                                            </div>
                                                        </div> 
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label>Assignment Title</label>
                                                                <input className="form-control" type="text" placeholder="Assignment Title" {...register('assignment_title', { required: 'This field is required.' })} />
                                                                {errors.assignment_title && <span className="error-message">{errors.assignment_title.message}</span>} 
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label>Assignment Description</label>
                                                                <textarea placeholder="Assignment Description" className="form-control" type="text" {...register('assignment_description', { required: 'This field is required.' })} />

                                                                {errors.assignment_description && <span className="error-message">{errors.assignment_description.message}</span>} 
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-6"> 
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" id="flexSwitchCheckDefault" type="checkbox" role="switch" {...register('is_active', { required: false })} />
                                                                <label className="form-check-label"  for="flexSwitchCheckDefault">Is Active</label>
                                                            </div>
                                                        </div>
                                                    </div>  
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="text-end">   
                                                                <button type="submit" className="btn btn-success-gradien border-dark me-3">
                                                                    <b>Add</b>
                                                                </button>
                                                                <button type="reset" className="btn btn-danger-gradien border-dark">
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
        </div>    
    </>
    )
}