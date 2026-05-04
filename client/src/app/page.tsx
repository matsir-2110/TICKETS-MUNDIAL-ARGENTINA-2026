
'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

type Partido = {
  id: number;
  equipo_a: string;
  equipo_b: string;
  fecha: string;
  precio_base: number;
};

// Mapa de logos por país (los que tienen imagen en /public)
const logos: { [key: string]: string } = {
  'ARGENTINA': '/logo-argentina.png',
  'ARGELIA': '/logo-argelia.png',
  'AUSTRIA': '/logo-austria.png',
  'JORDANIA': '/logo-jordania.png',
  'BRASIL': '/logo-brasil.png',
};

const getLogo = (equipo: string) => logos[equipo.toUpperCase()] ?? '/Logo-Copa-Mundial.png';

export default function Page() {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchPartidos = async () => {
      const { data, error } = await supabase
        .from('Partidos')
        .select('*')
        .order('fecha', { ascending: true });

      if (!error && data) {
        setPartidos(data);
      }
      setLoading(false);
    };

    fetchPartidos();
  }, []);

  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr);
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return {
      dia: dias[fecha.getDay()],
      numero: fecha.getDate(),
      hora: fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  return (
    <>
      <header className="header">
        <Link href="/login" className="btn-header-login">
          Ingresar
        </Link>
      </header>

      <main>
        <h2 className="titulo">PARTIDOS DISPONIBLES</h2>

        {loading && <p style={{ textAlign: 'center', padding: '2rem' }}>Cargando partidos...</p>}

        {!loading && partidos.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem' }}>No hay partidos disponibles.</p>
        )}

        {partidos.map((partido) => {
          const { dia, numero, hora } = formatearFecha(partido.fecha);
          return (
            <div className="partidos" key={partido.id}>
              <div className="parte-arriba">
                <p className="dia-numero">{numero}</p>
                <div className="fecha">
                  <p className="dia">{dia}</p>
                  <p className="hora">{hora}</p>
                </div>
                <img className="img-logo-mundial" src="/Logo-Copa-Mundial.png" alt="logo" />
              </div>

              <div className="parte-abajo">
                <div className="escudos">
                  <img className="img-escudos-local" src={getLogo(partido.equipo_a)} alt={partido.equipo_a} />
                  <p className="vs">VS.</p>
                  <img className="img-escudos-visitante" src={getLogo(partido.equipo_b)} alt={partido.equipo_b} />
                </div>

                <h2 className="selecciones">{partido.equipo_a} - {partido.equipo_b}</h2>
                <p className="estadio">Desde USD {partido.precio_base}</p>
                <div className="linea-divisora"></div>

                <Link href={`/entradas?partido_id=${partido.id}`}>
                  <button className="comprar">Comprar</button>
                </Link>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}
