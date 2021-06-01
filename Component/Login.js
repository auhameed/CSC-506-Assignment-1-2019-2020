import '../css/Home.css';
import React, {Component, useState, useEffect} from 'react';
import { useHistory} from "react-router-dom"; 
import LoadingOverlay from "react-loading-overlay";
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Login = ({type, addProfile, profile}) => {
	const [option, setOption] = React.useState(type)
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [file, seFile] = useState('');
    const [passport, setPassport] = useState('');
    const [loader, setLoader] = useState(false);
    let history = useHistory();

    useEffect(() => {
        if(profile !== '')
        {
            history.push('/profile');
        }        
    })


    const getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            baseURL = reader.result;
            resolve(baseURL);
          };
        });
    };
    
    const handleFileInputChange = e => {

        seFile(e.target.files[0]);    

        getBase64(file)
            .then(result => {
            file["base64"] = result;
            seFile(file);
            setPassport(result);
            })
            .catch(err => {
                console.log(err);
            });
            seFile(e.target.files[0]);    
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(option === 1)
        {
            addProfile({email, password});
            history.push('/profile');
        }        
        else if(option === 2)
        {
            if(password !== password2){
                NotificationManager.warning('Password does not match.')
            }

            if(passport === ''){
                NotificationManager.warning('Passport not uploaded yet.')
            }

            if(email === ''){
                NotificationManager.warning('Email is required.')
            }

            if(fullname === ''){
                NotificationManager.warning('Name is required.')
            }
            const model = {
                email, fullname, password, phone, address, passport
            }
            setOption(1);setEmail('');setEmail('');setFullname('');setPassword('');setPassword2('');setPhone('');setAddress('');
            seFile('');setPassport('');setLoader(false);
        }        

    }
	
	return (
        <LoadingOverlay
            active={loader}
            spinner
            text="Fetching Data"
        >
    		<div className='container'>
			<header>
				<div className={'header-headings ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot')) }>
					<span>Sign in to your account</span>
					<span>Create an account</span>
					<span>Reset your password</span>
				</div>
			</header>
			<ul className='options'>
				<li className={option === 1 ? 'active' : ''} onClick={() => setOption(1)}>Login</li>
				<li className={option === 2 ? 'active' : ''} onClick={() => setOption(2)}>Register</li>
				{/* <li className={option === 3 ? 'active' : ''} onClick={() => setOption(3)}>Forgot</li> */}
			</ul>

            <form className='account-form' onSubmit={(evt) => handleSubmit(evt)}>
                <div className={'account-form-fields ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot'))}>
                    <input id='email' name='email' type='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} value={email} />
                    <input id='password' name='password' type='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
                    {
                        option === 2 &&
                        <>
                            <input id='password2' name='password2' type='password' placeholder='Repeat password' required onChange={(e) => setPassword2(e.target.value)} value={password2} />
                            <input id='fullname' name='fullname' type='text' placeholder='Full Name' required onChange={(e) => setFullname(e.target.value)} value={fullname} />
                            <input id='phone' name='phone' type='number' min="1" placeholder='Phone Number' required onChange={(e) => setPhone(e.target.value)} value={phone} />
                            <input id='address' name='address' type='text' placeholder='Address' required onChange={(e) => setAddress(e.target.value)} value={address} />
                            <input id='passport' name='passport' type='file' placeholder='Choose Passport' required 
                                accept="image/png, image/gif, image/jpeg"
                                onChange={(e) => handleFileInputChange(e)} 
                                // value={passport} 
                            />

                        </>
                    }
                </div>
                <button className='btn-submit-form' type='submit' >
                    {option === 1 ? 'Login' : (option === 2 ? 'Register' : 'Reset password')}
                </button>
            </form>

			<footer>
				<a href='#' target='_blank'>CSC 506 Web Development Assignment</a>
			</footer>
            <NotificationContainer />
		</div>
        </LoadingOverlay>
	)
}
  

export default Login