'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '../../utils/supabase/client';

type Sector = 'vip' | 'platea-baja' | 'platea-alta' | 'popular';

type TicketRow = {
  partido_id: number;
  usuario_id: string;
  sector: Sector;
  estado: 'reservado';
};

export default function PaginaCompra() {
  const [sector, setSector] = useState<Sector>('platea-baja');
  const [cantidad, setCantidad] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>('');
  const [error, setError] = useState<string>('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const partidoIdStr = searchParams.get('partido_id');

  const supabase = createClient();

  const precios = useMemo<Record<Sector, number>>(
    () => ({
      vip: 300,
      'platea-baja': 150,
      'platea-alta': 120,
      popular: 50,
    }),
    [],
  );

  const handleComprar = async (): Promise<void> => {
    setLoading(true);
    setError('');
    setMensaje('');

    const { data, error: userError } = await supabase.auth.getUser();
    if (userError) {
      setError(`Error de autenticación: ${userError.message}`);
      setLoading(false);
      return;
    }

    const user = data.user;
    if (!user) {
      setLoading(false);
      router.push('/login');
      return;
    }

    const partidoId = partidoIdStr ? Number(partidoIdStr) : NaN;
    if (!Number.isFinite(partidoId)) {
      setError('No se seleccionó ningún partido. Volvé a la página principal.');
      setLoading(false);
      return;
    }

    const tickets: TicketRow[] = Array.from({ length: cantidad }, () => ({
      partido_id: partidoId,
      usuario_id: user.id,
      sector,
      estado: 'reservado',
    }));

    const { error: insertError } = await supabase.from('Tickets').insert(tickets);

    if (insertError) {
      setError(`Error al comprar: ${insertError.message}`);
      setLoading(false);
      return;
    }

    const total = precios[sector] * cantidad;
    const sectorPretty = sector.replace(/-/g, ' ');

    setMensaje(`Compraste ${cantidad} entrada(s) en ${sectorPretty} por USD ${total}. ¡Nos vemos en el Mundial!`);
    setLoading(false);
  };

  const onClickComprar = () => {
    void handleComprar();
  };

  return (
    <main className="main-compra">
      <h2 className="titulo">SELECCIONÁ TUS ENTRADAS</h2>

      <div className="compra-container">
        {mensaje ? (
          <p className="compra-msg compra-msg--ok" role="status">
            {mensaje}
          </p>
        ) : null}

        {error ? (
          <p className="compra-msg compra-msg--error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="sector">
          <label className="label-sector" htmlFor="sector">
            Sector
          </label>
          <select
            id="sector"
            className="selector-sector"
            value={sector}
            onChange={(e) => {
              setSector(e.target.value as Sector);
            }}
          >
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
            <button
              type="button"
              className="btn-cantidad"
              onClick={() => {
                setCantidad(Math.max(1, cantidad - 1));
              }}
            >
              −
            </button>
            <span className="cantidad-numero">{cantidad}</span>
            <button
              type="button"
              className="btn-cantidad"
              onClick={() => {
                setCantidad(Math.min(6, cantidad + 1));
              }}
            >
              +
            </button>
          </div>
        </div>

        <div className="referencias">
          <div className="referencia-box">
            <span className="color-ref vip-color"></span>
            <p>VIP</p>
          </div>
          <div className="referencia-box">
            <span className="color-ref platea-color"></span>
            <p>Platea</p>
          </div>
          <div className="referencia-box">
            <span className="color-ref popular-color"></span>
            <p>Popular</p>
          </div>
          <div className="referencia-box">
            <span className="color-ref nodisponible-color"></span>
            <p>No disponible</p>
          </div>
        </div>

        <Image
          className="img-estadio"
          src="/estadio.png"
          alt="Estadio"
          width={900}
          height={450}
          priority
        />

        <button type="button" className="btn-continuar" onClick={onClickComprar} disabled={loading}>
          {loading ? 'PROCESANDO...' : 'CONTINUAR →'}
        </button>
      </div>
    </main>
  );
}