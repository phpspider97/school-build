import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
//import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner'  
  
//import {useLazyParticularQuery} from '../../redux/api/ClassApi.js'
import {useSubjectClassMutation, useLazyListQuery, useLazyGetSubjectClassQuery} from '../../redux/api/SubjectApi.js'

const AddSubjectModal = ({isDisplayModal,classID,checkDisplaySubjectModal,className}) => {
    const [pageName] = useState([{
        title_1 : 'ADD SUBJECT',
        title_2 : 'DELETE SELECTED SUBJECT',
        title_3 : "EDIT SUBJECT",
        title_4 : "SUBJECT",
        title_5 : "ADD-MANAGE SUBJECT'S",
    }]) 
    //const [data,setData] = useState([]) 
    const [dataID, setDataID] = useState(0)
    //const [updateData, setUpdateData] = useState(0)
    //const [isModalDisplay, setIsModalDisplay] = useState(isDisplayModal)
    //const [bulkRecordID,setBulkRecordID] = useState([])
    //const [deleteDisabled,setDeleteDisabled] = useState(true)
    const [loaderVisible,setLoaderVisible] = useState(true) 
    //const [displayAdminModal,setDisplayAdminModal] = useState(false)  

    const [subjectList, setSubjectList] = useState([])
    const [selectedSubjectList, setSelectedSubjectList] = useState([])

    const {register, setValue, reset} = useForm()
   
    const [addRecord] = useSubjectClassMutation()   
    const [getParticularRecord,{data:getAllValidationRecord}] = useLazyGetSubjectClassQuery() 
    const [getAllRecord,{data:getAllSubjectValidationRecord}] = useLazyListQuery() 

     
    const resetSubmit = () => {  
        reset() 
        setDataID(0) 
        setLoaderVisible(false) 
        fetchAllRecord()
        checkDisplaySubjectModal(isDisplayModal,classID)
    }
    const onSubmitSubject = (event) => { 
        setLoaderVisible(true) 
        let subject_name = event.target.value
        let is_checked = event.target.checked
        
        const data = {
            subject_name:subject_name,
            class_id:classID,
            is_checked:is_checked?1:0,
        } 
        
        addRecord(data).then((response) => { 
            if(response?.data?.status){
                toast.success(response.data.message) 
            }else{ 
                toast.error(response.error.data.message) 
            } 
            resetSubmit()
        }).catch((error) => { 
            if (error) 
                toast.error(`Some tehnical issue.`)
                setLoaderVisible(false)
        });   
    }
    
    const fetchAllRecord = () => {  
        getParticularRecord(classID).then((response)=>{   
            setValue('class_name',className) 
            const selected_subject_data = response.data.data
            const filteredSeletedItems = selected_subject_data?.map(selected_subject_data => selected_subject_data.subject_name) 
            setSelectedSubjectList(filteredSeletedItems) 
        }).catch((err)=>{
            toast.error(`Error : ${err.message}`)
            setLoaderVisible(false)
        })
    }
    useEffect(()=>{   
        fetchAllRecord()
    },[getAllValidationRecord])

    useEffect(()=>{
        getAllRecord().then((response)=>{
            if(response?.data?.status){ 
                const filteredSeletedItems = response.data.data?.map(selected_subject_data => selected_subject_data.subject_name)
                setSubjectList(filteredSeletedItems)
            }else{ 
                toast.error(response.error.data.message) 
            } 
        }).catch((error)=>{
            if(error){
                toast.error(`Some tehnical issue.`)
                setLoaderVisible(false)
            }
        })
        
    },[getAllSubjectValidationRecord])

    useEffect(()=>{
        if(isDisplayModal){
            document.getElementById('open-admin-modal').click() 
        }
    },[isDisplayModal])  
    return ( 
        <>  
            {loaderVisible?
            <div class="loader-wrapper">
                <div class="theme-loader">    
                    <div class="loader-p"></div>
                </div>
            </div>:''} 
            <button data-bs-toggle="modal" data-bs-target=".admin-modal-fullscreen" id="open-admin-modal" style={{displa:'none'}}>Open admin</button>

            <div className="modal fade admin-modal-fullscreen" tabindex="-1" role="dialog" aria-labelledby="myFullLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myFullLargeModalLabel">{pageName[0].title_5}</h4>
                            <button className="btn-close py-1" type="button" data-bs-dismiss="modal" aria-label="Close" id="close-modal" onClick={()=>{
                                setDataID(0)
                                checkDisplaySubjectModal(!isDisplayModal,0)
                                reset()
                            }}></button>
                        </div>
                        <div className="modal-body dark-modal"> 
                            <div className="row border-dark">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body"> 
                                            <div className="form theme-form-old">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label>Class Name</label>
                                                            <input className="form-control" type="text" placeholder="Class Name" {...register('class_name', { required: false })} /> 
                                                        </div>
                                                    </div> 
                                                    <div className="row ml-3"> 
                                                    { subjectList.map((subject_data,key)=>{ 
                                                        return (
                                                        selectedSubjectList?.includes(subject_data)?
                                                            <div className="form-check form-switch mb-2 col-md-3">
                                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={(e)=>onSubmitSubject(e)} value={subject_data} checked/>
                                                                <label className="form-check-label" for="flexSwitchCheckChecked"
                                                                > {subject_data}</label>
                                                            </div>
                                                            :
                                                            <div className="form-check form-switch mb-2 col-md-3">
                                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={(e)=>onSubmitSubject(e)} value={subject_data}/>
                                                                <label className="form-check-label" for="flexSwitchCheckChecked"
                                                                > {subject_data}</label>
                                                            </div>
                                                        ) 
                                                    })} 
                                                    </div> 
                                                </div>  
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
export default React.memo(AddSubjectModal)