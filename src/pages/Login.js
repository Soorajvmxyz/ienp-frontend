import { useState } from "react";
import LoginCard from "../components/auth/LoginCard";
import SignupCard from "../components/auth/SignupCard";
import Card from "../components/ui/Card";


function Login(){

    const [isAUser, setIsAUser] = useState(false)

    const alreadyUserHandler = () => {
        setIsAUser(!isAUser)
    }

    return(
        <div className="d-flex justify-content-center">
        <Card>
        {isAUser?<LoginCard/>:<SignupCard />}
        <div className='card-footer'>
                <span onClick={alreadyUserHandler} className="text-primary">{isAUser?"Create Account":"Already a user"}</span>
        </div>
        </Card>
        </div>
        
    )
}

export default Login;