import { useStyles } from "../styles/coursePlan.classNames";
import NewSemesterButton from "./NewSemesterButton";
import SemesterScheduleCard from "./SemesterScheduleCard";
import type { Course, CourseSemester } from "../../../../../types/course.types.ts"
import { useCompletedCourses, useCourses } from "../../../PlanHub.tsx";
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
    const {completedCourses} = useCompletedCourses();
    const { courses } = useCourses();

    const courseList: Course[] = Object.values(courses);
    const selectableCourses = courseList.filter((course) => {
        return (!semestersInfo.some((semester) => semester.courseList.some((usedCourses) => usedCourses?.code === course.code))
                && !completedCourses.has(course.code))
    })

    const showTopNewSemesterButton: boolean = semestersInfo.length !== 0 && !(startingPoint.year === semestersInfo[0].year && startingPoint.semesterNumber === semestersInfo[0].semesterNumber);
    const showNewSemesterButtonMiddle = (semester: CourseSemester, allSemesters: CourseSemester[], nextIndex: number) => {
        const isAdjacentSemestersSameYear: boolean = semester.semesterNumber === 1 && allSemesters[nextIndex].semesterNumber === 2 && semester.year === semestersInfo[nextIndex].year
        const isAdjacentSemestersDifferentYear: boolean = semester.semesterNumber === 2 && semestersInfo[nextIndex].semesterNumber === 1 && semester.year + 1 === semestersInfo[nextIndex].year
        return !(isAdjacentSemestersSameYear || isAdjacentSemestersDifferentYear)
    }

    const AllSemesterCards = semestersInfo.map( (semester, i) => {
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
            {AllSemesterCards}
            <NewSemesterButton 
                setSemestersInfo={setSemestersInfo} 
                newSemesterContext="below" 
                associatedSemesterIndex={semestersInfo.length !== 0 ? semestersInfo.length-1 : undefined}
                initialSemester={startingPoint}
            /> 
        </div>
    )
}