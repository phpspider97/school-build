"use strict";(self.webpackChunktheschoolster_in=self.webpackChunktheschoolster_in||[]).push([[351],{351:(e,s,a)=>{a.r(s),a.d(s,{default:()=>m});var l=a(5043),i=a(4858),t=a(8786),c=a(3401),d=a(5475),n=a(7213),r=a(7032),o=a(579);function m(){const[e]=(0,l.useState)([{title_1:"ADD ASSIGNMENT",title_2:"DELETE SELECTED ASSIGNMENT",title_3:"EDIT ASSIGNMENT",title_4:"ASSIGNMENT",title_5:"ADD-MANAGE ASSIGNMENT'S"}]),[s,a]=(0,l.useState)([]),[m,h]=(0,l.useState)([]),[u,x]=(0,l.useState)([]),[j,g]=(0,l.useState)([]),[b,N]=(0,l.useState)(0),[v,p]=(0,l.useState)([]),[_,f]=(0,l.useState)(!0),[S,y]=(0,l.useState)(!0),{register:A,handleSubmit:E,formState:{errors:k},setValue:T,reset:w}=(0,i.mN)(),[R]=(0,n.sZ)(),[C]=(0,n.Rx)(),[D]=(0,n.K)(),[q]=(0,n.Ej)(),[I,{data:G}]=(0,n.ad)(),[M]=(0,n.$G)(),[L,{data:B}]=(0,r.ad)(),F=[{name:"#",selector:(e,s)=>s+1,width:"50px"},{name:"Assignment Title",selector:e=>e.assignment_title},{name:"Assignment Class",selector:e=>(0,o.jsxs)("div",{children:[e.class_data[0].class_name," - (",e.section_data[0].section_name,")"]})},{name:"Assignment Subject",selector:e=>e.subject_data[0].subject_name},{name:"Status",selector:e=>1===e.is_active?(0,o.jsx)("span",{className:"badge rounded-pill badge-success me-1",children:"Active"}):(0,o.jsx)("span",{className:"badge rounded-pill badge-danger me-1",children:"De-active"})},{name:"Action",selector:e=>(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("i",{className:"icofont icofont-ui-edit me-2 edit-link-custom",onClick:()=>{J(e._id)},title:"Edit record"}),(0,o.jsx)("i",{className:"icofont icofont-ui-delete me-2 delete-link-custom",onClick:()=>{H(e._id),y(!0)},title:"Delete record"})]})}],O=()=>{w(),N(0),document.getElementById("close-modal").click(),y(!1)},J=async e=>{N(e),document.getElementById("open-modal").click(),M(e).then((e=>{T("assignment_title",e.data.data.assignment_title),T("assignment_description",e.data.data.assignment_description),T("assignment_class",e.data.data.assignment_class),T("assignment_deadline",e.data.data.assignment_deadline),T("is_active",e.data.data.is_active),K(),setTimeout((()=>{T("assignment_section",e.data.data.assignment_section),T("assignment_subject",e.data.data.assignment_subject)}),300)})).catch((e=>{c.oR.error("Error : ".concat(e.message)),y(!1)}))},H=async e=>{!0===window.confirm("Are you sure to delete this record?")&&D(e).then((e=>{var s;null!==e&&void 0!==e&&null!==(s=e.data)&&void 0!==s&&s.status?(c.oR.success(e.data.message),y(!1)):c.oR.error(e.error.data.message)})).catch((e=>{c.oR.error("Error : ".concat(e.message))}))};(0,l.useEffect)((()=>{I().then((e=>{var s;a(null===e||void 0===e||null===(s=e.data)||void 0===s?void 0:s.data),y(!1)})).catch((e=>{c.oR.error("Error : ".concat(e.message))}))}),[G]);(0,l.useEffect)((()=>{L().then((e=>{var s;h(null===e||void 0===e||null===(s=e.data)||void 0===s?void 0:s.data),y(!1)})).catch((e=>{c.oR.error("Error : ".concat(e.message))}))}),[B]);const K=()=>{const e=document.getElementById("classSelectBox"),s=e.options[e.selectedIndex].id,a=JSON.parse(s);x(a.class_section),g(a.class_subject)};return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)("div",{className:"page-body",children:[S?(0,o.jsx)("div",{class:"loader-wrapper",children:(0,o.jsx)("div",{class:"theme-loader",children:(0,o.jsx)("div",{class:"loader-p"})})}):"",(0,o.jsx)("div",{className:"container-fluid",children:(0,o.jsx)("div",{className:"page-title",children:(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-sm-6 ps-0",children:(0,o.jsx)("h3",{children:e[0].title_1})}),(0,o.jsx)("div",{className:"col-sm-6 pe-0",children:(0,o.jsxs)("ol",{className:"breadcrumb",children:[(0,o.jsx)("li",{className:"breadcrumb-item",children:(0,o.jsx)(d.N_,{to:"#",children:(0,o.jsx)("svg",{className:"stroke-icon",children:(0,o.jsx)("use",{href:"../assets/svg/icon-sprite.svg#stroke-home"})})})}),(0,o.jsx)("li",{className:"breadcrumb-item active",children:e[0].title_1})]})})]})})}),(0,o.jsx)("div",{className:"container-fluid",children:(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-sm-12",children:(0,o.jsx)("div",{className:"card",children:(0,o.jsxs)("div",{className:"card-body custom-card-list",children:[(0,o.jsx)("div",{className:"list-product-header",children:(0,o.jsxs)("div",{children:[_?"":(0,o.jsx)("button",{className:"btn btn-danger-gradien btn-sm",type:"button",onClick:()=>{(async()=>{!0===window.confirm("Are you sure to delete this record?")&&q(v).then((e=>{var s;null!==e&&void 0!==e&&null!==(s=e.data)&&void 0!==s&&s.status?(c.oR.success(e.data.message),y(!1),f(!0)):c.oR.error(e.error.data.message)})).catch((e=>{c.oR.error("Error : ".concat(e.message))}))})(),y(!0)},disabled:_,children:(0,o.jsxs)("b",{children:[(0,o.jsx)("i",{className:"fa fa-minus"}),"\xa0 ",e[0].title_2]})}),(0,o.jsx)("button",{className:"btn btn-primary-gradien btn-sm",type:"button","data-bs-toggle":"modal","data-bs-target":".bd-example-modal-fullscreen",id:"open-modal",onClick:()=>w(),children:(0,o.jsxs)("b",{children:[(0,o.jsx)("i",{className:"fa fa-plus"}),"\xa0 ",e[0].title_1]})})]})}),(0,o.jsx)("div",{className:"list-product",children:(0,o.jsx)(t.Ay,{columns:F,data:s,pagination:!0,selectableRows:!0,onSelectedRowsChange:e=>{let{selectedRows:s}=e;f(!0);let a=[];s.map((e=>{a.push(e._id)})),a.length>0&&f(!1),p(a)},persistTableHead:!0})})]})})})})}),(0,o.jsx)("div",{className:"modal fade bd-example-modal-fullscreen",tabindex:"-1",role:"dialog","aria-labelledby":"myFullLargeModalLabel","aria-hidden":"true",children:(0,o.jsx)("div",{className:"modal-dialog modal-fullscreen",children:(0,o.jsxs)("div",{className:"modal-content",children:[(0,o.jsxs)("div",{className:"modal-header",children:[(0,o.jsx)("h4",{className:"modal-title",id:"myFullLargeModalLabel",children:e[0].title_5}),(0,o.jsx)("button",{className:"btn-close py-1",type:"button","data-bs-dismiss":"modal","aria-label":"Close",id:"close-modal",onClick:()=>{N(0)}})]}),(0,o.jsx)("div",{className:"modal-body dark-modal",children:(0,o.jsx)("div",{className:"row border-dark",children:(0,o.jsx)("div",{className:"col-sm-12",children:(0,o.jsx)("div",{className:"card",children:(0,o.jsx)("div",{className:"card-body",children:(0,o.jsx)("form",{method:"POST",onSubmit:E((e=>{0===b?(R(e).then((e=>{var s;null!==e&&void 0!==e&&null!==(s=e.data)&&void 0!==s&&s.status?c.oR.success(e.data.message):c.oR.error(e.error.data.message)})).catch((e=>{c.oR.error("Error : ".concat(e.message))})),O()):(C({dataID:b,...e}).then((e=>{var s;null!==e&&void 0!==e&&null!==(s=e.data)&&void 0!==s&&s.status?c.oR.success(e.data.message):c.oR.error(e.error.data.message)})).catch((e=>{c.oR.error("Error : ".concat(e.message)),y(!1)})),O())})),encType:"multipart/form-data",children:(0,o.jsxs)("div",{className:"form theme-form-old",children:[(0,o.jsxs)("div",{className:"row",children:[(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)("div",{className:"mb-3",children:[(0,o.jsx)("label",{children:"Assignment Class"}),(0,o.jsxs)("select",{className:"form-select",...A("assignment_class",{required:"This field is required."}),onChange:e=>{K(e.target.value)},id:"classSelectBox",children:[(0,o.jsx)("option",{value:"",children:"Select Class"}),m?m.map(((e,s)=>(0,o.jsx)("option",{id:JSON.stringify(e),value:e._id,children:e.class_name},s))):""]}),k.assignment_class&&(0,o.jsx)("span",{className:"error-message",children:k.assignment_class.message})]})}),(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)("div",{className:"mb-3",children:[(0,o.jsx)("label",{children:"Assignment Section"}),(0,o.jsxs)("select",{className:"form-select",id:"floatingSelectGrid",...A("assignment_section",{required:"This field is required."}),children:[(0,o.jsx)("option",{value:"",children:"Select Section"}),u?u.map(((e,s)=>(0,o.jsx)("option",{value:e._id,children:e.section_name},s))):""]}),k.assignment_section&&(0,o.jsx)("span",{className:"error-message",children:k.assignment_section.message})]})}),(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)("div",{className:"mb-3",children:[(0,o.jsx)("label",{children:"Assignment Subject"}),(0,o.jsxs)("select",{className:"form-select",id:"floatingSelectGrid",...A("assignment_subject",{required:"This field is required."}),children:[(0,o.jsx)("option",{value:"",children:"Select Subject"}),j?j.map(((e,s)=>(0,o.jsx)("option",{value:e._id,children:e.subject_name},s))):""]}),k.assignment_subject&&(0,o.jsx)("span",{className:"error-message",children:k.assignment_subject.message})]})}),(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)("div",{className:"mb-3",children:[(0,o.jsx)("label",{children:"Assignment Deadline"}),(0,o.jsx)("input",{className:"form-control",type:"date",...A("assignment_deadline",{required:"This field is required."})}),k.assignment_deadline&&(0,o.jsx)("span",{className:"error-message",children:k.assignment_deadline.message})]})}),(0,o.jsx)("div",{className:"col-md-12",children:(0,o.jsxs)("div",{className:"mb-3",children:[(0,o.jsx)("label",{children:"Assignment Title"}),(0,o.jsx)("input",{className:"form-control",type:"text",placeholder:"Assignment Title",...A("assignment_title",{required:"This field is required."})}),k.assignment_title&&(0,o.jsx)("span",{className:"error-message",children:k.assignment_title.message})]})}),(0,o.jsx)("div",{className:"col-md-12",children:(0,o.jsxs)("div",{className:"mb-3",children:[(0,o.jsx)("label",{children:"Assignment Description"}),(0,o.jsx)("textarea",{placeholder:"Assignment Description",className:"form-control",type:"text",...A("assignment_description",{required:"This field is required."})}),k.assignment_description&&(0,o.jsx)("span",{className:"error-message",children:k.assignment_description.message})]})}),(0,o.jsx)("div",{className:"col-md-6",children:(0,o.jsxs)("div",{className:"form-check form-switch",children:[(0,o.jsx)("input",{className:"form-check-input",id:"flexSwitchCheckDefault",type:"checkbox",role:"switch",...A("is_active",{required:!1})}),(0,o.jsx)("label",{className:"form-check-label",for:"flexSwitchCheckDefault",children:"Is Active"})]})})]}),(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col",children:(0,o.jsxs)("div",{className:"text-end",children:[(0,o.jsx)("button",{type:"submit",className:"btn btn-success-gradien border-dark me-3",children:(0,o.jsx)("b",{children:"Add"})}),(0,o.jsx)("button",{type:"reset",className:"btn btn-danger-gradien border-dark",children:(0,o.jsx)("b",{children:"Reset"})})]})})})]})})})})})})})]})})})]})})}}}]);
//# sourceMappingURL=351.c9d8fff4.chunk.js.map