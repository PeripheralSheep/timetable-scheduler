import { useStyles } from './styles/Header.classNames'
export default function Header() {
    const classes = useStyles();
    return (
        <header className={classes.header}>
            <h2>Degree</h2>
        </header>
    )
}