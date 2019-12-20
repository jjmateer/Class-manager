import {
    VIEW_CURRICULUM,
    EDIT_CURRICULUM,
    EDIT_CURRICULUM_SUCCESS,
    EDIT_CURRICULUM_FAIL,
    CREATE_CURRICULUM,
    CREATE_CURRICULUM_SUCCESS,
    CREATE_CURRICULUM_FAIL
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
                isLoading: false,
                assignments: action.payload,
            }
        case EDIT_CURRICULUM:
        case CREATE_CURRICULUM:
            return {
                ...state,
                isLoading: true
            }
        case EDIT_CURRICULUM_FAIL:
        case CREATE_CURRICULUM_FAIL:
            return {
                ...state,
                isLoading: false,
                assignments: null,
                msg: action.payload
            }
        case EDIT_CURRICULUM_SUCCESS:
        case CREATE_CURRICULUM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                assignments: action.payload
            }
        default:
            return state;
    }

}