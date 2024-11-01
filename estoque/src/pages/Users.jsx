import { useEffect, useState } from 'react';
import FormUser from '../components/users/FormUser';
import RowUser from '../components/users/RowUser';
import Alert from '../components/alert/Alert';
import api from '../services/api';
import { useAuth } from '../components/AuthContext';

export default function Users(){
    const [users, setUsers] = useState([])
    const {currentUser} = useAuth()
    const [showAlert, setShowAlert] = useState(false)
    const [messageAlert, setMessageAlert] = useState("")
    const [typeAlert, setTypeAlert] = useState("")

    useEffect(()=>{
        const getData = async()=>{
            const res = await api.get("/api/user")
            if(res.status === 200){
                setUsers([...res.data])
                return
            }
            handleShowAlert(res.data.message, 'danger')
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
            const response = await api.post('/api/user', user);
            
            if (!response.status === 201) {
                console.log(response.data.message);
                throw new Error('Login failed');
            }
            setUsers([...users, response.data.user])
            
        } catch (error) {
          console.error('Erro ao cadastrar Usuario:', error);
        }
    }

    const deleteUser = async(id)=>{
        try{
            const res = await api.delete(`api/user/${id}`);
        
            if (res.status === 204){
                handleShowAlert("Usuário excluido com sucesso", 'success')
                setUsers(prev=>prev.filter(user=>user.id!=id))
            }else{
                handleShowAlert(res.data.message, 'danger')
            }
        }catch(error){
            handleShowAlert(error.message, 'danger')
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
                            <RowUser key={user.id} id={user.id} name={user.name} username={user.username} access_level={user.access_level} onDeleteUser={deleteUser} currentUser={user}/>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}