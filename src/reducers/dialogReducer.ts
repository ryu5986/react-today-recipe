import { DialogAction } from "../actions/dialogAction";
import { DialogState, DIALOG_OPEN, DIALOG_CLOSE } from "../types";

/**
 * 다이얼로그 상태 관리 하기위한 Reducer
 */

export const initialState: DialogState = {

    isOpen: false,
    message: ''

}

function dialogReducer(state: DialogState = initialState, action: DialogAction){
    
    switch (action.type) {
        case DIALOG_OPEN:
          return { isOpen: state.isOpen = true, message: action.payload };
        case DIALOG_CLOSE:
          return { isOpen: state.isOpen = false, message: '' };
        default:
          return state;
    }

}

export default dialogReducer;