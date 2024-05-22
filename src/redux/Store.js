import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import {storeData} from './storeData/StoreData.js'
import {superAdminApi} from './api/SuperAdminApi.js'  
import {adminApi} from './api/AdminApi.js'
import {schoolApi} from './api/SchoolApi.js'
import {teacherApi} from './api/TeacherApi.js'
import {studentApi} from './api/StudentApi.js'
import {classApi} from './api/ClassApi.js'
import {sectionApi} from './api/SectionApi.js'
import {subjectApi} from './api/SubjectApi.js'
import {syllabusApi} from './api/SyllabusApi.js'
import {departmentApi} from './api/DepartmentApi.js'
import {assignmentApi} from './api/AssignmentApi.js'
import {noticeApi} from './api/NoticeApi.js'
import {eventApi} from './api/EventApi.js'
import {examApi} from './api/ExamApi.js'
import {gradeApi} from './api/GradeApi.js'
import {examScheduleApi} from './api/ExamScheduleApi.js'
import {roomApi} from './api/RoomApi.js'
import {routineApi} from './api/RoutineApi.js'

export const store = configureStore({
  reducer: {
    [storeData.reducerPath]: storeData.reducer,
    [superAdminApi.reducerPath]: superAdminApi.reducer, 
    [adminApi.reducerPath]: adminApi.reducer, 
    [schoolApi.reducerPath]: schoolApi.reducer,  
    [teacherApi.reducerPath]: teacherApi.reducer,  
    [studentApi.reducerPath]: studentApi.reducer,  
    [classApi.reducerPath]: classApi.reducer,  
    [sectionApi.reducerPath]: sectionApi.reducer,  
    [subjectApi.reducerPath]: subjectApi.reducer,  
    [syllabusApi.reducerPath]: syllabusApi.reducer,  
    [departmentApi.reducerPath]: departmentApi.reducer,  
    [assignmentApi.reducerPath]: assignmentApi.reducer,  
    [noticeApi.reducerPath]: noticeApi.reducer,  
    [eventApi.reducerPath]: eventApi.reducer,  
    [examApi.reducerPath]: examApi.reducer,  
    [gradeApi.reducerPath]: gradeApi.reducer,  
    [examScheduleApi.reducerPath]: examScheduleApi.reducer,  
    [roomApi.reducerPath]: roomApi.reducer,  
    [routineApi.reducerPath]: routineApi.reducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(superAdminApi.middleware).concat(adminApi.middleware).concat(schoolApi.middleware).concat(teacherApi.middleware).concat(studentApi.middleware).concat(classApi.middleware).concat(sectionApi.middleware).concat(subjectApi.middleware).concat(syllabusApi.middleware).concat(departmentApi.middleware).concat(assignmentApi.middleware).concat(noticeApi.middleware).concat(eventApi.middleware).concat(examApi.middleware).concat(gradeApi.middleware).concat(examScheduleApi.middleware).concat(roomApi.middleware).concat(routineApi.middleware),
})

setupListeners(store.dispatch)