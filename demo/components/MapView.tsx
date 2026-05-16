"use client";

import { useEffect, useRef } from "react";
import type { Narrative } from "@/data/mockNarratives";

interface Props {
  narratives: Narrative[];
  onSelectNarrative: (id: string) => void;
}

export default function MapView({ narratives, onSelectNarrative }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let map: ReturnType<typeof import("leaflet").map>;

    import("leaflet").then((leaflet) => {
      const L = leaflet.default ?? (leaflet as unknown as typeof import("leaflet"));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      if (!mapRef.current) return;

      map = L.map(mapRef.current, {
        center: [37.2, -119.5],
        zoom: 6,
        zoomControl: false,
        minZoom: 5,
        maxZoom: 13,
      });

      mapInstanceRef.current = map;

      // Dark basemap — matches the app theme
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }
      ).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      narratives.forEach((n) => {
        const isPressing = n.velocityPct >= 40 && n.velocityDir === "up";
        const radius = Math.max(16, Math.min(40, n.volume / 100));
        const pinColor = isPressing ? "#F5A86C" : "#6B9FFF";
        const pinBg = isPressing ? "rgba(245,168,108,0.15)" : "rgba(107,159,255,0.15)";
        const pinBorder = isPressing ? "rgba(245,168,108,0.50)" : "rgba(107,159,255,0.40)";

        const icon = L.divIcon({
          html: `
            <div style="
              width:${radius * 2}px;height:${radius * 2}px;
              border-radius:50%;
              background:${pinBg};
              border:1.5px solid ${pinBorder};
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 2px 12px rgba(0,0,0,0.40);
              cursor:pointer;
            ">
              <span style="
                font-size:10px;font-weight:700;color:${pinColor};
                font-family:monospace;line-height:1;
              ">${n.velocityDir === "up" ? "↑" : "↓"}${n.velocityPct}%</span>
            </div>`,
          className: "",
          iconSize: [radius * 2, radius * 2],
          iconAnchor: [radius, radius],
          popupAnchor: [0, -(radius + 6)],
        });

        const marker = L.marker(n.coordinates, { icon });
        marker.addTo(map);

        const negPct = n.sentiment.negative;
        const posPct = n.sentiment.positive;
        const neuPct = n.sentiment.neutral;

        const popup = `
          <div style="min-width:220px;font-family:Inter,system-ui,sans-serif;background:#1F2A47;color:#F4F6FB;border-radius:10px;padding:14px;">
            <p style="font-size:10px;color:#7C8499;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.06em;">${n.category} · ${n.primaryRegion}</p>
            <p style="font-size:13px;font-weight:600;margin:0 0 6px;line-height:1.35;color:#F4F6FB;">${n.title}</p>
            <p style="font-size:11px;color:#7C8499;margin:0 0 10px;font-family:monospace;">${n.volume.toLocaleString()} posts · ${n.velocityDir === "up" ? "↑" : "↓"}${n.velocityPct}% this week</p>
            <div style="display:flex;height:4px;border-radius:2px;overflow:hidden;margin-bottom:10px;">
              <div style="flex:${posPct};background:#5FCF89;"></div>
              <div style="flex:${neuPct};background:#6B7388;"></div>
              <div style="flex:${negPct};background:#F26A6A;"></div>
            </div>
            <button
              onclick="window.__atlixSelect('${n.id}')"
              style="
                display:block;width:100%;text-align:center;
                background:rgba(107,159,255,0.15);color:#6B9FFF;
                border:1px solid rgba(107,159,255,0.30);
                border-radius:6px;padding:7px 12px;
                font-size:12px;font-weight:500;cursor:pointer;
                font-family:Inter,system-ui,sans-serif;
              "
            >View details →</button>
          </div>`;

        marker.bindPopup(popup, {
          closeButton: false,
          offset: [0, -4],
          className: "atlix-popup",
        });
        marker.on("click", () => marker.openPopup());
      });

      (window as unknown as Record<string, unknown>).__atlixSelect = (id: string) =>
        onSelectNarrative(id);
    });

    return () => {
      if (map) { map.remove(); mapInstanceRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (window as unknown as Record<string, unknown>).__atlixSelect = (id: string) =>
      onSelectNarrative(id);
  }, [onSelectNarrative]);

  return (
    <div className="relative w-full h-full min-h-[560px]">
      <style>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        .leaflet-container { background: #0F1729 !important; }
        .atlix-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          border-radius: 10px !important;
        }
        .atlix-popup .leaflet-popup-content { margin: 0 !important; }
        .atlix-popup .leaflet-popup-tip-container { display: none; }
        .leaflet-control-zoom a {
          background: #18213A !important;
          border-color: rgba(255,255,255,0.10) !important;
          color: #B8C0D4 !important;
        }
        .leaflet-control-zoom a:hover { background: #1F2A47 !important; color: #F4F6FB !important; }
        .leaflet-attribution-flag { display: none !important; }
        .leaflet-control-attribution { background: rgba(15,23,41,0.80) !important; color: #525B73 !important; }
        .leaflet-control-attribution a { color: #7C8499 !important; }
      `}</style>

      <div ref={mapRef} className="w-full h-full rounded-xl overflow-hidden" />

      {/* Legend */}
      <div
        className="absolute bottom-4 left-4 z-[1000] rounded-xl p-3 flex flex-col gap-2"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-subtle)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.40)",
        }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-quat)" }}>
          Legend
        </p>
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-tertiary)" }}>
          <div
            className="w-4 h-4 rounded-full shrink-0"
            style={{ background: "rgba(245,168,108,0.15)", border: "1.5px solid rgba(245,168,108,0.50)" }}
          />
          <span>Pressing (≥40% velocity)</span>
        </div>
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-tertiary)" }}>
          <div
            className="w-4 h-4 rounded-full shrink-0"
            style={{ background: "rgba(107,159,255,0.15)", border: "1.5px solid rgba(107,159,255,0.40)" }}
          />
          <span>Active narrative</span>
        </div>
        <p className="text-[10px]" style={{ color: "var(--text-quat)" }}>Pin size = post volume</p>
      </div>
    </div>
  );
}
