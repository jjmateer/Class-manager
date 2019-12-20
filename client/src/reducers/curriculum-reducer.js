import {
    GET_ERRORS,
    CLEAR_ERRORS,
    VIEW_CURRICULUM,
    EDIT_CURRICULUM,
    EDIT_CURRICULUM_SUCCESS,
    EDIT_CURRICULUM_FAIL
} from "../actions/types";

const inititalState = {
    assignments: [],
    msg: {},
    isLoading: false

};

export default function (state = inititalState, action) {
    switch (action.type) {
        case VIEW_CURRICULUM:
            return {
                ...state,
                assignments: action.payload,
            }
        case EDIT_CURRICULUM:
            return {
                ...state,
                isLoading: true
            }
        case EDIT_CURRICULUM_FAIL:
            return {
                ...state,
                isLoading:false,
                assignments: null,
                msg:action.payload
            }
        case EDIT_CURRICULUM_SUCCESS:
            return {
                ...state,
                isLoading:false,
                assignments:action.payload
            }
        default:
            return state;
    }

}