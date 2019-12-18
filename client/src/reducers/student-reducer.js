import {
    ADD_STUDENT,
    ADD_STUDENT_FAIL,
    ADD_STUDENT_SUCCESS,
    UPDATE_STUDENT_INFO,
    UPDATE_STUDENT_INFO_SUCCESS,
    UPDATE_STUDENT_INFO_FAIL,
    VIEW_STUDENT
} from "../actions/types";

const initialState = {
    msg: {},
    isLoading: false,
    show_form: false,
    view_student: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case VIEW_STUDENT:
            return {
                ...state,
                view_student: action.payload
            }
        case ADD_STUDENT:
        case UPDATE_STUDENT_INFO:
            return {
                ...state,
                isLoading: true
            }
        case ADD_STUDENT_FAIL:
        case UPDATE_STUDENT_INFO_FAIL:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                view_student: null

            }
        case ADD_STUDENT_SUCCESS:
        case UPDATE_STUDENT_INFO_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        default:
            return state;

    }
}