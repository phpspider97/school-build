import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner'  
 
import {useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularQuery, useLazyListQuery} from '../../redux/api/SyllabusApi.js'

const AddSyllabusModal = ({isDisplayModal,classID,checkDisplaySyllabusModal,className}) => {
    const [pageName] = useState([{
        title_1 : 'ADD SYLLABUS',
        title_2 : 'DELETE SELECTED SYLLABUS',
        title_3 : "EDIT SYLLABUS",
        title_4 : "SYLLABUS",
        title_5 : "ADD-MANAGE SYLLABUS'S",
    }]) 
    const [data,setData] = useState([]) 
    const [dataID, setDataID] = useState(0)
    //const [updateData, setUpdateData] = useState(0)
    //const [isModalDisplay, setIsModalDisplay] = useState(isDisplayModal)
    const [bulkRecordID,setBulkRecordID] = useState([])
    const [deleteDisabled,setDeleteDisabled] = useState(true)
    const [loaderVisible,setLoaderVisible] = useState(true) 
    //const [displayAdminModal,setDisplayAdminModal] = useState(false)  

    const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm()
   
    const [addRecord] = useAddMutation() 
    const [editRecord] = useEditMutation()
    const [deleteRecord] = useDeleteMutation()
    const [deleteBulkRecord] = useDeleteBulkMutation()
    const [getAllRecord,{data:getAllValidationRecord}] = useLazyListQuery()
    const [getParticularRecord] = useLazyParticularQuery()
    
    const columns = [
        {
          name: '#',
          selector: (row,key) => key+1,
          width:'50px'
        },
        {
          name: 'Syllabus Title',
          selector: row => row.syllabus_title
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
        setLoaderVisible(false) 
        fetchAllRecord()
        checkDisplaySyllabusModal(isDisplayModal,classID)
    }
    const onSubmit = (data) => { 
        if(classID === 0){ alert('Class id not set.') }       
        if(dataID === 0){ 
            data.syllabus_class = classID
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
        getParticularRecord(record_id).then((response)=>{
            console.log('response__',response.data.data)  
            setValue("syllabus_title", response.data.data.syllabus_title)  
            setValue("is_active", response.data.data.is_active); 
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
     
    const fetchAllRecord = () => {
        getAllRecord(classID).then((response)=>{   
            setData(response?.data?.data) 
            setLoaderVisible(false)
        }).catch((err)=>{ 
            toast.error(`Error : ${err.message}`)
        })
    }
    useEffect(()=>{   
        fetchAllRecord()
    },[getAllValidationRecord,classID])

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
        if(isDisplayModal){  
            setValue('class_name',className) 
            document.getElementById('open-admin-modal').click() 
            setLoaderVisible(false)
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
            <button data-bs-toggle="modal" data-bs-target=".admin-modal-fullscreen" id="open-admin-modal" style={{display:'none'}}>Open admin</button>

            <div className="modal fade admin-modal-fullscreen" tabindex="-1" role="dialog" aria-labelledby="myFullLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myFullLargeModalLabel">{pageName[0].title_5}</h4>
                            <button className="btn-close py-1" type="button" data-bs-dismiss="modal" aria-label="Close" id="close-modal" onClick={()=>{
                                setDataID(0)
                                checkDisplaySyllabusModal(!isDisplayModal,0)
                                reset()
                            }}></button>
                        </div>
                        <div className="modal-body dark-modal"> 
                            <div className="row border-dark">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form method="POST" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                                <div className="form theme-form-old">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label>Class Name</label>
                                                                <input className="form-control" type="text" placeholder="Class Name" {...register('class_name', { required: false })} disabled/> 
                                                            </div>
                                                        </div> 
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label>Syllabus Title</label>
                                                                <input className="form-control" type="text" placeholder="Syllabus Title" {...register('syllabus_title', { required: 'This field is required.' })} />
                                                                {errors.syllabus_title && <span className="error-message">{errors.syllabus_title.message}</span>}
                                                            </div>
                                                        </div> 
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label>Upload Syllabus</label>
                                                                <input className="form-control" type="file" {...register('admin_password', { required: false })} /> 
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-12"> 
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" id="flexSwitchCheckDefault121" type="checkbox" role="switch" {...register('is_active', { required: false })} />
                                                                <label className="form-check-label"  htmlFor="flexSwitchCheckDefault121">Is Active</label>
                                                            </div>
                                                        </div>
                                                    </div>  
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="text-end">   
                                                                <button type="submit" className="btn btn-success-gradien border-dark me-3">
                                                                    <b>Save</b>
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
                            <div className="list-product custom-modal-card-list">
                                <DataTable
                                    title='Syllabus List'
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
    </>
    )
}
export default React.memo(AddSyllabusModal)