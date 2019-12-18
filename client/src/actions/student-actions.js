import axios from "axios";
import { returnErrors } from "../actions/error-actions";

import {
    ADD_STUDENT,
    ADD_STUDENT_FAIL,
    ADD_STUDENT_SUCCESS,
    UPDATE_STUDENT_INFO,
    UPDATE_STUDENT_INFO_SUCCESS,
    UPDATE_STUDENT_INFO_FAIL,
    VIEW_STUDENT
} from "./types";

export const addStudent = data => (dispatch) => {
    console.log(data);
    dispatch({ type: ADD_STUDENT });
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post('http://localhost:3001/api/student/new', data, config)
        .then(res => {
            dispatch({
                type: ADD_STUDENT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: ADD_STUDENT_FAIL
            });
        });
};