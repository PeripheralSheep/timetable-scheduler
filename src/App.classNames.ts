import { makeStyles, tokens } from "@fluentui/react-components";
export const useStyles = makeStyles({
    appRoot: {
        display: 'flex',
        flexDirection:'column',
        maxWidth:'1280px',
        width: '80%',
        minWidth:'400px',
        height:'80vh',
        margin: '0 auto',
        padding: '0 1rem',
        textAlign: 'center',
        border:'1px solid black',
        borderRadius:'10px',
        backgroundColor: tokens.colorNeutralBackground2,
    }
})