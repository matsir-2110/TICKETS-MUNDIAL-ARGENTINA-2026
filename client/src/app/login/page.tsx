'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type View = 'login' | 'register' | 'forgot';

export default function PaginaLogin() {
  const [view, setView] = useState<View>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setMensaje('');
    setError('');
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMensaje('');

    const res = await fetch('http://localhost:3001/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) { setError(data.message || 'Error al iniciar sesión.'); setLoading(false); return; }

    setLoading(false);
    router.push('/');
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMensaje('');

    const res = await fetch('http://localhost:3001/usuarios/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name: name }),
    });

    const data = await res.json();
    if (!res.ok) { setError(data.message || 'Error al registrarse.'); setLoading(false); return; }

    setMensaje('Cuenta creada. Revisá tu email para confirmarla.');
    setLoading(false);
  };

  const handleForgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMensaje('');

    const res = await fetch('http://localhost:3001/usuarios/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) { setError(data.message || 'Error al enviar email.'); setLoading(false); return; }

    setMensaje('Listo. Revisá tu email para restablecer la contraseña.');
    setLoading(false);
  };

  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    void handleLogin(e);
  };

  const onSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    void handleRegister(e);
  };

  const onSubmitForgot = (e: React.FormEvent<HTMLFormElement>) => {
    void handleForgot(e);
  };

  const goTo = (nextView: View) => {
    resetForm();
    setView(nextView);
  };

  return (
    <main className="login-main">
      <div className="login-card">
        <div className="login-image-container">
          <Image
            src="/logo-login-verde.png"
            alt="Mundial 2026 Verde"
            className="login-image"
            width={420}
            height={420}
            priority
          />
        </div>

        <div className="login-box">
          <h2 className="login-titulo">FIFA WORLD CUP 2026</h2>

          {mensaje ? (
            <p className="login-msg login-msg--ok" role="status">
              {mensaje}
            </p>
          ) : null}

          {error ? (
            <p className="login-msg login-msg--error" role="alert">
              {error}
            </p>
          ) : null}

          {view === 'login' && (
            <form onSubmit={onSubmitLogin} className="form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input"
                required
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input"
                required
                autoComplete="current-password"
              />
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'CARGANDO...' : 'INICIAR SESIÓN'}
              </button>

              <div className="form-links">
                <button
                  type="button"
                  onClick={() => {
                    goTo('register');
                  }}
                  className="btn-link"
                >
                  ¿No tenés cuenta? Registrate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    goTo('forgot');
                  }}
                  className="btn-link"
                >
                  Olvidé mi contraseña
                </button>
              </div>
            </form>
          )}

          {view === 'register' && (
            <form onSubmit={onSubmitRegister} className="form">
              <input
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="input"
                required
                autoComplete="name"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input"
                required
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input"
                required
                autoComplete="new-password"
              />
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'CARGANDO...' : 'REGISTRARSE'}
              </button>

              <div className="form-links">
                <button
                  type="button"
                  onClick={() => {
                    goTo('login');
                  }}
                  className="btn-link"
                >
                  Ya tengo cuenta. Iniciar sesión
                </button>
              </div>
            </form>
          )}

          {view === 'forgot' && (
            <form onSubmit={onSubmitForgot} className="form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input"
                required
                autoComplete="email"
              />
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'CARGANDO...' : 'ENVIAR EMAIL'}
              </button>

              <div className="form-links">
                <button
                  type="button"
                  onClick={() => {
                    goTo('login');
                  }}
                  className="btn-link"
                >
                  Volver al login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}