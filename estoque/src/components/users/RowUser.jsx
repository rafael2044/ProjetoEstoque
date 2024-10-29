import { useState } from "react"
import EditRowUser from "./EditRowUser"
import { useAuth } from '../AuthContext';
export default function RowUser({user}){
    const [edit, setEdit] = useState(false)
    const {userAccessLevel} = useAuth()
    
    if (edit) return <><EditRowUser user={user} onSetEdit={setEdit}/></>
    return (
        <>
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.access_level}</td>
                <td>
                    <div className="row-auto">
                        <button className="btn btn-primary me-3" onClick={()=>setEdit(true)} disabled={userAccessLevel!='admin'}>Editar</button>
                        <button className="btn btn-danger" disabled={userAccessLevel!="admin"}>Excluir</button>
                    </div>
                </td>
            </tr>
        </>
    )
}