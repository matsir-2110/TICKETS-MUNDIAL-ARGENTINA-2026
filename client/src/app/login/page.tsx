/*

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

export default function PaginaLogin() {
  const [view, setView] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const supabase = createClient();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setMensaje('');
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Email o contraseña incorrectos.');
    } else {
      router.push('/');
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) {
      setError('No se pudo crear la cuenta: ' + error.message);
    } else {
      setMensaje('Cuenta creada. Revisa tu email para confirmarla.');
    }
    setLoading(false);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setError('No se pudo enviar el email: ' + error.message);
    } else {
      setMensaje('Listo. Revisa tu email para restablecer la contraseña.');
    }
    setLoading(false);
  };

  return (
    <>
      <header className="header">
        <img className="logo-mundial" src="/Logo-Copa-Mundial.png" alt="Logo" />
        <h1>FIFA WORLD CUP</h1>
      </header>

      <main className="login-main">
        <div className="login-box">
          <h2 className="login-titulo">FIFA WORLD CUP</h2>

          {mensaje && <p style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>{mensaje}</p>}
          {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

          {view === 'login' && (
            <form onSubmit={handleLogin} className="form">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
              <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
              <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'CARGANDO...' : 'INICIAR SESIÓN'}</button>
            </form>
          )}

          {view === 'register' && (
            <form onSubmit={handleRegister} className="form">
              <input type="text" placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} className="input" required />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
              <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
              <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'CARGANDO...' : 'REGISTRARSE'}</button>
            </form>
          )}

          {view === 'forgot' && (
            <form onSubmit={handleForgot} className="form">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
              <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'ENVIANDO...' : 'ENVIAR ENLACE'}</button>
            </form>
          )}

          <div className="login-links">
            <button type="button" className="link-btn" onClick={() => { setView('login'); resetForm(); }}>Iniciar sesión</button>
            <button type="button" className="link-btn" onClick={() => { setView('register'); resetForm(); }}>Registrarse</button>
            <button type="button" className="link-btn" onClick={() => { setView('forgot'); resetForm(); }}>Olvidaste la contraseña</button>
          </div>
        </div>
      </main>
    </>
  );
}
*/