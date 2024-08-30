import { useState, useEffect, useRef } from "react";
import { Filter16Regular } from "@fluentui/react-icons";
import { useStyles } from "../../styles/CompletedCourses.classNames";
import LevelFilterField from "./LevelFilterField";
import DisciplineFilterField from "./DisciplineFilterField";
import CourseCodeFilterField from "./CourseCodeFilterField";
import FacultyFilterField from "./FacultyFilterField";

export default function Filter() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const filterOptionsRef = useRef<HTMLDivElement>(null);
    const classes = useStyles();
    
    const windowWidthBreakpoint = 480;

    useEffect( () => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
    },[])

    const toggleButton = () => {
        filterOptionsRef.current?.classList.toggle('visible')
    };

    return(
        <>
            <button onClick={toggleButton} className={classes.filterButton}>
                {windowWidth >= windowWidthBreakpoint && "Filter"} <Filter16Regular />
            </button>
            <div ref={filterOptionsRef} className={classes.filterOptions}>
                <DisciplineFilterField />
                <LevelFilterField />
                <CourseCodeFilterField />
                <FacultyFilterField />
            </div>
        </>
    )
}