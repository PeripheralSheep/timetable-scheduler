import { useStyles } from "./styles/coursePages.classNames";
import { Tooltip } from "@fluentui/react-components";
import { Filter16Regular, Filter32Regular } from "@fluentui/react-icons";
import TooltipContent from "./components/TooltipContent";
export default function MandatoryCoursesPage() {
    const classes = useStyles();
    return (
        <div className={classes.outerCard}>
            <h2>Choose Mandatory Courses Completed</h2>
            <div className={classes.filterButton}>{window.innerWidth < 480 ? <Filter32Regular/> : <>Filter <Filter16Regular /></>}</div>
            <div className={classes.filterOptions}>
                <div className={classes.filterField}>
                    <label htmlFor="">Area</label>
                    <select name="" id="">
                        <option value="">MATH</option>
                    </select>
                </div>
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
                <div className={classes.filterField}>
                    <label htmlFor="">Code</label>
                    <input type="number"/>
                </div>
                <div className={classes.filterField}>
                    <label htmlFor="">Faculty</label>
                    <select name="" id="">
                        <option value="">Science and Technology</option>
                    </select>
                </div>
            </div>
            <div className={classes.checkField}>
                <Tooltip content={<TooltipContent />} relationship="label" withArrow>
                    <div className={classes.checkboxOption}>
                        <input type="checkbox" value="hi" name="t" id="t"/>
                        <label htmlFor="t" className={classes.checkboxLabel}>TestTestTestTestTestTestTestTest</label>
                    </div> 
                </Tooltip>
                <Tooltip content="Test" relationship="label">
                    <div className={classes.checkboxOption}>
                        <input type="checkbox" value="hi"/>
                        <label htmlFor="">Test</label>
                    </div> 
                </Tooltip>
                <Tooltip content="Test" relationship="label">
                    <div className={classes.checkboxOption}>
                        <input type="checkbox" value="hi"/>
                        <label htmlFor="">Test</label>
                    </div> 
                </Tooltip>
                <Tooltip content="Test" relationship="label">
                    <div className={classes.checkboxOption}>
                        <input type="checkbox" value="hi"/>
                        <label htmlFor="">Test</label>
                    </div> 
                </Tooltip>
                <Tooltip content="Test" relationship="label">
                    <div className={classes.checkboxOption}>
                        <input type="checkbox" value="hi"/>
                        <label htmlFor="">Test</label>
                    </div> 
                </Tooltip>
                <Tooltip content="Test" relationship="label">
                    <div className={classes.checkboxOption}>
                        <input type="checkbox" value="hi"/>
                        <label htmlFor="">Test</label>
                    </div> 
                </Tooltip>
            </div>
        </ div>
    )
}