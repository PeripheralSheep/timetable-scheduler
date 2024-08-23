import { useStyles } from './styles/WelcomeScreen.classNames'
import { Field, Dropdown, Option, OptionGroup } from '@fluentui/react-components';
export default function WelcomeScreen() {
    const classes = useStyles();
    return (
        <div className={classes.outerCard}>
            <form action="" className={classes.form}>
                <h1 className={classes.formHeading}>Welcome to UWI Schedule Planner</h1>
                <Field
                    label="Choose Degree"
                    required
                    className={classes.formField}
                >
                    <Dropdown
                        placeholder='Choose degree'
                        inlinePopup={true}
                        clearable
                    >
                        <OptionGroup label="Science and Technology">
                            <Option key="BScCSAndMath">BSc Computer Science and Mathematics</Option>
                        </OptionGroup>
                    </Dropdown>
                </Field>
                <Field
                    label="Academic Year Enrolled in Degree"
                    required
                    className={classes.formField}
                >
                    <Dropdown
                        placeholder='Academic Year'
                        inlinePopup={true}
                        clearable
                    >
                        <Option key="20242025">2024-2025</Option>
                    </Dropdown>
                </Field>
                <button className={classes.submitButton}>Get Started</button>
            </form>
        </ div>
    )
}