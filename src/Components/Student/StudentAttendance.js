import React,{useState, useEffect} from 'react'  
//import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner' 
import Breadcrum from '../Common/Breadcrum'

import {useLazyListQuery, useAddAttendanceMutation, useParticularAttendanceMutation} from '../../redux/api/StudentApi.js' 
import {useLazyListQuery as useLazyClassListQuery} from '../../redux/api/ClassApi.js'

export default function StudentAttendance() {
    const [pageName] = useState([{
        title_1 : 'ADD STUDENT ATTENDANCE',
        title_2 : 'DELETE SELECTED STUDENT ATTENDANCE',
        title_3 : "EDIT STUDENT ATTENDANCE",
        title_4 : "STUDENT ATTENDANCE",
        title_5 : "ADD-MANAGE STUDENT ATTENDANCE'S",
    }])

    const [data,setData] = useState([]) 
    const [classData,setClassData] = useState([]) 
    const [sectionData,setSectionData] = useState([]) 
    //const [dataID, setDataID] = useState(0) 
    const [classID, setClassID] = useState(0) 
    const [sectionID, setSectionID] = useState(0) 
    const [loaderVisible,setLoaderVisible] = useState(true)     

    //const {register, control, handleSubmit, formState: { errors }, setValue, reset} = useForm()
 
    //const [getAllRecord,{data:getAllValidationRecord}] = useLazyListQuery()
    const [getAllClassRecord,{data:getAllValidationClassRecord}] = useLazyClassListQuery()
    const [addAttendanceRecord] = useAddAttendanceMutation()
    const [getAttendanceBaseStudentData] = useParticularAttendanceMutation()
    
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
                        (row.student_attendance_data?.length>0)?<input className="form-check-input" type="checkbox" onChange={(e)=>onSubmitattendance(e,row._id)} value={1} checked />:<input className="form-check-input" type="checkbox" onChange={(e)=>onSubmitattendance(e,row._id)} value={1}/>
                    } 
                </div>
            </>
        },
    ]

    const onSubmitattendance = (event,student_id) => { 
        setLoaderVisible(true)  
        let is_checked = event.target.checked
        
        const data = {
            attendance_class:classID,
            attendance_section:sectionID,
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
            displayStudentRecord(sectionID) // for refresh
        }).catch((error) => { 
            if (error) 
                toast.error(`Some tehnical issue.`)
                setLoaderVisible(false)
        });   
    }

    const displayStudentRecord = (section_id) => {
        setSectionID(section_id)
        setData([])
        const data = {
            class_id:classID,
            section_id:section_id
        }
        getAttendanceBaseStudentData(data).then((response)=>{  
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

    const updateSectionData = (class_array) => {
        const class_data = JSON.parse(class_array)
        setClassID(class_data._id) 
        setSectionData(class_data.class_section)
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
                                    <div className="list-product-header-attendance main-custom-form">  
                                        <div className="row align-left">  
                                            <div className="col-md-6"></div>
                                            <div className="col-md-3">
                                                <div className="input-group"> 
                                                    <label class="input-group-text bg-primary b-dark text-center" for="inputGroupSelect02">&nbsp;&nbsp;Class&nbsp;</label>
                                                    <select className="form-select b-primary" id="floatingSelectGrid" onChange={(e)=>{
                                                                    updateSectionData(e.target.value)
                                                                    setData([])
                                                                }}>  
                                                        <option value="">Select Class</option>
                                                        { (classData)?classData.map((classItem,key)=>{
                                                            return(  
                                                                <option value={JSON.stringify(classItem)} key={key}>{classItem.class_name}</option> 
                                                            )}):''
                                                        }  
                                                    </select> 
                                                </div>
                                            </div> 
                                            <div className="col-md-3">
                                                <div className="input-group">
                                                    <label class="input-group-text bg-primary b-dark" for="inputGroupSelect02">Section</label>
                                                    <select className="form-select b-primary" id="floatingSelectGrid" onChange={(e)=>{
                                                        displayStudentRecord(e.target.value)
                                                    }}> 
                                                        <option value="">Select Section</option>
                                                        { (sectionData)?sectionData.map((sectionItem,key)=>{
                                                            return(  
                                                                <option value={sectionItem._id} key={key}>{sectionItem.section_name}</option> 
                                                            )}):''
                                                        }  
                                                    </select> 
                                                </div>
                                            </div> 
                                        </div> 
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