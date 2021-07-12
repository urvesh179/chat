import logo from './logo.svg';
import React,{useState} from 'react'
import {Input,Button,Card,Form} from 'antd'
import './App.css';
import { ChatEngine,getOrCreateChat } from 'react-chat-engine'
// import axios from 'axios';
var axios = require('axios');

function App() {
	const [username, setUsername] = useState('')
	const [password,setpassword] = useState('')
	const [cpas,setcpass] = useState('')
	const [first,setfirst] = useState('')
	const [last,setlast] = useState('')
	const [email,setemail] = useState('')
	const [islogin,setislogin]=useState(true)
	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}
  function renderChatForm(creds) {
		return (
			<div style={{margin:'8px'}} >
				<Input style={{width:'60%'}}
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<Button onClick={() => createDirectChat(creds)} type='primary' style={{marginLeft:'10px'}}>
					Search
				</Button>
			</div>
		)
	}
  const signup= ()=>{
var data = {
	"username": "bob",
	"secret": "Zala@2000",
	"email": "aker@mail.com",
	"first_name": "Bob",
	"last_name": "Baker",
	"custom_json": {"fav_game": "Candy Crush", "high_score": 2002}
};

var config = {
	method: 'post',
	url: 'https://api.chatengine.io/users/',
	headers: {
		'PRIVATE-KEY': '253f3f0b-4184-4ed1-ae4f-ffc1903c3b26'
	},
	data : data
};

axios(config)
.then(function (response) {
	console.log(JSON.stringify(response.data));
})
.catch(function (error) {
	console.log(error);
});
const onFinish = () => {
	var data = {
		"username": username,
		"secret": password,
		"email": email,
		"first_name": first,
		"last_name": last,
		"custom_json": {"fav_game": "Candy Crush", "high_score": 2002}
	};
	
	var config = {
		method: 'post',
		url: 'https://api.chatengine.io/users/',
		headers: {
			'PRIVATE-KEY': '253f3f0b-4184-4ed1-ae4f-ffc1903c3b26'
		},
		data : data
	};
	
	axios(config)
	.then(function (response) {
		var data = `{\n    "username": ${username}\n}`;

var config = {
  method: 'post',
  url: 'https://api.chatengine.io/chats/{{40525}}/people/',
  headers: { 
    'Project-ID': '{{8d90a3b2-60a1-497b-91ac-9b381f317df8}}', 
    'User-Name': `{${username}}`, 
    'User-Secret': `{${password}}`
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
	localStorage.setItem('username', username);
	localStorage.setItem('password', password);

	window.location.reload();
});
		
	})
	.catch(function (error) {
		console.log(error);
	});
  };
  return(
	<div className='log-wrap'>
	   <Form
name="basic"
labelCol={{ span: 8 }}
wrapperCol={{ span: 16 }}
initialValues={{ remember: true }}
onFinish={onFinish}
//   onFinishFailed={onFinishFailed}
>
<Form.Item
  label="Username"
  name="username"
  rules={[{ required: true, message: 'Please input your username!' }]}
>
  <Input onChange={(e)=>setUsername(e.target.value)} />
</Form.Item>

<Form.Item
  label="Password"
  name="password"
  rules={[{ required: true, message: 'Please input your password!' }]}
>
  <Input.Password onChange={(e)=>{
	  console.log(typeof e.target.value)
	  setpassword(e.target.value)}} />
</Form.Item>
<Form.Item
  label="Email"
  name="Email"
>
  <Input onChange={(e)=>{
	  setemail(e.target.value)}} />
</Form.Item>
<Form.Item
  label="First Name"
  name="First Name"
>
  <Input onChange={(e)=>{
	  setfirst(e.target.value)}} />
</Form.Item>
<Form.Item
  label="Last Name"
  name="Last Name"
>
  <Input onChange={(e)=>{
	  setlast(e.target.value)}} />
</Form.Item>
<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
  <Button type="primary" htmlType="submit">
	Submit
  </Button>
</Form.Item>
</Form> 

	</div>
)
  }
  const login=()=>{
	const projectID = '8d90a3b2-60a1-497b-91ac-9b381f317df8';
	const onFinish = async () => {
		const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };
		try {
			await axios.get('https://api.chatengine.io/chats', { headers: authObject });
	  
			localStorage.setItem('username', username);
			localStorage.setItem('password', password);
	  
			window.location.reload();
		  } catch (err) {
			console.log(err)
		  }
	  };
	  return(
		  <div className='log-wrap'>
			 <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input onChange={(e)=>setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password onChange={(e)=>{
			console.log(typeof e.target.value)
			setpassword(e.target.value)}} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
	  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="link" htmlType="submit" onClick={()=>setislogin(false)}>
		Sign-Up
        </Button>
      </Form.Item>
    </Form> 
	
		  </div>
	  )
  }
  const renderform=()=>{
	return(
		<div className='form-wrap'>
				<div className='card' >
					<h2>{islogin?'Login':'Sign-up'}</h2>
					{islogin?login():signup()}
				</div>
		
		</div>
	)
  }
  return (
    <div >
      {/* <button onClick={signup}>click</button> */}
	  {!localStorage.getItem('username')?renderform():(
		 <ChatEngine
		 height='100vh'
		 userName={localStorage.getItem('username')}
		 userSecret={localStorage.getItem('password')}
		 projectID='8d90a3b2-60a1-497b-91ac-9b381f317df8'
   renderNewChatForm={(creds) => renderChatForm(creds)}
	 /> 
	  )}

    </div>
  );
}

export default App;
