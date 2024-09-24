import { useStyles } from "../../styles/CompletedCourses.classNames";
import CheckboxOption from "./CheckboxOption";
import type { Course } from "../../../../../../types/course.types";
import type { Filter } from "../../types/FilterTypes.types";
import { useCompletedCourses, useCourses } from "../../../../PlanHub";

export default function CheckboxField({filters}:{
    filters: Filter, 
}) {
    const classes = useStyles();
    const {completedCourses, setCompletedCourses} = useCompletedCourses();
    const { courses } = useCourses();
    const courseList: Course[] = Object.values(courses);

    const filterByCode = (code: string) => {
        return code.startsWith(filters.code) || code.slice(-4).startsWith(filters.code);
    }

    const filterByLevels = (code: string) => {
        if(filters.levels === 'ALL')
            return true;
        const level = code.slice(-4,-3);
        return filters.levels.includes(level);
    }

    const filterByDiscipline = (code: string) => {
        if(filters.discipline === 'ALL')
            return true;
        return code.startsWith(filters.discipline);
    }

    // const filterByFaculty = (code:string) => {
    //     const faculties = {
    //         FST: ['COMP', 'BIO', 'CHEM', 'ELET', 'MATH', 'METE', 'ENSC']
    //     };

    //     return faculties[filters.faculty]?.includes(code.slice(0,-4))

    // }
    const filteredCourses = courseList.filter( (course) => {
        return filterByCode(course.code) && filterByLevels(course.code) && filterByDiscipline (course.code);
    })

    
    return(
        <div className={classes.checkField}>
            {filteredCourses.map( (course) => <CheckboxOption key={course.code} course={course} selectedCourses={completedCourses} setSelectedCourses={setCompletedCourses} />)}
        </div>
    )
}