import { Field, Dropdown, OptionGroup, Option } from "@fluentui/react-components"
import { useStyles } from '../styles/WelcomeScreen.classNames';
import type { DegreesData } from "../types/degreeData.types";

export default function DegreeField({setDegree, degreeError, degreesData} : {
    setDegree: React.Dispatch<React.SetStateAction<string>>, 
    degreeError?:string,
    degreesData: DegreesData
}) {
    const classes = useStyles();
    let degreesArray = [];
    for(let degree in degreesData) {
        degreesArray.push({
            key: degree,
            name: degreesData[degree].name
        }) 
    }
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
                    {
                      degreesArray.map((degree)=> (
                        <Option value={degree.key} key={degree.key}>{degree.name}</Option>
                      ))
                    }
                    
                </OptionGroup>
            </Dropdown>
        </Field>
    )
}