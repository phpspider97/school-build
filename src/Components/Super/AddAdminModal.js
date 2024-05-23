import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner'  
 
import {useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularQuery, useLazySchoolListQuery} from '../../redux/api/AdminApi.js'

const AddAdminModal = ({isDisplayModal,schoolID,checkDisplayAdminModal}) => {
    const [pageName] = useState([{
        title_1 : 'ADD ADMIN',
        title_2 : 'DELETE SELECTED ADMIN',
        title_3 : "EDIT ADMIN",
        title_4 : "ADMIN",
        title_5 : "ADD-MANAGE ADMIN'S",
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
    const [getAllRecord,{data:getAllValidationRecord}] = useLazySchoolListQuery()
    const [getParticularRecord] = useLazyParticularQuery()
    
    const columns = [
        {
          name: '#',
          selector: (row,key) => key+1,
          width:'50px'
        },
        {
          name: 'Admin Name',
          selector: row => row.admin_name
        },
        {
            name: 'Admin Email',
            selector: row => row.admin_email
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
        setLoaderVisible(false) 
        fetchAllRecord()
        checkDisplayAdminModal(isDisplayModal,schoolID)
    }
    const onSubmit = (data) => { 
        if(schoolID === 0){ alert('School id not set.') }       
        if(dataID === 0){ 
            data.school_id = schoolID
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
            setValue("admin_name", response.data.data.admin_name)
            setValue("admin_email", response.data.data.admin_email)  
            setValue("admin_number", response.data.data.admin_number)  
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
        getAllRecord(schoolID).then((response)=>{   
            setData(response?.data?.data) 
            setLoaderVisible(false)
        }).catch((err)=>{ 
            toast.error(`Error : ${err.message}`)
        })
    }
    useEffect(()=>{   
        fetchAllRecord()
    },[getAllValidationRecord,schoolID])

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
            <button data-bs-toggle="modal" data-bs-target=".admin-modal-fullscreen" id="open-admin-modal" style={{display:'none'}}>Open admin</button>

            <div className="modal fade admin-modal-fullscreen" tabindex="-1" role="dialog" aria-labelledby="myFullLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myFullLargeModalLabel">{pageName[0].title_5}</h4>
                            <button className="btn-close py-1" type="button" data-bs-dismiss="modal" aria-label="Close" id="close-modal" onClick={()=>{
                                setDataID(0)
                                checkDisplayAdminModal(!isDisplayModal,0)
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
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Name</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text">
                                                                        <i class="icofont icofont-ui-user"></i>
                                                                    </span>
                                                                    <input className="form-control" type="text" placeholder="Admin Name" {...register('admin_name', { required: 'This field is required.' })} />
                                                                </div>
                                                                {errors.admin_name && <span className="error-message">{errors.admin_name.message}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Email</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text">
                                                                        <i class="icofont icofont-envelope"></i>
                                                                    </span>
                                                                    <input className="form-control" type="email" placeholder="Admin Email" {...register('admin_email', { required: 'This field is required.' })} />
                                                                </div>
                                                                {errors.admin_email && <span className="error-message">{errors.admin_email.message}</span>}
                                                            </div>
                                                        </div> 
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Phone</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text">
                                                                        <i class="icofont icofont-iphone"></i>
                                                                    </span>
                                                                    <input className="form-control" type="number" placeholder="Admin Phone" {...register('admin_number', { required: 'This field is required.' })} />
                                                                </div>
                                                                {errors.admin_number && <span className="error-message">{errors.admin_number.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Admin Password</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text">
                                                                        <i class="icofont icofont-ui-password"></i>
                                                                    </span>
                                                                    <input className="form-control" type="password" placeholder="Admin Password" {...register('admin_password', { required: false })} /> 
                                                                </div>
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-12"> 
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" id="flexSwitchCheckDefault" type="checkbox" role="switch" {...register('is_active', { required: false })} />
                                                                <label className="form-check-label"  htmlFor="flexSwitchCheckDefault">Is Active</label>
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
    </>
    )
}
export default React.memo(AddAdminModal)