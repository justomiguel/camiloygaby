"use client";

import dynamic from "next/dynamic";
import type { ISOCode } from "react-svg-worldmap";
import type { CountryStat } from "@/lib/analytics/types";

const WorldMapLib = dynamic(() => import("react-svg-worldmap"), { ssr: false });

type Props = {
  countries: CountryStat[];
};

export function WorldMapChart({ countries }: Props) {
  const data = countries
    .filter((c) => c.code !== "??")
    .map((c) => ({
      country: c.code.toLowerCase() as ISOCode,
      value: c.visits,
    }));

  const maxValue = data.reduce((max, item) => Math.max(max, item.value), 0);

  return (
    <div className="overflow-hidden rounded-xl border border-sage/12 bg-cream/50 p-3">
      <WorldMapLib
        color="#5b6f5a"
        valueSuffix=" visitas"
        size="responsive"
        data={data}
        strokeOpacity={0.35}
        backgroundColor="#faf7f2"
        tooltipBgColor="#3f5040"
        tooltipTextColor="#faf7f2"
        borderColor="#d8e0d2"
        containerClassName="w-full"
        richInteraction
        // Configuraciones para mostrar todos los países
        frame={false}
        frameColor="#d8e0d2"
        // Color por defecto para países sin datos
        defaultCountryColor="#e6ebe1"
        // Mostrar tooltip incluso para países sin datos
        showTooltip={true}
        // Opacidad del borde de países
        borderOpacity={0.2}
      />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 pb-2 text-xs text-charcoal/60">
        <span>Intensidad según cantidad de visitas</span>
        <div className="flex items-center gap-2">
          <span>0</span>
          <div
            className="h-2 w-24 rounded-full"
            style={{
              background: `linear-gradient(to right, #e6ebe1, #5b6f5a)`,
            }}
          />
          <span>{maxValue > 0 ? maxValue : "Sin datos"}</span>
        </div>
      </div>
      {data.length === 0 && (
        <div className="mt-3 text-center text-xs text-charcoal/50">
          Los países se irán coloreando conforme ingresen visitantes
        </div>
      )}
    </div>
  );
}
