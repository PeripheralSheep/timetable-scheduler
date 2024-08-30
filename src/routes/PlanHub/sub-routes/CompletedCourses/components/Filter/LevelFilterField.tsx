import { useStyles } from "../../styles/CompletedCourses.classNames";

export default function LevelFilterField() {
    const classes = useStyles();
    return (
        <div className={classes.filterField}>
            <span>Level</span>
            <span className={classes.levelCheckboxes}>
                <span className={classes.levelCheckbox}>
                    <input id="1" name="1" type="checkbox" />
                    <label  htmlFor="1">1</label>
                </span>
                <span className={classes.levelCheckbox}>
                    <input id="2" name="2" type="checkbox" />
                    <label htmlFor="2">2</label>
                </span>
                <span className={classes.levelCheckbox}>
                    <input id="3" name="3" type="checkbox" />
                    <label htmlFor="3">3</label>
                </span>
            </span>
        </div>
    )
}