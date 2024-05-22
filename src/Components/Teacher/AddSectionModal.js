import React,{useState, useEffect} from 'react'  
import {useForm} from "react-hook-form" 
//import DataTable from 'react-data-table-component'
import {toast} from 'react-toastify'
//import {ThreeDots} from 'react-loader-spinner'  
 
import {useAddMutation} from '../../redux/api/SectionApi.js'
import {useLazyParticularQuery} from '../../redux/api/ClassApi.js'

const AddSectionModal = ({isDisplayModal,classID,checkDisplaySectionModal}) => {
    const [pageName] = useState([{
        title_1 : 'ADD SECTION',
        title_2 : 'DELETE SELECTED SECTION',
        title_3 : "EDIT SECTION",
        title_4 : "SECTION",
        title_5 : "ADD-MANAGE SECTION'S",
    }]) 
    //const [data,setData] = useState([]) 
    const [dataID, setDataID] = useState(0)
    //const [updateData, setUpdateData] = useState(0)
    //const [isModalDisplay, setIsModalDisplay] = useState(isDisplayModal)
    //const [bulkRecordID,setBulkRecordID] = useState([])
    //const [deleteDisabled,setDeleteDisabled] = useState(true)
    const [loaderVisible,setLoaderVisible] = useState(true) 
    //const [displayAdminModal,setDisplayAdminModal] = useState(false)  

    const [sectionList] = useState(['A','B','C','D','E','F','G','H','I','J','K','L'])
    const [selectedSectionList, setSelectedSectionList] = useState([])

    const {register, setValue, reset} = useForm()
   
    const [addRecord] = useAddMutation()   
    const [getParticularRecord,{data:getAllValidationRecord}] = useLazyParticularQuery() 
     
    const resetSubmit = () => {  
        reset() 
        setDataID(0) 
        setLoaderVisible(false) 
        fetchAllRecord()
        checkDisplaySectionModal(isDisplayModal,classID)
    }
    const onSubmitSection = (event) => { 
        setLoaderVisible(true) 
        let section_name = event.target.value
        let is_checked = event.target.checked
        
        const data = {
            section_name:section_name,
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
            setValue('class_name',response.data.data.class_name) 
            const selected_section_data = response.data.data.class_section;
            const filteredSeletedItems = selected_section_data?.map(selected_section_data => selected_section_data.section_name)
            setSelectedSectionList(filteredSeletedItems) 
        }).catch((err)=>{
            toast.error(`Error : ${err.message}`)
            setLoaderVisible(false)
        })
    }
    useEffect(()=>{   
        fetchAllRecord()
    },[getAllValidationRecord])

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
                                checkDisplaySectionModal(!isDisplayModal,0)
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
                                                    { sectionList.map((section_data,key)=>{ 
                                                        return ( 
                                                        selectedSectionList?.includes(section_data)?
                                                            <div className="form-check form-switch mb-2 col-md-3">
                                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={(e)=>onSubmitSection(e)} value={section_data} checked/>
                                                                <label className="form-check-label" for="flexSwitchCheckChecked"
                                                                > {section_data}</label>
                                                            </div>
                                                            :
                                                            <div className="form-check form-switch mb-2 col-md-3">
                                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={(e)=>onSubmitSection(e)} value={section_data}/>
                                                                <label className="form-check-label" for="flexSwitchCheckChecked"
                                                                > {section_data}</label>
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
export default React.memo(AddSectionModal)