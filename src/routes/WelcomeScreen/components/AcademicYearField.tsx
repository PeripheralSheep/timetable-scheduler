import { Field, Dropdown, Option } from "@fluentui/react-components"
import { useStyles } from '../styles/WelcomeScreen.classNames';
import type { DegreesData } from "../types/degreeData.types";

export default function AcademicYearField({setAcademicYear, academicYearError, degreesData, chosenDegree} : {
    setAcademicYear: React.Dispatch<React.SetStateAction<string>>, 
    academicYearError?: string,
    degreesData: DegreesData,
    chosenDegree: string
}) {
    const classes = useStyles();
    const degreeYears = degreesData[chosenDegree]?.years ?? [];
    return(
        <Field
            label="Academic Year Enrolled in Degree"
            required
            className={classes.formField}
            validationState={academicYearError ? "error" : "none"}
            validationMessage={academicYearError}
        >
            <Dropdown
                placeholder='Academic Year'
                inlinePopup={true}
                clearable
                onOptionSelect={(event, data) => data.optionValue ? setAcademicYear(data.optionValue) : setAcademicYear('')}
                disabled={!chosenDegree}
            >
                {degreeYears.map( (year) => (
                    <Option value={`${year}-${year+1}`} key={`${year}-${year+1}`}>{`${year}-${year+1}`}</Option>
                    ))
                }
                
            </Dropdown>
        </Field>
    )
}