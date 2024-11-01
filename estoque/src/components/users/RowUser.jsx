import { useState } from "react"
import EditRowUser from "./EditRowUser"
import { useAuth } from '../AuthContext';
import PropTypes from "prop-types";
export default function RowUser({id, name, username, access_level, onDeleteUser}){
    const [edit, setEdit] = useState(false)
    const {currentUser} = useAuth()

    const handlerDeleteUser = (e)=>{
        if (confirm("Deseja Excluir o usuário?")) return onDeleteUser(id)
            else return
    }
    
    if (edit) return <><EditRowUser id={id} name={name} username={username} access_level={access_level} onSetEdit={setEdit}/></>
    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{username}</td>
                <td>{access_level}</td>
                <td>
                    <div className="row-auto">
                        <button className="btn btn-primary me-3" onClick={()=>setEdit(true)} disabled={currentUser.access_level!='administrador'}>Editar</button>
                        <button className="btn btn-danger" onClick={handlerDeleteUser} disabled={currentUser.access_level!="administrador"}>Excluir</button>
                    </div>
                </td>
            </tr>
        </>
    )
}

RowUser.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    access_level: PropTypes.string.isRequired
}