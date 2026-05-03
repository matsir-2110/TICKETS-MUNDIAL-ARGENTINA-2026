

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
        {}
        <img className="logo-mundial" src="/Logo-Copa-Mundial.png" alt="Logo" />
        <h1>FIFA WORLD CUP 2026</h1>
      </header>

      <main className="login-main">
        {/* LA TARJETA UNIFICADA */}
        <div className="login-card">
          
          {/* MITAD IZQUIERDA: La imagen */}
          <div className="login-image-container">
            <img 
              src="/logo-login-verde.png" 
              alt="Mundial 2026 Verde" 
              className="login-image" 
            />
          </div>

          {/* MITAD DERECHA: El Formulario */}
          <div className="login-box">
            <h2 className="login-titulo">FIFA WORLD CUP 2026</h2>
            
            {mensaje && <p style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>{mensaje}</p>}
            {error && <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}

            {view === 'login' && (
              <form onSubmit={handleLogin} className="form">
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'CARGANDO...' : 'INICIAR SESIÓN'}</button>
                
                {/* Botones extra para navegar (ajustalos según tu lógica) */}
                <div className="form-links">
                  <button type="button" onClick={() => setView('register')} className="btn-link">¿No tenés cuenta? Registrate</button>
                  <button type="button" className="btn-link">Olvidé mi contraseña</button>
                </div>
              </form>
            )}

            {view === 'register' && (
              <form onSubmit={handleRegister} className="form">
                <input type="text" placeholder="Nombre completo" value={name} onChange={(e) => setName(e.target.value)} className="input" required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
                <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'CARGANDO...' : 'REGISTRARSE'}</button>
                
                <div className="form-links">
                  <button type="button" onClick={() => setView('login')} className="btn-link">Ya tengo cuenta. Iniciar sesión</button>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>
    </>
  );
}
