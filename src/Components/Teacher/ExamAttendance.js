import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner' 

import {useLazyListQuery, useAddExamAttendanceMutation, useParticularExamAttendanceMutation} from '../../redux/api/StudentApi.js' 
import {useLazyListQuery as useLazyExamListQuery} from '../../redux/api/ExamApi.js'
import {useLazyListQuery as useLazyClassListQuery} from '../../redux/api/ClassApi.js'

export default function ExamAttendance() {
    const [pageName] = useState([{
        title_1 : 'ADD EXAM ATTENDANCE',
        title_2 : 'DELETE SELECTED EXAM ATTENDANCE',
        title_3 : "EDIT EXAM ATTENDANCE",
        title_4 : "EXAM ATTENDANCE",
        title_5 : "ADD-MANAGE EXAM ATTENDANCE'S",
    }])

    const [data,setData] = useState([]) 
    const [examData,setExamData] = useState([]) 
    const [classData,setClassData] = useState([]) 
    const [sectionData,setSectionData] = useState([])
    const [subjectData,setSubjectData] = useState([]) 
   // const [dataID, setDataID] = useState(0) 
    const [classID, setClassID] = useState(0) 
    const [sectionID, setSectionID] = useState(0) 
    const [examID, setExamID] = useState(0) 
    const [subjectID, setSubjectID] = useState(0) 
    const [loaderVisible,setLoaderVisible] = useState(true)     

    const {register, handleSubmit, formState: { errors }} = useForm()
 
    //const [getAllRecord,{data:getAllValidationRecord}] = useLazyListQuery()
    const [getAllExamRecord,{data:getAllExamValidationRecord}] = useLazyExamListQuery()
    const [getAllClassRecord,{data:getAllValidationClassRecord}] = useLazyClassListQuery()
    const [addAttendanceRecord] = useAddExamAttendanceMutation()
    const [getAttendanceBaseStudentData] = useParticularExamAttendanceMutation()
    
    const columns = [
        {
            name: '#',
            selector: (row,key) => key+1,
            width:'50px'
        },
        {
            name: 'Student List',
            selector: row => row.student_name
        },
        {
            name: 'Attendance',
            selector: row => <>
                <div className="form-check form-switch">
                    {
                        (row.student_attendance_data?.length>0)?<input className="form-check-input" type="checkbox" onChange={(e)=>onSubmitAttendance(e,row._id)} value={1} checked />:<input className="form-check-input" type="checkbox" onChange={(e)=>onSubmitAttendance(e,row._id)} value={1}/>
                    } 
                </div>
            </>
        },
    ]

    const onSubmitAttendance = (event,student_id) => { 
        setLoaderVisible(true)  
        let is_checked = event.target.checked
        
        const data = {
            attendance_class:classID,
            attendance_section:sectionID,
            attendance_subject:subjectID,
            attendance_exam:examID,
            is_checked:is_checked?1:0,
            attendance_student_id:student_id, 
            attendance:(is_checked === 1)?1:0
        }  
       
        addAttendanceRecord(data).then((response) => { 
            if(response?.data?.status){
                toast.success(response.data.message) 
            }else{ 
                toast.error(response.error.data.message) 
            }  
            const sendUpdateData = {
                exam_class:classID,
                exam_section:sectionID,
                exam_subject:subjectID,
                exam_name:examID,
            }  
            onSubmit(sendUpdateData)// for refresh
        }).catch((error) => { 
            if (error) 
                toast.error(`Some tehnical issue.`)
                setLoaderVisible(false)
        });   
    } 
    const onSubmit = (data) => { 
        setClassID(data.exam_class)
        setSectionID(data.exam_section)
        setSubjectID(data.exam_subject)
        setExamID(data.exam_name)
        setData([])
        const sendData = {
            class_id:data.exam_class,
            section_id:data.exam_section,
            subject_id:data.exam_subject,
            exam_id:data.exam_name,
        }
        getAttendanceBaseStudentData(sendData).then((response)=>{  
            setData(response?.data?.data) 
            setLoaderVisible(false)
        }).catch((err)=>{ 
            toast.error(`Error : ${err.message}`)
        })
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
    useEffect(()=>{
        getAllExamRecord().then((response)=>{ 
            setExamData(response?.data?.data)  
        }).catch((err)=>{ 
            toast.error(`Error : ${err.message}`)
        })
    },[getAllExamValidationRecord])
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
                                <div className="card-body custom-card-list">
                                    <div className="list-product-header"> 
                                        <form method="POST" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data"> 
                                        <div className="row align-left p-4"> 
                                            <div className="col-md-3">
                                                <div className="form-floating">
                                                    <select className="form-select" id="floatingSelectGrid" {...register('exam_name', { required: 'This field is required.' })}> 
                                                        <option value="">Select Exam</option>
                                                        { (examData)?examData.map((examItem,key)=>{
                                                            return(  
                                                                <option value={examItem._id} key={key}>{examItem.exam_name}</option> 
                                                            )}):''
                                                        }  
                                                    </select>
                                                    {errors.exam_name && <span className="error-message">{errors.exam_name.message}</span>}
                                                    <label for="floatingSelectGrid">
                                                        Please select section
                                                    </label>
                                                </div>
                                            </div>  
                                            <div className="col-md-2">
                                                <div className="form-floating">
                                                    <select className="form-select" {...register('exam_class', { required: 'This field is required.' })} onChange={(e)=>{
                                                                    updateSectionData(e.target.value)
                                                                    setData([])
                                                                }} id="classSelectBox">  
                                                        <option value="">Select Class</option>
                                                        { (classData)?classData.map((classItem,key)=>{
                                                            return(  
                                                                <option id={JSON.stringify(classItem)} value= {classItem._id} key={key}>{classItem.class_name}</option> 
                                                            )}):''
                                                        }  
                                                    </select>
                                                    {errors.exam_class && <span className="error-message">{errors.exam_class.message}</span>}
                                                    <label for="floatingSelectGrid">
                                                        Please select class
                                                    </label>
                                                </div>
                                            </div> 
                                            <div className="col-md-3">
                                                <div className="form-floating">
                                                    <select className="form-select" id="floatingSelectGrid" {...register('exam_section', { required: 'This field is required.' })}> 
                                                        <option value="">Select Section</option>
                                                        { (sectionData)?sectionData.map((sectionItem,key)=>{
                                                            return(  
                                                                <option value={sectionItem._id} key={key}>{sectionItem.section_name}</option> 
                                                            )}):''
                                                        }  
                                                    </select>
                                                    {errors.exam_section && <span className="error-message">{errors.exam_section.message}</span>}
                                                    <label for="floatingSelectGrid">
                                                        Please select section
                                                    </label>
                                                </div>
                                            </div> 
                                            <div className="col-md-2">
                                                <div className="form-floating">
                                                        <select className="form-select" id="floatingSelectGrid" {...register('exam_subject', { required: 'This field is required.' })}> 
                                                            <option value="">Select Subject</option>
                                                            { (subjectData)?subjectData.map((subjectItem,key)=>{
                                                                return(  
                                                                    <option value={subjectItem._id} key={key}>{subjectItem.subject_name}</option> 
                                                                )}):''
                                                            }  
                                                        </select>
                                                        {errors.exam_subject && <span className="error-message">{errors.exam_subject.message}</span>}
                                                    <label for="floatingSelectGrid">
                                                        Please select subject
                                                    </label>
                                                </div>
                                            </div> 
                                            <div className="col-md-2">
                                                <div className="form-floating">
                                                    <button type="submit" className="btn btn-success-gradien border-dark me-3" style={{height:'58px'}}>
                                                        <b>Attendance</b>
                                                    </button>
                                                </div>
                                            </div>
                                        </div> 
                                        </form>
                                    </div>
                                    <div className="list-product">
                                        <DataTable
                                            columns={columns}
                                            data={data}
                                            pagination 
                                            persistTableHead 
                                        />  
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