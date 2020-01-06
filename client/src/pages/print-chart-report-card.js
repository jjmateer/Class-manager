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
        console.log("working")
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
        return (
            <>
                <div className="table-responsive">
                    <table className="print-chart-table">
                        <thead>
                            <tr style={{ width: 400 }}>
                                {view_student.sdata ?
                                    <>
                                        <th>NOVEMBER</th>
                                        <th>MAY</th>
                                        <th>{view_student.subject.toUpperCase()}</th>
                                    </>
                                    : null}

                            </tr>
                        </thead>
                        <tbody>
                            {/* {view_student.sdata ? */}
                                <>
                                    {view_student.sdata.map((sdt) => (
                                        console.log(`TEST TEST`)
                                        // sdt.title === view_student.subject ?
                                        //     sdt.assignments.map((sdt2, index) => (
                                        //         <tr key={`${sdt2.title}${index}`}>
                                        //             <td style={{ width: "15%" }}>{sdt2.gradeN}</td>
                                        //             <td style={{ width: "15%" }}>{sdt2.gradeM}</td>
                                        //             <td>{sdt2.title}</td>
                                        //             TESTTEST
                                        //         </tr>
                                        //     ))
                                        //     : null
                                    ))}
                                </>
                                {/* : null} */}
                        </tbody>

                    </table>
                </div>
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