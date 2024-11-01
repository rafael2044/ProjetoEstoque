import { useState } from "react"
import PropTypes from "prop-types";

export default function EditRowUser({id, name, username, access_level, onSetEdit}){
    const [inputName, setInputName] = useState(name)
    const [inputUsername, setInputUsername] = useState(username)
    const [inputAccessLevel, setInputAccessLevel] = useState(access_level)

    return (
        <>
            <tr>
                <td>{id}</td>
                <td><input type="text" value={inputName} onChange={(e)=>{setInputName(e.target.value)}} className="form-control w-auto" /></td>
                <td><input type="text" value={inputUsername} onChange={(e)=>{setInputUsername(e.target.value)}}className="form-control w-auto" /></td>
                <td>
                    <select className="form-select" value={inputAccessLevel} onChange={(e)=>setInputAccessLevel(e.target.value)}>
                            <option value="padrao">Padrão</option>
                            <option value="administrador">Administrador</option>
                    </select></td>
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

EditRowUser.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    access_level: PropTypes.string.isRequired,
    onSetEdit: PropTypes.func.isRequired
}