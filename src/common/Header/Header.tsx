import { useStyles } from './styles/Header.classNames'

export default function Header() {
    const classes = useStyles();
    return (
        <header className={classes.header}>
            <a href="">Back</a>
            <h2>Degree</h2>
            <a href="">Next</a>
        </header>
    )
}