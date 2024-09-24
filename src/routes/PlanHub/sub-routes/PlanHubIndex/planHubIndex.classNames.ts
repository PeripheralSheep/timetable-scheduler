import { makeStyles, tokens } from "@fluentui/react-components";
export const useStyles = makeStyles({
    outerCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        flex: '1 1 auto',
        gap: tokens.spacingVerticalM,
        width:'80%',
        margin:'auto',
        minWidth:'fit-content',
        height: '90%'
    }
})