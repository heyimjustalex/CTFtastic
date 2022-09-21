
const Team = (props) => {
    return (
        <>
            <tr>
                <td>{props.id}</td>
                <td>{props.name}</td>
                <td> {props.points}</td>
            </tr>
        </>
    )
}
export default Team;