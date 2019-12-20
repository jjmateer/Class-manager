import {
    ADD_STUDENT,
    ADD_STUDENT_FAIL,
    ADD_STUDENT_SUCCESS,
    UPDATE_STUDENT_INFO,
    UPDATE_STUDENT_INFO_SUCCESS,
    UPDATE_STUDENT_INFO_FAIL,
    VIEW_STUDENT,
    GET_STUDENTS,
    GET_STUDENTS_FAIL,
    GET_STUDENTS_SUCCESS
} from "../actions/types";

const initialState = {
    msg: {},
    isLoading: false,
    students: [],
    view_student: {}
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
        case GET_STUDENTS:
            return {
                ...state,
                isLoading: true
            }
        case ADD_STUDENT_FAIL:
        case UPDATE_STUDENT_INFO_FAIL:
        case GET_STUDENTS_FAIL:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                view_student: null

            }
        case ADD_STUDENT_SUCCESS:
        case UPDATE_STUDENT_INFO_SUCCESS:
        case GET_STUDENTS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            }
        default:
            return state;

    }
}