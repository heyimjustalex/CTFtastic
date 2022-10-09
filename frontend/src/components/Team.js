import React from "react";
import styles from './Team.module.css';
const Team = (props) => {
    return (
        <React.Fragment>
            <tr>
                <td className={styles['team-id']}>{props.id}</td>
                <td>{props.name}</td>
                <td> {props.points}</td>
            </tr>
        </React.Fragment>
    )
}
export default Team;