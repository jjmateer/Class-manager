import axios from "axios";
import { returnErrors } from "../actions/error-actions";
import jwt_decode from "jwt-decode";

import {
    ADD_STUDENT,
    ADD_STUDENT_FAIL,
    ADD_STUDENT_SUCCESS,
    UPDATE_STUDENT_INFO,
    UPDATE_STUDENT_INFO_SUCCESS,
    UPDATE_STUDENT_INFO_FAIL,
    VIEW_STUDENT
} from "./types";

export const loadUser = () => (dispatch) => {
    dispatch({ type: USER_LOADING });
    if (localStorage.getItem("jwtToken")) {
        const body = {
            id: jwt_decode(localStorage.getItem("jwtToken")).id,
            token: localStorage.getItem("jwtToken")
        }

        axios
            .post('http://localhost:3001/api/auth/user', body)
            .then(res => {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: AUTH_ERROR
                });
            });
    } else {
        dispatch({ type: AUTH_ERROR });
    }
};