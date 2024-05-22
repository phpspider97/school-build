import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner'   

import {useLazyListQuery, useAddExamMarkMutation, useParticularExamMarkMutation} from '../../redux/api/StudentApi.js' 
import {useLazyListQuery as useLazyExamListQuery} from '../../redux/api/ExamApi.js'
import {useLazyListQuery as useLazyClassListQuery} from '../../redux/api/ClassApi.js'

export default function ExamMark() {
    const [pageName] = useState([{
        title_1 : 'ADD EXAM MARK',
        title_2 : 'DELETE SELECTED EXAM MARK',
        title_3 : "EDIT EXAM MARK",
        title_4 : "EXAM MARK",
        title_5 : "ADD-MANAGE EXAM MARK'S",
    }])

    const [data,setData] = useState([]) 
    const [markData,setMarkData] = useState([]) 
    const [commentData,setCommentData] = useState([]) 
    const [examData,setExamData] = useState([]) 
    const [classData,setClassData] = useState([]) 
    const [sectionData,setSectionData] = useState([])
    const [subjectData,setSubjectData] = useState([]) 
    //const [dataID, setDataID] = useState(0) 
    const [classID, setClassID] = useState(0) 
    const [sectionID, setSectionID] = useState(0) 
    const [examID, setExamID] = useState(0) 
    const [subjectID, setSubjectID] = useState(0) 
    const [loaderVisible,setLoaderVisible] = useState(true)     

    const {register, handleSubmit, formState: { errors }} = useForm()
 
    //const [getAllRecord,{data:getAllValidationRecord}] = useLazyListQuery()
    const [getAllExamRecord,{data:getAllExamValidationRecord}] = useLazyExamListQuery()
    const [getAllClassRecord,{data:getAllValidationClassRecord}] = useLazyClassListQuery()
    const [addMarkRecord] = useAddExamMarkMutation()
    const [getMarkBaseStudentData] = useParticularExamMarkMutation()
    
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
            name: 'Mark',
            selector: row =>  <> 
                <input type="number" className='form-control' defaultValue={row.student_mark_data[0]?.mark_data?.mark} onChange={(e)=>setMarkData(e.target.value)}/> 
            </>
        },
        {
            name: 'Grade point',
            selector: row => <>A+</>
        },
        {
            name: 'Comment',
            selector: row => <> 
                <input type="text" className='form-control' defaultValue={row.student_mark_data[0]?.mark_data?.mark_comment} onChange={(e)=>setCommentData(e.target.value)} /> 
            </>
        },
        {
            name: 'Action',
            selector: row => <div className="form-check form-switch">
                {
                    <button className="btn btn-success btn-sm" onClick={(e)=>onSubmitMark(e,row._id,row.student_mark_data[0]?.mark_data)}>Submit</button>
                    //(row.student_mark_data?.length>0)?<input className="form-check-input" type="checkbox" onChange={(e)=>onSubmitMark(e,row._id)} value={1} checked />:<input className="form-check-input" type="checkbox" onChange={(e)=>onSubmitMark(e,row._id)} value={1}/>
                } 
            </div>
        }
    ]

    const onSubmitMark = (event,student_id,recordData) => { 
        setLoaderVisible(true)  
        let is_checked = (recordData === undefined)?1:0
        
        console.log('is_checked__',is_checked)

        const data = {
            mark:markData,
            mark_comment:commentData,
            mark_class:classID,
            mark_section:sectionID,
            mark_subject:subjectID,
            mark_exam:examID,
            is_checked:is_checked?1:0,
            mark_student_id:student_id, 
            mark_checked:is_checked
        }  
       
        addMarkRecord(data).then((response) => { 
            if(response?.data?.status){
                toast.success(response.data.message) 
            }else{ 
                toast.error(response.error.data.message) 
            }  
             
            const sendUpdateData = {
                mark_class:classID,
                mark_section:sectionID,
                mark_subject:subjectID,
                exam_id:examID,
            }  
            onSubmit(sendUpdateData)// for refresh
             
        }).catch((error) => { 
            if (error) 
                toast.error(`Some tehnical issue.`)
                setLoaderVisible(false)
        });   
    } 
    const onSubmit = (data) => { 
        setClassID(data.mark_class)
        setSectionID(data.mark_section)
        setSubjectID(data.mark_subject)
        setExamID(data.exam_id)
        setData([])
        const sendData = {
            class_id:data.mark_class,
            section_id:data.mark_section,
            subject_id:data.mark_subject,
            exam_id:data.exam_id,
        }
        getMarkBaseStudentData(sendData).then((response)=>{  
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
                                                    <select className="form-select" id="floatingSelectGrid" {...register('exam_id', { required: 'This field is required.' })}> 
                                                        <option value="">Select Exam</option>
                                                        { (examData)?examData.map((examItem,key)=>{
                                                            return(  
                                                                <option value={examItem._id} key={key}>{examItem.exam_name}</option> 
                                                            )}):''
                                                        }  
                                                    </select>
                                                    {errors.exam_id && <span className="error-message">{errors.exam_id.message}</span>}
                                                    <label for="floatingSelectGrid">
                                                        Please select exam
                                                    </label>
                                                </div>
                                            </div>  
                                            <div className="col-md-2">
                                                <div className="form-floating">
                                                    <select className="form-select" {...register('mark_class', { required: 'This field is required.' })} onChange={(e)=>{
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
                                                    {errors.mark_class && <span className="error-message">{errors.mark_class.message}</span>}
                                                    <label for="floatingSelectGrid">
                                                        Please select class
                                                    </label>
                                                </div>
                                            </div> 
                                            <div className="col-md-3">
                                                <div className="form-floating">
                                                    <select className="form-select" id="floatingSelectGrid" {...register('mark_section', { required: 'This field is required.' })}> 
                                                        <option value="">Select Section</option>
                                                        { (sectionData)?sectionData.map((sectionItem,key)=>{
                                                            return(  
                                                                <option value={sectionItem._id} key={key}>{sectionItem.section_name}</option> 
                                                            )}):''
                                                        }  
                                                    </select>
                                                    {errors.mark_section && <span className="error-message">{errors.mark_section.message}</span>}
                                                    <label for="floatingSelectGrid">
                                                        Please select section
                                                    </label>
                                                </div>
                                            </div> 
                                            <div className="col-md-2">
                                                <div className="form-floating">
                                                        <select className="form-select" id="floatingSelectGrid" {...register('mark_subject', { required: 'This field is required.' })}> 
                                                            <option value="">Select Subject</option>
                                                            { (subjectData)?subjectData.map((subjectItem,key)=>{
                                                                return(  
                                                                    <option value={subjectItem._id} key={key}>{subjectItem.subject_name}</option> 
                                                                )}):''
                                                            }  
                                                        </select>
                                                        {errors.mark_subject && <span className="error-message">{errors.mark_subject.message}</span>}
                                                    <label for="floatingSelectGrid">
                                                        Please select subject
                                                    </label>
                                                </div>
                                            </div> 
                                            <div className="col-md-2">
                                                <div className="form-floating">
                                                    <button type="submit" className="btn btn-success-gradien border-dark me-3" style={{height:'58px'}}>
                                                        <b>Mark</b>
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