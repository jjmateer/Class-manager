import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { clearErrors } from "../actions/error-actions";
import { loadUser } from "../actions/auth-actions";
import { getStudents } from "../actions/student-actions";
import "../Components/student-components/print-chart.css";


class PrintChartAll extends Component {

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
        user: PropTypes.object,
        curriculum: PropTypes.object.isRequired
    }

    render() {
        return (
            <>
                <div className="table-responsive">
                    <table className="print-chart-table">
                        <thead>
                            <tr>
                                <td />
                                {this.props.student.students[0] ?
                                    this.props.student.students[0].grades.map((sdt) => (
                                        <>
                                            {this.props.curriculum.view_subject.title === sdt.title ?

                                                sdt.assignments.map((sdt2, index) => (
                                                    <th id="sideways-title-wrap" key={sdt2.title}><p id="sideways-title">{sdt2.title}</p></th>
                                                ))

                                                : null}
                                        </>
                                    )) : null}

                                {/* {this.props.curriculum.view_subject.title ?

                                    this.props.student.students.map((sdt) => (
                                        sdt.grades.map((sdt2) => {
                                            sdt2.title === this.props.curriculum.view_subject.title ?
                                        })
                                    ))

                                    } */}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.student.students ?
                                (this.props.student.students.map((sdt, index) => (
                                    <tr key={sdt._id}>
                                        <th>{sdt.firstName}</th>
                                        {sdt.grades.map((sdt2, index) => (
                                                this.props.curriculum.view_subject.title === sdt2.title ?
                                                    sdt2.assignments.map((sdt3, index) => (
                                                        <td key={sdt3.title}>{sdt3.grade}</td>
                                                    ))
                                                    :null

                                        ))}
                                    </tr>
                                )))
                                : null}

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
    curriculum: state.curriculum,
    auth: state.auth,
    error: state.error
})

export default connect(
    mapStateToProps,
    { clearErrors, loadUser, getStudents }
)(PrintChartAll);