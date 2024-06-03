import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner' 
import AddAdminModal from './AddAdminModal'
import Breadcrum from '../Common/Breadcrum'

import {useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularQuery, useLazyListQuery} from '../../redux/api/SchoolApi.js'


export default function Index() {
    const [pageName] = useState([{
        title_1 : 'ADD SCHOOL',
        title_2 : 'DELETE SELECTED SCHOOL',
        title_3 : "EDIT SCHOOL",
        title_4 : "SCHOOL",
        title_5 : "ADD-MANAGE SCHOOL'S",
    }])

    const [data,setData] = useState([]) 
    const [dataID, setDataID] = useState(0) 
    const [bulkRecordID,setBulkRecordID] = useState([])
    const [deleteDisabled,setDeleteDisabled] = useState(true)
    const [loaderVisible,setLoaderVisible] = useState(true) 
    const [displayAdminModal,setDisplayAdminModal] = useState(false) 
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
          name: 'Name',
          selector: row => row.school_name
        },
        {
            name: 'Email',
            selector: row => row.school_email
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
                }} title="Delete record"></i>  
                <i className="icofont icofont-business-man-alt-1 delete-link-custom" onClick={()=>{   
                    setDisplayAdminModal(true) 
                    setDataID(row._id)
                }} title="Add admin's"></i> 
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
            setValue("school_name", response.data.data.school_name); 
            setValue("school_email", response.data.data.school_email); 
            setValue("school_number", response.data.data.school_number);  
            setValue("is_active", response.data.data.is_active); 
        }).catch((err)=>{
            toast.error(`Error : ${err.message}`)
            setLoaderVisible(false)
        })
    }
    const deleteData = async (record_id) => {
        let text = "Are you sure to delete this record?";
        if(window.confirm(text) === true) {
            setLoaderVisible(true)
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
    const checkDisplayAdminModal = (data,school_id) => { 
        setDataID(school_id)
        setDisplayAdminModal(data)
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
                                            <div className="custom-horizontal-scroll">
                                                {(!deleteDisabled)?
                                                <button className="btn btn-danger-gradien btn-sm" type="button" onClick={()=>{ deleteBulkData() 
                                                setLoaderVisible(true) } } disabled={deleteDisabled}>
                                                    <b>{pageName[0].title_2}</b>
                                                </button>
                                                :''}
                                                &nbsp;&nbsp;
                                                <button className="btn btn-primary-gradien btn-sm ml-3" type="button" data-bs-toggle="modal" data-bs-target=".bd-example-modal-fullscreen" id="open-modal" onClick={()=>reset()}>
                                                    <b>{pageName[0].title_1}</b>
                                                </button>  
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
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label>Name</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text">
                                                                        <i class="icofont icofont-building-alt"></i>
                                                                    </span>
                                                                    <input className="form-control" type="text" placeholder="School Name" {...register('school_name', { required: 'This field is required.' })} />
                                                                    {errors.school_name && <span className="error-message">{errors.school_name.message}</span>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label>Email</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text">
                                                                        <i class="icofont icofont-envelope"></i>
                                                                    </span>
                                                                    <input className="form-control" type="email" placeholder="School Email" {...register('school_email', { required: 'This field is required.' })} />
                                                                </div>
                                                                {errors.school_email && <span className="error-message">{errors.school_email.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label>Phone Number</label>
                                                                <div className="input-group">
                                                                    <span className="input-group-text">
                                                                        <i class="icofont icofont-iphone"></i>
                                                                    </span>
                                                                    <input className="form-control" type="number" placeholder="School Phone Number" {...register('school_number', { required: 'This field is required.' })} />
                                                                </div>
                                                                {errors.school_number && <span className="error-message">{errors.school_number.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-12"> 
                                                            <div className="form-check form-switch">
                                                                <input className="form-check-input" id="flexSwitchCheckDefault1" type="checkbox" role="switch" {...register('is_active', { required: false })} />
                                                                <label className="form-check-label"  for="flexSwitchCheckDefault1">Is Active</label>
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
                        </div>
                    </div>
                </div>
            </div>
            <AddAdminModal isDisplayModal={displayAdminModal} schoolID={dataID} checkDisplayAdminModal={checkDisplayAdminModal} />
        </div>    
    </>
    )
}