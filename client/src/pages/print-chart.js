import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { getStudents } from "../actions/student-actions";
import "../Components/student-components/print-chart.css";


class PrintChart extends Component {

    componentDidMount() {
        this.props.getStudents();
    }
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        getStudents: PropTypes.func.isRequired,
        student: PropTypes.object.isRequired,
        user: PropTypes.object
    }

    render() {
        const { view_student } = this.props.student;
        console.log(view_student)
        return (
            <>
                <table className="print-chart-table" style={{ width: "90%", margin: "auto" }}>
                    <thead>
                        <tr>
                            {/* {this.props.student.view_student.map((sdt) => (
                                <th>{sdt}</th>
                            ))} */}

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        </tr>
                    </tbody>

                </table>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    student: state.student,
    auth: state.auth,
    error: state.error
})

export default connect(
    mapStateToProps,
    { clearErrors, loadUser, getStudents }
)(PrintChart);