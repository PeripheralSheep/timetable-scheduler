import { useStyles } from "../styles/coursePlan.classNames";
import NewCourseButton from "./NewCourseButton";
import SemesterScheduleHeader from "./SemesterScheduleHeader";
import CourseSelectionSelect from "./CourseSelectionSelect";
import type { Course, CourseSemester } from "../../../types/Degree.types";
import type { DispatcherType } from "../../../types/StateProps.types";

export default function SemesterScheduleCard({ semester, availableCourses, setSemestersInfo}:{
    semester:CourseSemester, 
    availableCourses: Course[], 
    setSemestersInfo: DispatcherType<CourseSemester[]>
}) {
    const classes = useStyles();
    const selectedCourses = semester.courseList;
    const minCreditsACourse = 3;
    const numCredits = selectedCourses?.reduce((sum, curCourse) => curCourse !== null ? sum + curCourse.credits : sum, 0);
    const courseOptions: Course[] = availableCourses.filter((course) => !selectedCourses.some((selectedCourse) => selectedCourse?.code === course.code) && (semester.maxCredits - numCredits >= course.credits))

    function addCourseSlot() {
        setSemestersInfo( (semesters) => {
            return semesters.map((sem) => {
                if(sem.semesterNumber == semester.semesterNumber && sem.year == semester.year){
                    return ({
                        ...sem,
                        courseList: [...sem.courseList, null]
                    })
                }
                else
                    return sem;
            })
        });
    }
    
    return (
        <div className={classes.semesterScheduleCard}>
            <SemesterScheduleHeader credits={numCredits} semesterInfo={semester} setSemesters={setSemestersInfo}/>
            {selectedCourses.map( (selectedCourse, i) => <CourseSelectionSelect key={i} curCourse={selectedCourse} courseOptions={courseOptions} setSemesterCourseList={setSemestersInfo} associatedSemester={semester} curPosition={i}/>)}
            {semester.maxCredits - numCredits >= minCreditsACourse && (courseOptions.length > 0) && <NewCourseButton onClick={addCourseSlot} disabled={selectedCourses.includes(null)}/>}
        </div>
    )
}