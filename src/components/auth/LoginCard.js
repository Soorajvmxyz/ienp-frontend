import 'bootstrap/dist/css/bootstrap.min.css'
import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../api/axios'

function LoginCard(props){


    const history = useHistory()
    const usernameRef = useRef()
    const passwordRef = useRef()


    async function loginHandler(event){
        event.preventDefault();

        const enteredUsername = usernameRef.current.value;
        const enteredPassword = passwordRef.current.value;

        const userData = {
            username: enteredUsername,
            password: enteredPassword,
        }
        
        await axios
            .post('/api/auth/login', userData)
            .then(res => {
                localStorage.setItem('login', JSON.stringify(
                    {   
                        login:'true',
                        token:res.data.accessToken
                    }
                    ));
                console.log(res);
                history.push('/home')
            });
    }

    return(
        
            <div className='card-body'>
            <form >
                <label htmlFor='username' className='mb-2'>Username</label>
                <input 
                    className='form-control align-self-start mb-2' 
                    type="text" 
                    ref={usernameRef} 
                    id="username"
                    required></input>
                <label htmlFor='passsword' className='mb-2'>Password</label>
                <input 
                    className='form-control align-self-start mb-2' 
                    type="password" 
                    ref={passwordRef} 
                    id="password"
                    required></input>
                <button className='btn btn-outline-dark mt-2' onClick={loginHandler}>Login</button>

            </form>
            </div>
            
    )
}

export default LoginCard