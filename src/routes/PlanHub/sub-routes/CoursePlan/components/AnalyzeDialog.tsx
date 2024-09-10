import { useStyles } from "../styles/analyzeDialog.classNames";
import { Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogActions,} from "@fluentui/react-components";
import AnalyzeDialogContent from "./AnalyzeDialogContent";
export default function AnalyzeDialog() {
    const classes = useStyles();
    return (
        <Dialog>
            <DialogTrigger>
                <button>Analyze Schedule</button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody className={classes.outerCard}>
                    <DialogTitle>Schedule Analysis</DialogTitle>
                    <AnalyzeDialogContent />
                    <DialogActions>
                        <DialogTrigger>
                            <button>Close</button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}