import React from 'react'

export default function Breadcrum({title}) {
  return (
    <div className="container-fluid">
        <div className="page-title">
            <div className="row">
                <div className="col-6 ps-0"><h3>{title}</h3></div>
                <div className="col-6 pe-0">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <i class="fa fa-home"></i>
                        </li> 
                        <li className="breadcrumb-item active">{title}</li>
                    </ol>
                </div>
            </div>
        </div>
    </div> 
  )
}
