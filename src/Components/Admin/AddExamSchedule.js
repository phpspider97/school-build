import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner' 
import AddExamModal from './AddExamModal'
import AddExamGradeModal from './AddExamGradeModal'

import {useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularQuery, useLazyListQuery} from '../../redux/api/ExamScheduleApi.js'
import {useLazyListQuery as useLazyExamListQuery} from '../../redux/api/ExamApi.js'
import {useLazyListQuery as useLazyClassListQuery} from '../../redux/api/ClassApi.js'
import {useLazyListQuery as useLazyRoomListQuery} from '../../redux/api/RoomApi.js'

export default function AddExamSchedule() {
    const [pageName] = useState([{
        title_1 : 'ADD EXAM SCHEDULE',
        title_2 : 'DELETE SELECTED EXAM SCHEDULE',
        title_3 : "EDIT EXAM SCHEDULE",
        title_4 : "EXAM SCHEDULE",
        title_5 : "ADD-MANAGE EXAM SCHEDULE'S",
    }])

    const [data,setData] = useState([]) 
    const [examData,setExamData] = useState([]) 
    const [classData,setClassData] = useState([]) 
    const [sectionData,setSectionData] = useState([])
    const [subjectData,setSubjectData] = useState([])
    const [roomData,setRoomData] = useState([])
    const [dataID, setDataID] = useState(0) 
    const [bulkRecordID,setBulkRecordID] = useState([])
    const [deleteDisabled,setDeleteDisabled] = useState(true)
    const [loaderVisible,setLoaderVisible] = useState(true) 
    const [displayExamModal,setDisplayExamModal] = useState(false) 
    const [displayExamGradeModal,setDisplayExamGradeModal] = useState(false) 
    const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm()
 
    const [addRecord] = useAddMutation() 
    const [editRecord] = useEditMutation()
    const [deleteRecord] = useDeleteMutation()
    const [deleteBulkRecord] = useDeleteBulkMutation()
    const [getAllRecord,{data:getAllValidationRecord}] = useLazyListQuery()
    const [getParticularRecord] = useLazyParticularQuery()

    const [getAllExamRecord,{data:getAllExamValidationRecord}] = useLazyExamListQuery()
    const [getAllClassRecord,{data:getAllValidationClassRecord}] = useLazyClassListQuery()
    const [getAllRoomRecord,{data:getAllValidationRoomRecord}] = useLazyRoomListQuery()
 
    const columns = [
        {
            name: '#',
            selector: (row,key) => key+1,
            width:'50px'
        },
        {
            name: 'Exam Name',
            selector: row => row.exam_data[0].exam_name
        },
        {
            name: 'Exam Class',
            selector: row => {
                return (
                    <div>
                        {row.class_data[0].class_name} - ({row.section_data[0].section_name})
                    </div>
                )
            }
        },
        {
            name: 'Exam Subject',
            selector: row => row.subject_data[0]?.subject_name
        },
        {
            name: 'Exam Time',
            selector: row =>{
                return (
                    <div>
                        <div>{row.exam_date.split('T')[0]}</div>
                        <b>{row.exam_start_time}-{row.exam_end_time}</b>
                    </div>
                )
            }
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
            setValue("exam_name", response.data.data.exam_name) 
            setValue("exam_class", response.data.data.exam_class)   
            setValue("exam_date", response.data.data.exam_date)  
            setValue("exam_start_time", response.data.data.exam_start_time)  
            setValue("exam_end_time", response.data.data.exam_end_time)  
            setValue("exam_room", response.data.data.exam_room)  
            setValue("is_active", response.data.data.is_active) 
            updateSectionData()
            setTimeout(() => {
                setValue("exam_section", response.data.data.exam_section)  
                setValue("exam_subject", response.data.data.exam_subject)
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

    const checkDisplayExamModal = (data) => { 
        setDisplayExamModal(data)
    } 
    const checkDisplayExamGradeModal = (data) => { 
        setDisplayExamGradeModal(data)
    } 

    useEffect(()=>{
        getAllExamRecord().then((response)=>{ 
            setExamData(response?.data?.data)  
        }).catch((err)=>{ 
            toast.error(`Error : ${err.message}`)
        })
    },[getAllExamValidationRecord])

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

    useEffect(()=>{  
        getAllRoomRecord().then((response)=>{ 
            setRoomData(response?.data?.data) 
            setLoaderVisible(false)
        }).catch((err)=>{ 
            toast.error(`Error : ${err.message}`)
        })
    },[getAllValidationRoomRecord])

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
                                            <button className="btn btn-warning-gradien btn-sm" type="button" onClick={()=>{   
                                                setDisplayExamModal(true) 
                                            }}>
                                                <b>
                                                    <i className="fa fa-plus"></i>&nbsp; Exam Name
                                                </b>
                                            </button> 
                                            <button className="btn btn-danger-gradien btn-sm" type="button" onClick={()=>{   
                                                setDisplayExamGradeModal(true)  
                                            }}>
                                                <b>
                                                    <i className="fa fa-plus"></i>&nbsp; Exam Grade
                                                </b>
                                            </button>  

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
                                                                <label>Exam Name</label>
                                                                <select className="form-select" id="floatingSelectGrid" {...register('exam_name', { required: 'This field is required.' })}> 
                                                                    <option value="">Select Exam</option>
                                                                    { (examData)?examData.map((examItem,key)=>{
                                                                        return(  
                                                                            <option value={examItem._id} key={key}>{examItem.exam_name}</option> 
                                                                        )}):''
                                                                    }  
                                                                </select>
                                                                {errors.exam_name && <span className="error-message">{errors.exam_name.message}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Exam Class</label>
                                                                <select className="form-select" {...register('exam_class', { required: 'This field is required.' })} onChange={(e)=>{
                                                                            updateSectionData(e.target.value)
                                                                        }} id="classSelectBox">  
                                                                    <option value="">Select Class</option>
                                                                    { (classData)?classData.map((classItem,key)=>{
                                                                        return(  
                                                                            <option id={JSON.stringify(classItem)} value= {classItem._id} key={key}>{classItem.class_name}</option> 
                                                                        )}):''
                                                                    }  
                                                                </select>
                                                                {errors.exam_class && <span className="error-message">{errors.exam_class.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Exam Section</label>
                                                                <select className="form-select" id="floatingSelectGrid" {...register('exam_section', { required: 'This field is required.' })}> 
                                                                    <option value="">Select Section</option>
                                                                    { (sectionData)?sectionData.map((sectionItem,key)=>{
                                                                        return(  
                                                                            <option value={sectionItem._id} key={key}>{sectionItem.section_name}</option> 
                                                                        )}):''
                                                                    }  
                                                                </select>
                                                                {errors.exam_section && <span className="error-message">{errors.exam_section.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Exam Subject</label>
                                                                <select className="form-select" id="floatingSelectGrid" {...register('exam_subject', { required: 'This field is required.' })}> 
                                                                    <option value="">Select Subject</option>
                                                                    { (subjectData)?subjectData.map((subjectItem,key)=>{
                                                                        return(  
                                                                            <option value={subjectItem._id} key={key}>{subjectItem?.subject_name}</option> 
                                                                        )}):''
                                                                    }  
                                                                </select>
                                                                {errors.exam_subject && <span className="error-message">{errors.exam_subject.message}</span>}
                                                            </div>
                                                        </div> 
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Exam Date</label>
                                                                <input className="form-control" type="date" {...register('exam_date', { required: 'This field is required.' })} />
                                                                {errors.exam_date && <span className="error-message">{errors.exam_date.message}</span>}
                                                            </div>
                                                        </div> 
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Exam Start Time</label>
                                                                <input className="form-control" type="time" {...register('exam_start_time', { required: 'This field is required.' })} />
                                                                {errors.exam_start_time && <span className="error-message">{errors.exam_start_time.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Exam End Time</label>
                                                                <input className="form-control" type="time" {...register('exam_end_time', { required: 'This field is required.' })} />
                                                                {errors.exam_end_time && <span className="error-message">{errors.exam_end_time.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Exam Room</label>
                                                                <select className="form-select" {...register('exam_room', { required: 'This field is required.' })}>  
                                                                    <option value="">Select Room</option>
                                                                    { (roomData)?roomData.map((roomItem,key)=>{
                                                                        return(  
                                                                            <option value={roomItem._id} key={key}>{roomItem.room_name}</option> 
                                                                        )}):''
                                                                    }  
                                                                </select>
                                                                {errors.exam_room && <span className="error-message">{errors.exam_room.message}</span>}
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
            {
                (displayExamModal === true)?<AddExamModal isDisplayModal={displayExamModal} checkDisplayExamModal={checkDisplayExamModal} />:''
            }
            {
                (displayExamGradeModal === true)?<AddExamGradeModal isDisplayModal={displayExamGradeModal} checkDisplayExamGradeModal={checkDisplayExamGradeModal} />:''
            }
            

           
        </div>    
    </>
    )
}