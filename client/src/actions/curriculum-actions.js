import axios from "axios";
import { returnErrors } from "../actions/error-actions";

import {
    VIEW_CURRICULUM,
    EDIT_CURRICULUM,
    EDIT_CURRICULUM_SUCCESS,
    EDIT_CURRICULUM_FAIL,
    CREATE_CURRICULUM,
    CREATE_CURRICULUM_SUCCESS,
    CREATE_CURRICULUM_FAIL,
    GET_SUBJECTS,
    GET_SUBJECTS_SUCCESS,
    GET_SUBJECTS_FAIL,
    ADD_ASSIGNMENT,
    ADD_ASSIGNMENT_SUCCESS,
    ADD_ASSIGNMENT_FAIL
} from "./types";

export const getSubjects = () => (dispatch) => {
    dispatch({ type: GET_SUBJECTS })

    axios.get(`http://localhost:3001/api/curriculum/get-all`)
        .then(res => {
            dispatch({
                type: GET_SUBJECTS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ type: GET_SUBJECTS_FAIL })
        })
}

export const createCurriculum = title => (dispatch) => {
    console.log(title);
    dispatch({ type: CREATE_CURRICULUM })

    axios.post(`http://localhost:3001/api/curriculum/new/${title}`)
        .then(res => {
            dispatch({
                type: CREATE_CURRICULUM_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ type: CREATE_CURRICULUM_FAIL })
        })
}

export const addAssignment = (title, data) => (dispatch) => {

    dispatch({ type: ADD_ASSIGNMENT })

    axios.post(`http://localhost:3001/api/curriculum/add-assignment/:title`, data)
        .then(res => {
            dispatch({
                type: ADD_ASSIGNMENT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ type: ADD_ASSIGNMENT_FAIL })
        })
}

export const viewCurriculum = () => (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.get("http://localhost:3001/api/curriculum/view", config)
        .then(res => {
            dispatch({
                type: VIEW_CURRICULUM,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
}

export const editCurriculum = data => (dispatch) => {
    dispatch({ type: EDIT_CURRICULUM });
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    axios.post('http://localhost:3001/api/curriculum/edit', data, config)
        .then(res => {
            dispatch({
                type: EDIT_CURRICULUM_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: EDIT_CURRICULUM_FAIL
            });
        });
};