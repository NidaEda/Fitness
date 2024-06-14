import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost/my-app/register.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
      alert('signup successful')
      navigate('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (



    <div className='flex justify-center p-14 bg-slate-200'>
      <form className='flex flex-col items-center justify-center border p-6 bg-white'>
        <h2 className='font-bold text-3xl my-3'>Register</h2>
        <input type="text" placeholder='Your Email' className='w-[300px] p-2 outline-none border bg-transparent text-gray-600 my-1' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Password' className='w-[300px] p-2 outline-none border bg-transparent text-gray-600 my-1' onChange={(e) => setPassword(e.target.value)} />
        <button className='w-[300px] p-2 outline-none border bg-red-600 text-white font-bold mt-4 hover:bg-red-800' onClick={handleRegister}>Continue</button>
        <div className='text-xs my-2'>Already  have an Account ? <Link to='/login' className='cursor-pointer text-blue-600'>Login</Link></div>
      </form>
    </div>
  );
}

export default Register;
