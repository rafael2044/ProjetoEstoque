import { useState } from "react"

export default function EditRowUser({user, onSetEdit}){
    return (
        <>
            <tr>
                <td>{user.id}</td>
                <td><input type="text" value={user.name} className="form-control w-auto" /></td>
                <td><input type="text" value={user.username} className="form-control w-auto" /></td>
                <td>{user.access_level}</td>
                <td>
                    <div className="row-auto">
                        <button className="btn btn-primary me-3">Salvar</button>
                        <button className="btn btn-danger" onClick={()=>{onSetEdit(false)}}>Cancelar</button>
                    </div>
                </td>
            </tr>
        </>
    )
}