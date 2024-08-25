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
        '@media (min-width: 480px)': {
            height: '80vh',
            width: '80%',
            border:'1px solid black',
        },
        overflow:'scroll'
    }
})