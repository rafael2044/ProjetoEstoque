import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import FormUser from '../components/users/FormUser';
import RowUser from '../components/users/RowUser';
import Alert from '../components/alert/Alert';

export default function Users(){
    const {userAccessLevel}= useAuth()
    const [users, setUsers] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    const [messageAlert, setMessageAlert] = useState("")
    const [typeAlert, setTypeAlert] = useState("")

    useEffect(()=>{
        const getData = async()=>{
            const res = await fetch("http://127.0.0.1:3000/api/user", {
                method:"GET"
            })
            if(res.ok){
                const data = await res.json();
                setUsers([...data])
            }
        }
        getData()
    }, [])

    const handleShowAlert = (message, type)=>{
        setMessageAlert(message)
        setTypeAlert(type)
        setShowAlert(true);
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
      };

    const insertUser = async(user)=>{
        try {
            const response = await fetch('http://127.0.0.1:3000/api/user', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(user)
            });
        
            if (!response.ok) {
                const data = await response.json();
                console.log(data.message);
                throw new Error('Login failed');
            }
            const data = await response.json();
            setUsers([...users, data])
            
        } catch (error) {
          console.error('Erro ao cadastrar Usuario:', error);
        }
    }
    return(
        <div className='container'>
            {showAlert && (
                <Alert
                message={messageAlert}
                type={typeAlert}
                onClose={handleCloseAlert}
                duration={5000}
                />
            )}
            <div className="row mt-3">
                <h1 className='text-center fw-bold'>Usuários</h1>
            </div>
            <div className="row justify-content-center align-items-center mb-3">
                <div className="col">
                    <h2 className='fw-bold'>Cadastrar usuário</h2>
                    <FormUser onInsertUser={insertUser} onShowAlert={handleShowAlert}/>
                </div>
            </div>
            <div className="row">
                <h2 className='fw-bold'>Lista de Usuários</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className='fs-5'>ID</th>
                            <th scope="col" className='fs-5'>Nome</th>
                            <th scope="col" className='fs-5'>Usuário</th>
                            <th scope="col" className='fs-5'>Nível de Acesso</th>
                            <th scope='col' className='fs-5'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <RowUser key={user.id} user={user}/>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}