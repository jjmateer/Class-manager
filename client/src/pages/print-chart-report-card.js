import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { getStudents } from "../actions/student-actions";
import "../Components/student-components/print-chart.css";


class PrintChartRC extends Component {

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
        const { sdata } = view_student;
        const { grades } = sdata;
        return (
            <>
                {
                    grades ?
                        grades.map((sdt) => (
                            <div style={{ transform: "rotate(90deg)"}} className="table-responsive">
                                <table className="print-chart-table">
                                    <thead>
                                        <tr style={{ width: 400 }}>
                                            {grades ?
                                                <>
                                                    <th>NOVEMBER</th>
                                                    <th>MAY</th>
                                                    <th>{sdt.title.toUpperCase()}</th>
                                                </>
                                                : null}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grades ?
                                            <>
                                                {grades.map((sdt) => (
                                                    sdt.assignments.map((sdt2, index) => (
                                                        <tr key={`${sdt2.title}${index}`}>
                                                            <td style={{ width: "15%" }}>{sdt2.gradeN}</td>
                                                            <td style={{ width: "15%" }}>{sdt2.gradeM}</td>
                                                            <td>{sdt2.title}</td>
                                                        </tr>
                                                    ))
                                                ))}
                                            </>
                                            : null}
                                    </tbody>

                                </table>
                            </div>
                        ))
                        : null}
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
)(PrintChartRC);