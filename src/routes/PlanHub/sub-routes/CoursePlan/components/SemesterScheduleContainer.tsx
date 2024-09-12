import { useStyles } from "../styles/coursePlan.classNames";
import NewSemesterButton from "./NewSemesterButton";
import SemesterScheduleCard from "./SemesterScheduleCard";
import type { Course, CourseSemester } from "../../../types/Degree.types";
import React from "react";

export default function SemesterScheduleContainer({semestersInfo, setSemestersInfo} : {
    semestersInfo: CourseSemester[], 
    setSemestersInfo: React.Dispatch<React.SetStateAction<CourseSemester[]>>
}) {
    const classes = useStyles();
    const startingPoint : {year: number, semesterNumber: 1 | 2} = {
        year: 2024,
        semesterNumber: 1
    } 
    
    const courseList: Course[]  = [
        {
            code: "COMP3320",
            name:"Design Principles for Operating Systems",
            credits: 3,
            prerequisites: ['COMP2220']
        },
        {
            code: "FOUN1301",
            name:"Law, Governance, Society and Economy in the Caribbean",
            credits: 3,
        },
        {
            code: "MATH3590",
            name:"Mathematics Research Project",
            credits: 6,
            prerequisites: ['MATH2304','MATH2305','MATH2310', 'MATH2315', 'MATH2321']
        },
        {
            code: "COMP3330",
            name:"Algorithms",
            credits: 3,
            prerequisites: ['COMP2220']
        },
        {
            code: "COMP3310",
            name:"Database Management Systems 1",
            credits: 3,
        },
        {
            code: "MATH3550",
            name:"Metric Spaces",
            credits: 3,
            prerequisites: ['MATH2304','MATH2305','MATH2310', 'MATH2315', 'MATH2321']
        },
    ]
    const selectableCourses = courseList.filter((course) => !semestersInfo.some((semester) => semester.courseList.some((usedCourses) => usedCourses?.code === course.code)))
    const showTopNewSemesterButton: boolean = semestersInfo.length !== 0 && !(startingPoint.year === semestersInfo[0].year && startingPoint.semesterNumber === semestersInfo[0].semesterNumber);
    const showNewSemesterButtonMiddle = (semester: CourseSemester, allSemesters: CourseSemester[], nextIndex: number) => {
        const isAdjacentSemestersSameYear: boolean = semester.semesterNumber === 1 && allSemesters[nextIndex].semesterNumber === 2 && semester.year === semestersInfo[nextIndex].year
        const isAdjacentSemestersDifferentYear: boolean = semester.semesterNumber === 2 && semestersInfo[nextIndex].semesterNumber === 1 && semester.year + 1 === semestersInfo[nextIndex].year
        return !(isAdjacentSemestersSameYear || isAdjacentSemestersDifferentYear)
    }
    const allSemesterCards = semestersInfo.map( (semester, i) => {
        return (
            <>
                <SemesterScheduleCard 
                    key={`${semester.year}${semester.semesterNumber}`} 
                    semester={semester} 
                    setSemestersInfo={setSemestersInfo} 
                    availableCourses={selectableCourses}
                />
                {i !== semestersInfo.length - 1 && 
                showNewSemesterButtonMiddle(semester, semestersInfo, i+1) && 
                    <NewSemesterButton 
                        setSemestersInfo={setSemestersInfo} 
                        newSemesterContext="below" 
                        associatedSemesterIndex={i}
                        initialSemester={startingPoint}
                    />
                }
            </>           
        )
    })
    
    return (
        <div className={classes.semesterScheduleContainer}>
                { 
                showTopNewSemesterButton && 
                <NewSemesterButton 
                    setSemestersInfo={setSemestersInfo} 
                    newSemesterContext="above" 
                    associatedSemesterIndex={0}
                    initialSemester={startingPoint}
                />
                }
                {allSemesterCards}
                <NewSemesterButton 
                    setSemestersInfo={setSemestersInfo} 
                    newSemesterContext="below" 
                    associatedSemesterIndex={semestersInfo.length !== 0 ? semestersInfo.length-1 : undefined}
                    initialSemester={startingPoint}
                /> 
            </div>
    )
}