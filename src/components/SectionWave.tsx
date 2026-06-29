/**
 * Costura orgánica entre dos secciones: el color superior continúa la sección
 * de arriba y la curva trae el color de la sección de abajo, evitando los
 * cortes rectos "de cajas apiladas".
 */
export function SectionWave({
  topColor,
  bottomColor,
  className = "",
}: {
  topColor: string;
  bottomColor: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative -my-px w-full leading-[0] ${className}`}
      style={{ background: topColor }}
    >
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="block h-12 w-full md:h-[5.5rem]"
      >
        <path
          d="M0,44 C220,96 430,6 700,42 C940,74 1180,16 1440,52 L1440,110 L0,110 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
