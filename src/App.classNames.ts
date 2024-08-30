import { makeStyles, tokens } from "@fluentui/react-components";
export const useStyles = makeStyles({
    appRoot: {
        display: 'flex',
        flexDirection:'column',
        maxWidth:'1280px',
        minWidth:'320px',
        margin: '0 auto',
        textAlign: 'center',
        padding:'1rem',
        borderRadius:'10px',
        backgroundColor: tokens.colorNeutralBackground2,
        height:'100vh',
        width:'100%',
        '@media (min-width: 1044px)': {
            height: '90vh',
            width: '90%',
            border:'1px solid black',
            paddingTop: '0'
        },
        overflow:'auto'
    }
})