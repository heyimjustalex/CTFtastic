import React from "react";

const Team = (props) => {
    return (
        <React.Fragment>
            <tr>
                <td>{props.id}</td>
                <td>{props.name}</td>
                <td> {props.points}</td>
            </tr>
        </React.Fragment>
    )
}
export default Team;