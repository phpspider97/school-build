import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner'  
 
import {useAddBulkMutation} from '../../redux/api/TeacherApi.js' 

const BulkTeacherModal = ({isDisplayModal,checkDisplayBulkTeacherModal}) => {
    const [pageName] = useState([{
        title_1 : 'ADD GRADE',
        title_2 : 'DELETE SELECTED GRADE',
        title_3 : "EDIT GRADE",
        title_4 : "GRADE",
        title_5 : "ADD BULK UPLOAD",
    }]) 
    const [data,setData] = useState([]) 
    const [dataID, setDataID] = useState(0)  
    const [loaderVisible,setLoaderVisible] = useState(true)  
    const [classData,setClassData] = useState([]) 
    const [sectionData,setSectionData] = useState([])

    const {register, handleSubmit, formState: { errors }, setValue, reset} = useForm()
   
    const [addBulkRecord] = useAddBulkMutation()   
     
    const resetSubmit = () => {
        reset()
        setDataID(0)
        setLoaderVisible(false)
        document.getElementById('close-teacher-modal').click()
    }
    const onSubmit = (data) => {  
        const formData = new FormData() 
        //formData.append('student_class', data.student_class)
        //formData.append('student_section', data.student_section)
        formData.append('teacher_bulk', data.teacher_bulk[0])
        addBulkRecord(formData).then((response)=>{   
            if(response?.data?.status){  
                toast.success(response.data.message) 
                resetSubmit() 
            }else{ 
                toast.error(response.error.data.message) 
            }
        }).catch((err)=>{ 
            toast.error(`Error : ${err.message}`)
            resetSubmit() 
        })
    }
     
    useEffect(()=>{
        if(isDisplayModal){
            document.getElementById('open-teacher-modal').click() 
        }
    },[isDisplayModal]) 
    return ( 
        <>   
            <button data-bs-toggle="modal" data-bs-target=".admin-modal-fullscreen" id="open-teacher-modal" style={{display:'none'}}>Open admin</button>

            <div className="modal fade admin-modal-fullscreen" tabindex="-1" role="dialog" aria-labelledby="myFullLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="myFullLargeModalLabel">{pageName[0].title_5}</h4>
                            <button className="btn-close py-1" type="button" data-bs-dismiss="modal" aria-label="Close" id="close-teacher-modal" onClick={()=>{
                                setDataID(0)
                                checkDisplayBulkTeacherModal(!isDisplayModal)
                                reset()
                            }}></button>
                        </div>
                        <div className="modal-body dark-modal"> 
                            <div className="row border-dark">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <form method="POST" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                                                <div className="form">
                                                    <div className="row mb-3">  
                                                        <div className="col-md-12 mb-3"> 
                                                            <label>Upload Excel</label>
                                                            <input className="form-control" type="file" placeholder="Mark UPTO" {...register('teacher_bulk', { required: 'This field is required.' })} />
                                                            {errors.teacher_bulk && <span className="error-message">{errors.teacher_bulk.message}</span>} 
                                                        </div>
                                                        <div className="col-md-6"> 
                                                            <label>Download Sample</label> <br/>
                                                            <a href="./teacher-excel.xlxs" download>
                                                                <i class="fa fa-hand-o-right"></i> ( Click To Download )    
                                                            </a> 
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
    </>
    )
}
export default React.memo(BulkTeacherModal)