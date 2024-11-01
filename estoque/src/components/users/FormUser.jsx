import { useState } from "react"
import { useAuth } from '../AuthContext';

export default function FormUser({onInsertUser, onShowAlert}){
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [accessLevel, setAccessLevel] = useState("")
    const [password, setPassword] = useState("")
    const [password2 , setPassword2] = useState("")
    const [message, setMessage] = useState("")
    const {currentUser} = useAuth()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let  messageError = "";
        const validInput = name && username && password && password2 && accessLevel;
        const equalPassword = password === password2;
        if (!validInput){
            messageError+="*Alguns dos campos estão vazios" 
            if(!equalPassword){
                messageError+="\n*As senhas não coincidem"
            }
        }
        if (validInput && equalPassword){
            await onInsertUser({name, username, password, access_level:accessLevel})
            cleanInputs();
            onShowAlert("Usuário cadastrado com sucesso.", 'success')
        }else{
            onShowAlert(messageError, 'danger');
        }
    }
    const cleanInputs = ()=>{
        setName("")
        setUsername("")
        setPassword("")
        setPassword2("")
        setAccessLevel("")
    }

    return(
        <div >
            <form onSubmit={handleSubmit}>
                <div className="row g-1 mb-1">
                    <div className="col">
                        <input className="form-control fs-5" type="text" placeholder="Nome" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                    <div className="col-4">
                        <input className="form-control fs-5" type="text" placeholder="Nome de Usuário" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                    </div>
                </div>
                <div className="row g-1">
                    <div className="col-3">
                        <select className="form-select fs-5" value={accessLevel} onChange={(e)=>setAccessLevel(e.target.value)}>
                            <option defaultValue value="">Escolha um nível de acesso</option>
                            <option value="padrao">Padrão</option>
                            <option value="administrador">Administrador</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <input type="password" className="form-control fs-5" placeholder="Senha" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <div className="col-3">
                        <input type="password" className="form-control fs-5" placeholder="Confirmar Senha" value={password2} onChange={(e)=>setPassword2(e.target.value)} />
                    </div>
                    <div className="col">
                        <button className="btn btn-primary fs-5 fw-bold w-100" type="submit" disabled={currentUser.access_level!='administrador'}>Cadastrar</button>                        
                    </div>
                </div>
            </form>
        </div>
    )
}