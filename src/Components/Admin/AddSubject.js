import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner'  
import Breadcrum from '../Common/Breadcrum'

import {useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularQuery, useLazyListQuery} from '../../redux/api/SubjectApi.js'

export default function AddSubject() {
    const [pageName] = useState([{
        title_1 : 'ADD SUBJECT',
        title_2 : 'DELETE SELECTED SUBJECT',
        title_3 : "EDIT SUBJECT",
        title_4 : "SUBJECT",
        title_5 : "ADD-MANAGE SUBJECT'S",
    }])

    const [data,setData] = useState([]) 
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
 
    const columns = [
        {
          name: '#',
          selector: (row,key) => key+1,
          width:'50px'
        },
        {
          name: 'Title',
          selector: row => row.subject_name
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
            setValue("subject_name", response.data.data.subject_name)  
            setValue("is_active", response.data.data.is_active)  
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
                                                        <div className="col-md-12 mb-3">
                                                            <label>Subject Name</label>
                                                            <input className="form-control" type="text" placeholder="Subject Name" {...register('subject_name', { required: 'This field is required.' })}/>
                                                            {errors.subject_name && <p className="text-danger error-custom-single">{errors.subject_name.message}</p>}
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
        </div>    
    </>
    )
}