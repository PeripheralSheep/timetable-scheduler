import { useState, useEffect} from "react";
import { Filter16Regular } from "@fluentui/react-icons";
import { useStyles } from "../../styles/CompletedCourses.classNames";
import LevelFilterField from "./LevelFilterField";
import DisciplineFilterField from "./DisciplineFilterField";
import CourseCodeFilterField from "./CourseCodeFilterField";
import FacultyFilterField from "./FacultyFilterField";
import type { FilterState } from "../../types/FilterTypes.types";
import { mergeClasses } from "@fluentui/react-components";

export default function Filter(props : FilterState ) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [filterVisibility, setFilterVisibility] = useState<boolean>(false);
    const classes = useStyles();
    const windowWidthBreakpoint = 480;

    useEffect( () => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
    },[])

    const toggleButton = () => {
        setFilterVisibility( (visibility) => !visibility);
    };

    return(
        <>
            <button onClick={toggleButton} className={classes.filterButton}>
                {windowWidth >= windowWidthBreakpoint && "Filter"} <Filter16Regular />
            </button>
            <div className={mergeClasses(classes.filterOptions,filterVisibility && "visible")}>
                <DisciplineFilterField {...props} />
                <LevelFilterField {...props}/>
                <CourseCodeFilterField {...props}/>
                <FacultyFilterField {...props}/>
            </div>
        </>
    )
}