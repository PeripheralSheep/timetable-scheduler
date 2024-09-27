import { makeStyles, tokens } from "@fluentui/react-components";
export const useStyles = makeStyles({
    outerCard: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        width:'100%',
        margin:'auto',
        minWidth:'fit-content',
        alignItems: 'center'
    },
    passFailCards: {
        flex: '1 1 auto',
        minWidth: '360px',
        '& h2': {
            textAlign:'center'
        },
        textAlign: 'left',
        width:'100%',
        '& ul': {
            paddingLeft: '20px'
        }
    },
    passList: {
        '& > li':{
            listStyleImage: 'url("/src/assets/checkmark.svg")'
        }
    },
    failList: {
        '& > li':{
            listStyleImage: 'url("/src/assets/cross.svg")',
            '& ul li': {
                listStyleImage: 'none',
                listStyleType: "-"
            }
        }
    }
})