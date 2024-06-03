import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner' 
import Breadcrum from '../Common/Breadcrum'

import {useAddPermissionMutation, useParticularPermissionMutation} from '../../redux/api/TeacherApi.js' 
import {useLazyListQuery as useLazyClassListQuery} from '../../redux/api/ClassApi.js'

export default function TeacherPermission() {
    const [pageName] = useState([{
        title_1 : 'ADD TEACHER PERMISSION',
        title_2 : 'DELETE SELECTED TEACHER PERMISSION',
        title_3 : "EDIT TEACHER PERMISSION",
        title_4 : "TEACHER PERMISSION",
        title_5 : "ADD-MANAGE TEACHER PERMISSION'S",
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
    const [addPermissionRecord] = useAddPermissionMutation()
    const [getPermissionBaseTeacherData] = useParticularPermissionMutation()
    
    const columns = [
        {
            name: '#',
            selector: (row,key) => key+1,
            width:'50px'
        },
        {
            name: 'Teacher List',
            selector: row => row.teacher_name
        }, 
        {
            name: 'Marks',
            selector: row => <>
                <div className="form-check form-switch">
                    {
                        (row.teacher_permission[0]?.is_mark === true)?<input className="form-check-input" type="checkbox" onChange={(e)=>{onSubmitPermission(e,'mark',row._id)
                        }} value={1} checked />:<input className="form-check-input" type="checkbox" onChange={(e)=>onSubmitPermission(e,'mark',row._id)} value={1}/>
                    } 
                </div>
            </>
        }, 
        {
            name: 'Attendance',
            selector: row => <>
                <div className="form-check form-switch">
                    {
                        (row.teacher_permission[0]?.is_attendance === true)?<input className="form-check-input" type="checkbox" onChange={(e)=>onSubmitPermission(e,'attendance',row._id)} value={1} checked />:<input className="form-check-input" type="checkbox" onChange={(e)=>onSubmitPermission(e,'attendance',row._id)} value={1}/>
                    } 
                </div>
            </>
        },
    ]

    const onSubmitPermission = (event,permission_type,teacher_id) => { 
        setLoaderVisible(true)  
        let is_checked = event.target.checked
        
        const data = {
            permission_class:classID,
            permission_section:sectionID,
            is_checked:is_checked?1:0,
            permission_teacher:teacher_id,
            is_mark:(permission_type === 'mark' && is_checked === 1)?1:0,
            is_attendance:(permission_type === 'attendance' && is_checked === 1)?1:0
        }  
        if(permission_type === 'mark'){
            delete data.is_attendance
        }else{
            delete data.is_mark
        }
        addPermissionRecord(data).then((response) => { 
            if(response?.data?.status){
                toast.success(response.data.message) 
            }else{ 
                toast.error(response.error.data.message) 
            }   
            displayTeacherRecord(sectionID) // for refresh
        }).catch((error) => { 
            if (error) 
                toast.error(`Some tehnical issue.`)
                setLoaderVisible(false)
        });   
    }

    const displayTeacherRecord = (section_id) => {
        setSectionID(section_id)
        setData([])
        const data = {
            class_id:classID,
            section_id:section_id
        }
        getPermissionBaseTeacherData(data).then((response)=>{  
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
                                    <div className="list-product-header">  
                                        <div className="row align-left p-4">  
                                            <div className="col-md-3">
                                                <div className="form-floating">
                                                    <select className="form-select" id="floatingSelectGrid" onChange={(e)=>{
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
                                                    <label for="floatingSelectGrid">
                                                        Please select class
                                                    </label>
                                                </div>
                                            </div> 
                                            <div className="col-md-3">
                                                <div className="form-floating">
                                                    <select className="form-select" id="floatingSelectGrid" onChange={(e)=>{
                                                        displayTeacherRecord(e.target.value)
                                                    }}> 
                                                        <option value="">Select Section</option>
                                                        { (sectionData)?sectionData.map((sectionItem,key)=>{
                                                            return(  
                                                                <option value={sectionItem._id} key={key}>{sectionItem.section_name}</option> 
                                                            )}):''
                                                        }  
                                                    </select>
                                                    <label for="floatingSelectGrid">
                                                        Please select section
                                                    </label>
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