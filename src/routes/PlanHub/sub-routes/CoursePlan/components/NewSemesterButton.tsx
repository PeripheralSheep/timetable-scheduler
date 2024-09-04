import Button from "./Button";
import { useStyles } from "../styles/coursePlan.classNames";
export default function NewSemesterButton() {
    const classes = useStyles();
    return(
        <Button contextClass={classes.addNewSemesterButton}>+ Add New Semester</Button>
    )
}