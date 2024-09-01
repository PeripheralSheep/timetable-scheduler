import { useStyles } from "../../styles/CompletedCourses.classNames";
import CheckboxOption from "./CheckboxOption";
import type { Course } from "./types/Course";
import type { Filter } from "../../types/FilterTypes";
export default function CheckboxField({filters, selectedCourses,setSelectedCourses}:{filters: Filter, selectedCourses: string[], setSelectedCourses: React.Dispatch<React.SetStateAction<string[]>>}) {
    const classes = useStyles();
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
            credits: 3,
            prerequisites: ['MATH2304','MATH2305','MATH2310', 'MATH2315', 'MATH2321']
        },
    ]
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
            {filteredCourses.map( (course) => <CheckboxOption key={course.code} course={course} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />)}
        </div>
    )
}