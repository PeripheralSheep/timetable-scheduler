import { Field, Dropdown, Option } from "@fluentui/react-components"
import { useStyles } from '../styles/WelcomeScreen.classNames';

export default function AcademicYearField({setAcademicYear, academicYearError} : {setAcademicYear: React.Dispatch<React.SetStateAction<string>>, academicYearError?: string}) {
    const classes = useStyles();
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
            >
                <Option value="20242025" key="20242025">2024-2025</Option>
            </Dropdown>
        </Field>
    )
}