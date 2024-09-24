import { useStyles } from "./planHubIndex.classNames";
import { Link } from "react-router-dom";

export default function PlanHubIndex() {
    const classes = useStyles();
    
    return (
        <div className={classes.outerCard}>
            <h2>Choose One</h2>
            <Link to="completed-courses">Add Completed Courses</Link>
            <Link to="make-plan">Make Course Schedule</Link>
        </ div>
    )
}