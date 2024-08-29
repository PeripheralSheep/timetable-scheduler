import { Field, Dropdown, OptionGroup, Option } from "@fluentui/react-components"
import { useStyles } from '../styles/WelcomeScreen.classNames';

export default function DegreeField({setDegree, degreeError} : {setDegree: React.Dispatch<React.SetStateAction<string>>, degreeError?:string}) {
    const classes = useStyles();
    return (
        <Field
            label="Choose Degree"
            required
            className={classes.formField}
            validationState={degreeError ? "error" : "none"}
            validationMessage={degreeError}
        >
            <Dropdown
                placeholder='Choose degree'
                inlinePopup={true}
                clearable
                onOptionSelect={(event, data) => data.optionValue ? setDegree(data.optionValue) : setDegree('')}
            >
                <OptionGroup label="Science and Technology">
                    <Option value="BScCSAndMath" key="BScCSAndMath">BSc Computer Science and Mathematics</Option>
                </OptionGroup>
            </Dropdown>
        </Field>
    )
}