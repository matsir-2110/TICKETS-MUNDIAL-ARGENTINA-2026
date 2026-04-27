/*

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

export default function PaginaCompra() {
  const [sector, setSector] = useState('platea-baja');
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const partidoId = searchParams.get('partido_id');

  const supabase = createClient();

  const precios: { [key: string]: number } = {
    'vip': 300,
    'platea-baja': 150,
    'platea-alta': 120,
    'popular': 50,
  };

  const handleComprar = async () => {
    setLoading(true);
    setError('');

    // Verificar que el usuario esté logueado
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    if (!partidoId) {
      setError('No se seleccionó ningún partido. Volvé a la página principal.');
      setLoading(false);
      return;
    }

    // Insertar los tickets (uno por cada entrada)
    const tickets = Array.from({ length: cantidad }, () => ({
      partido_id: parseInt(partidoId),
      usuario_id: user.id,
      sector: sector,
      estado: 'reservado',
    }));

    const { error: insertError } = await supabase.from('Tickets').insert(tickets);

    if (insertError) {
      setError('Error al comprar: ' + insertError.message);
    } else {
      setMensaje(`Compraste ${cantidad} entrada(s) en ${sector.replace('-', ' ')} por USD ${precios[sector] * cantidad}. ¡Nos vemos en el Mundial!`);
    }

    setLoading(false);
  };

  return (
    <>
      <header className="header">
        <img className="logo-mundial" src="/Logo-Copa-Mundial.png" alt="Logo" />
        <h1>FIFA WORLD CUP</h1>
      </header>

      <main className="main-compra">
        <h2 className="titulo">SELECCIONÁ TUS ENTRADAS</h2>

        <div className="compra-container">
          {mensaje && (
            <p style={{ color: 'green', textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold' }}>
              {mensaje}
            </p>
          )}
          {error && (
            <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>
              {error}
            </p>
          )}

          <div className="sector">
            <label className="label-sector">Sector</label>
            <select className="selector-sector" value={sector} onChange={(e) => setSector(e.target.value)}>
              <option value="vip">VIP</option>
              <option value="platea-baja">Platea Baja</option>
              <option value="platea-alta">Platea Alta</option>
              <option value="popular">Popular</option>
            </select>
          </div>

          <div className="box-precio">
            <p className="label-precio">Precio por entrada</p>
            <p className="precio">USD {precios[sector]}</p>
          </div>

          <div className="box-cantidad">
            <p className="label-cantidad">Cantidad de entradas</p>
            <div className="cantidad-container">
              <button className="btn-cantidad" onClick={() => setCantidad(Math.max(1, cantidad - 1))}>−</button>
              <span className="cantidad-numero">{cantidad}</span>
              <button className="btn-cantidad" onClick={() => setCantidad(Math.min(6, cantidad + 1))}>+</button>
            </div>
          </div>

          <div className="referencias">
            <div className="referencia-box"><span className="color-ref vip-color"></span><p>VIP</p></div>
            <div className="referencia-box"><span className="color-ref platea-color"></span><p>Platea</p></div>
            <div className="referencia-box"><span className="color-ref popular-color"></span><p>Popular</p></div>
            <div className="referencia-box"><span className="color-ref nodisponible-color"></span><p>No disponible</p></div>
          </div>

          <img className="img-estadio" src="/estadio.png" alt="Estadio" />

          <button className="btn-continuar" onClick={handleComprar} disabled={loading}>
            {loading ? 'PROCESANDO...' : 'CONTINUAR →'}
          </button>
        </div>
      </main>
    </>
  );
}
*/