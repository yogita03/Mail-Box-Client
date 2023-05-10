import React, { useState } from 'react';
import classes from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { userAction } from '../Store/User-Slice';



const Login = () => {
    
  const navigate = useNavigate()
  const dispatch = useDispatch()
 const [ toggle , setToggle] = useState(false)
 const [enterName , setEnterName] = useState('')
 const [enteremail , setEnterEmail] = useState('')
 const [enterpassword , setEnterPassword] = useState('')

  const toggleHandler=(e)=>{
setToggle(!toggle)
  }

  const submitHandler=(e)=>{
    e.preventDefault();
    if(!toggle){
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFij24pU4JIBt605cwLZvQQmfGkkaMioE',{
        method:'POST',
        body:JSON.stringify({email:enteremail, password:enterpassword ,returnSecureToken:true}) ,
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res=>{
        if(res.ok){
          return res.json()
        }else{
          return res.json().then((data)=>window.alert(data.error.message))
        }
      }).then((res)=>{
        console.log(res)
     dispatch(userAction.loggedInUpdater())
     dispatch(userAction.localIdUpdater(res.localId))
       dispatch(userAction.tokenUpdater(res.idToken))
        window.alert('LogIn Successful !!!')
        navigate('/home')
      })
    
    }else{
    
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFij24pU4JIBt605cwLZvQQmfGkkaMioE',{
        method:'POST',
        body:JSON.stringify({email:enteremail, password:enterpassword , userName: enterName , returnSecureToken:true}) ,
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res=>{
        if(res.ok){
          return res.json()
        }else{
          return res.json().then((data)=>window.alert(data.error.message))
        }
      }).then((res)=>{
        console.log(res)
        dispatch(userAction.tokenUpdater(res.idToken))
        dispatch(userAction.localIdUpdater(res.localId))
        dispatch(userAction.loggedInUpdater())
        window.alert('Sing Up successfull !!!')
        navigate('/home')
      })
    }
      
  }
  return (
    <div>
      
        <section className="vh-100">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black rounded">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{ toggle ? `Sign up` : `Sing In`}</p>
  
                  <form className="mx-1 mx-md-4" onSubmit={submitHandler}>
  
                    {toggle ? <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input type="text" id="form3Example1c" className="form-control" value={enterName} onChange={(e)=>setEnterName(e.target.value)} required/>
                        <label className="form-label" for="form3Example1c">Your Name</label>
                      </div>
                    </div> : null}
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input type="email" id="form3Example3c" className="form-control" value={enteremail} onChange={(e)=>setEnterEmail(e.target.value)} required/>
                        <label className="form-label" for="form3Example3c">Your Email</label>
                      </div>
                    </div>
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example4c" className="form-control" value={enterpassword} onChange={(e)=>setEnterPassword(e.target.value)} required />
                        <label className="form-label" for="form3Example4c">Password</label>
                      </div>
                    </div>
                    { !toggle ? 
                    <div className="form-check d-flex justify-content-center mb-5">
                      {/* <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" /> */}
                      <label className="form-check-label" for="form2Example3">
                        {/* <Link to='/forgetpassword'>Forget Password</Link> */}
                      </label>
                    </div> : null}
  
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg" disabled={!enterpassword ^ !enteremail}>{ toggle ? `Register` : `LogIn`}</button>
                    </div>
  
                  </form>
                  <div className={classes.already} onClick={toggleHandler}>
                    <div className='d-flex justify-content-center mt-3'><p>{toggle ? `Have an Account ? LogIn` : 'New Here ? Register'}</p></div>
                  </div>
  
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
  
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    className="img-fluid" alt="Sample image"/>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export default Login