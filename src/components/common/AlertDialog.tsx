import { Dialog, IconButton } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react/jsx-runtime";
import { dialogClose } from "../../actions/dialogAction";
import { RootState } from "../../reducers";
import CloseIcon from '@material-ui/icons/Close';

/**
 * 다이얼로그 컴포넌트
 * @returns 
 */
export default function AlertDialog(){

    const isOpen = useSelector((state: RootState) => state.dialogReducer.isOpen);
    const message = useSelector((state: RootState) => state.dialogReducer.message);
    const dispatch = useDispatch();
    

    if(!isOpen){
        return null;
    }

    const messageText = `${message}`;

    const onClose = () => {
        dispatch(dialogClose());
    }

    return (
        <Fragment>
        <Dialog open={isOpen} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <Alert variant="filled" severity="error">{ messageText } 
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={onClose}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            </Alert>
        </Dialog>
        </Fragment>
    );

}
