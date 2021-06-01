import '../css/Home.css';
import React, {Component, useState, useEffect} from 'react';
import { useHistory} from "react-router-dom"; 
import LoadingOverlay from "react-loading-overlay";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {Table, Card} from 'react-bootstrap';

const Profile = ({addProfile}) => {
	const [option, setOption] = React.useState(1)
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [file, seFile] = useState('');
    const [passport, setPassport] = useState('');
    const [loader, setLoader] = useState(false);
    const [profile, setProfile] = useState('');
    let history = useHistory();

    useEffect(() => {

        const data = localStorage.getItem('profile');    
        if(data){
            loadData(JSON.parse(data));
        }
    })

    const loadData = (data) => {
        if(!data || data === ''){
            history.push('/');
        }
        setEmail(data.email);
        setFullname(data.fullname);
        setAddress(data.address);
        setPhone(data.phone);
        setPassport(data.passport);

    }

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
					<span>My Profile</span>
					<span>Edit Profile</span>
					<span>Change Password</span>
				</div>
			</header>
			<ul className='options'>
				<li className={option === 1 ? 'active' : ''} onClick={() => setOption(1)}>View</li>
				<li className={option === 2 ? 'active' : ''} onClick={() => setOption(2)}>Edit</li>
				<li className={option === 3 ? 'active' : ''} onClick={() => setOption(3)}>Change Password</li>
			</ul>

            {option === 1 &&
                <div className='account-form' style={{alignItems: 'center'}}>
                    <img
                        src={`https://www.clipartmax.com/png/small/248-2487966_matthew-man-avatar-icon-png.png`} 
                        height="100"
                        width="100"
                        className="img-thumbnail float-right"
                    />
                    <Card style={{ width: '100%', marginTop: '1em' }}>
                        <Card.Body>
                            <Table striped bordered hover>
                                <tr>
                                    <th>Email</th>
                                    <td>{`email`}</td>
                                </tr>
                                <tr>
                                    <th>Full Name</th>
                                    <td>{`email`}</td>
                                </tr>
                                <tr>
                                    <th>Phone Number</th>
                                    <td>{`email`}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{`email`}</td>
                                </tr>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            }
            {option === 2 &&
                <>
                    <form className='account-form' onSubmit={(evt) => handleSubmit(evt)}>
                        <div className={'account-form-fields ' + (option === 1 ? 'sign-in' : (option === 2 ? 'sign-up' : 'forgot'))}>
                            <input id='email' name='email' type='email' placeholder='E-mail' required onChange={(e) => setEmail(e.target.value)} value={email} />
                            <input id='password' name='password' type='password' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
                            <input id='password2' name='password2' type='password' placeholder='Repeat password' required onChange={(e) => setPassword2(e.target.value)} value={password2} />
                            <input id='fullname' name='fullname' type='text' placeholder='Full Name' required onChange={(e) => setFullname(e.target.value)} value={fullname} />
                            <input id='phone' name='phone' type='number' min="1" placeholder='Phone Number' required onChange={(e) => setPhone(e.target.value)} value={phone} />
                            <input id='address' name='address' type='text' placeholder='Address' required onChange={(e) => setAddress(e.target.value)} value={address} />
                            <input id='passport' name='passport' type='file' placeholder='Choose Passport' required
                                accept="image/png, image/gif, image/jpeg"
                                onChange={(e) => handleFileInputChange(e)}
                            // value={passport} 
                            />
                        </div>
                        <button className='btn-submit-form' type='submit' >{`Edit Profile`}
                        </button>
                    </form>
                </>
            }            
            {option === 3 &&
                <>
                    <form className='account-form' onSubmit={(evt) => handleSubmit(evt)}>
                        <div className={'account-form-fields ' }>
                            <input id='oldPassword' name='oldPassword' type='password' placeholder='Old Password' required onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />
                            <input id='password' name='password' type='password' placeholder='New Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
                            <input id='password2' name='password2' type='password' placeholder='Repeat New password' required onChange={(e) => setPassword2(e.target.value)} value={password2} />
                        </div>
                        <button className='btn-submit-form' type='submit' >{`Change Password`}</button>
                    </form>
                </>
            }

			<footer>
				<a href='#' target='_blank'>CSC 506 Web Development Assignment</a>
			</footer>
            <NotificationContainer />
		</div>
        </LoadingOverlay>
	)
}
  

export default Profile