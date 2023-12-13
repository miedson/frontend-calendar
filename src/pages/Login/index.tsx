import "./login.css";
import { EnvelopeSimple, Lock } from '@phosphor-icons/react'
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="login">
        <h1>Faça seu login</h1>
        <form>
            <div className="email-wrapper">
                <EnvelopeSimple></EnvelopeSimple>
                <input type="email" name="email" id="email" onChange={(event) => setEmail(event.target.value)} placeholder="E-mail"/>
            </div>
            <div className="password-wrapper">
                <Lock></Lock>
                <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} placeholder="Senha"/>
            </div>
            <a href="#">Esqueci minha senha</a>
            <button>Entrar</button>
        </form>
    </div>
  );
}

export default Login;
