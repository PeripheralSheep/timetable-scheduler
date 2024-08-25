import { useStyles } from "./styles/coursePages.classNames";
import { Tooltip, Popover, PopoverTrigger, PopoverSurface } from "@fluentui/react-components";
import { Filter16Regular, Filter32Regular } from "@fluentui/react-icons";
import TooltipContent from "./components/TooltipContent";
export default function MandatoryCoursesPage() {
    const classes = useStyles();
    return (
        <div className={classes.outerCard}>
            <div className={classes.instructionLine}>
                <span>filter</span>
                <h2>Choose Mandatory Courses Completed</h2>
                <Popover trapFocus size="medium">
                    <PopoverTrigger>
                        {window.innerWidth < 480 ? <Filter32Regular/> : <span>Filter <Filter16Regular /></span>}
                    </PopoverTrigger>
                    <PopoverSurface>
                        <div className={classes.filterOptions}>
                            <div>
                                <label htmlFor="">Area</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label htmlFor="">Level</label>
                                <input type="text" />
                            </div>
                            <div>
                                <label htmlFor="">Code</label>
                                <input type="number" />
                            </div>
                            <div>
                                <label htmlFor="">Faculty</label>
                                <input type="text" />
                            </div>
                        </div>
                    </PopoverSurface>
                </Popover>
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