import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Batoifolio - Inicio';
  }, []);

  return (
    <section className="text-center space-y-6">
      <h2 className="text-[32px] font-bold text-corporate">Bienvenido a Batoifolio</h2>

      <p className="text-lg max-w-2xl mx-auto">
        Una plataforma para <strong className="font-semibold">destacar los talentos</strong> de los alumnos del <strong>IES Batoi</strong>.
        Explora perfiles, proyectos y encuentra oportunidades de <span className="text-corporate font-bold">FCT o DUAL</span>.
      </p>
    </section>
  );
}
