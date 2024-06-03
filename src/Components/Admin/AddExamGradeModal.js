import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner'  
 
import {useAddMutation, useEditMutation, useDeleteMutation, useDeleteBulkMutation, useLazyParticularQuery, useLazyListQuery} from '../../redux/api/GradeApi.js'

const AddExamGradeModal = ({isDisplayModal,checkDisplayExamGradeModal}) => {
    const [pageName] = useState([{
        title_1 : 'ADD GRADE',
        title_2 : 'DELETE SELECTED GRADE',
        title_3 : "EDIT GRADE",
        title_4 : "GRADE",
        title_5 : "ADD-MANAGE GRADE'S",
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
            name: 'Grade Name',
            selector: row => row.grade_name
        },
        {
            name: 'Grade Point',
            selector: row => row.grade_point
        },
        {
            name: 'Mark From',
            selector: row => row.grade_from
        },
        {
            name: 'Mark Upto',
            selector: row => row.grade_upto
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
        checkDisplayExamGradeModal(isDisplayModal)
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
        getParticularRecord(record_id).then((response)=>{  
            setValue("grade_name", response.data.data.grade_name)
            setValue("grade_point", response.data.data.grade_point)  
            setValue("grade_from", response.data.data.grade_from)  
            setValue("grade_upto", response.data.data.grade_upto); 
            setValue("grade_note", response.data.data.grade_note); 
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
    // const deleteBulkData = async () => {
    //     let text = "Are you sure to delete this record?";
    //     if(window.confirm(text) === true) {
    //         deleteBulkRecord(bulkRecordID).then((response)=>{
    //             if(response?.data?.status){
    //                 toast.success(response.data.message)
    //                 setLoaderVisible(false)
    //                 setDeleteDisabled(true)
    //             }else{ 
    //                 toast.error(response.error.data.message) 
    //             }
    //         }).catch((err)=>{ 
    //             toast.error(`Error : ${err.message}`)
    //         })
    //     }
    // }
    
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
                                checkDisplayExamGradeModal(!isDisplayModal)
                                reset()
                            }}></button>
                        </div>
                        <div className="modal-body dark-modal"> 
                            <div className="row border-dark">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form method="POST" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                                <div className="form theme-form">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Grade Name</label>
                                                                <input className="form-control" type="text" placeholder="Grade Name" {...register('grade_name', { required: 'This field is required.' })} />
                                                                {errors.grade_name && <span className="error-message">{errors.grade_name.message}</span>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Grade Point</label>
                                                                <input className="form-control" type="number" placeholder="Grade Point" {...register('grade_point', { required: 'This field is required.' })} />
                                                                {errors.grade_point && <span className="error-message">{errors.grade_point.message}</span>}
                                                            </div>
                                                        </div> 
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Mark From</label>
                                                                <input className="form-control" type="number" placeholder="Mark From" {...register('grade_from', { required: 'This field is required.' })} />
                                                                {errors.grade_from && <span className="error-message">{errors.grade_from.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label>Mark UPTO</label>
                                                                <input className="form-control" type="number" placeholder="Mark UPTO" {...register('grade_upto', { required: 'This field is required.' })} />
                                                                {errors.grade_upto && <span className="error-message">{errors.grade_upto.message}</span>}
                                                            </div>
                                                        </div>  
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label>Note</label>
                                                                <textarea className="form-control" type="text" placeholder="Grade Note" {...register('grade_note', { required: false })} /> 
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
export default React.memo(AddExamGradeModal)