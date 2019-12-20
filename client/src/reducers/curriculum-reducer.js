import {
    VIEW_CURRICULUM,
    EDIT_CURRICULUM,
    EDIT_CURRICULUM_SUCCESS,
    EDIT_CURRICULUM_FAIL,
    CREATE_CURRICULUM,
    CREATE_CURRICULUM_SUCCESS,
    CREATE_CURRICULUM_FAIL,
    GET_SUBJECTS,
    GET_SUBJECTS_FAIL,
    GET_SUBJECTS_SUCCESS,
    DELETE_SUBJECT,
    DELETE_SUBJECT_FAIL,
    DELETE_SUBJECT_SUCCESS
} from "../actions/types";

const inititalState = {
    msg: {},
    isLoading: false,
    subjects: []
};

export default function (state = inititalState, action) {
    switch (action.type) {
        case VIEW_CURRICULUM:
            return {
                ...state,
                isLoading: false,
                subjects: action.payload,
            }
        case EDIT_CURRICULUM:
        case CREATE_CURRICULUM:
        case GET_SUBJECTS:
        case DELETE_SUBJECT:
            return {
                ...state,
                isLoading: true
            }
        case EDIT_CURRICULUM_FAIL:
        case CREATE_CURRICULUM_FAIL:
        case GET_SUBJECTS_FAIL:
        case DELETE_SUBJECT_FAIL:
            return {
                ...state,
                isLoading: false,
                subjects: null,
                msg: action.payload
            }
        case EDIT_CURRICULUM_SUCCESS:
        case CREATE_CURRICULUM_SUCCESS:
        case GET_SUBJECTS_SUCCESS:
        case DELETE_SUBJECT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                subjects: action.payload
            }
        default:
            return state;
    }

}