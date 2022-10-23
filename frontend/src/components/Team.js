import React from "react";
import { useParams } from 'react-router-dom'

const Team = (props) => {

    const { id } = useParams();

    return (
        <React.Fragment>
            <h1>This is a dynamic page for {id} </h1>
        </React.Fragment>
    )
}
export default Team;