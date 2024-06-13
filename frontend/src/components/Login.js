import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost/my-app/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
      navigate('/home');
    } else {
      alert('Login iled');
    }
  };

  return (


    <div className='flex justify-center p-14 bg-slate-200'>
      <form className='flex flex-col items-center justify-center border p-6 bg-white'>
        <h2 className='font-bold text-3xl my-3'>Sign in</h2>
        <input type="text" placeholder='Your Email' className='w-[300px] p-2 outline-none border bg-transparent text-gray-600 my-1' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' className='w-[300px] p-2 outline-none border bg-transparent text-gray-600 my-1' onChange={(e) => setPassword(e.target.value)} />
        <button className='w-[300px] p-2 outline-none border bg-red-600 text-white font-bold mt-4 hover:bg-red-800' onClick={handleLogin}>Continue</button>
        <div className='text-xs my-2'>Don't have an Account ? <Link to='/register' className='cursor-pointer text-blue-600'>Sign up here.</Link></div>
      </form>
    </div>
  );
}

export default Login;
