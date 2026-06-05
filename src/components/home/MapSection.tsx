'use client';

import { useEffect, useState } from 'react';
import { MapPinIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import FadeIn from '@/components/FadeIn';

const locations = [
  {
    title: 'Straitgate Nursery & Primary School',
    coords: [6.6235553, 3.3744507] as [number, number],
    address: '69 Alh. Bashiru Shittu, Magodo, Lagos',
  },
  {
    title: 'Straitgate Nursery & Primary School',
    coords: [6.7029369, 3.4039485] as [number, number],
    address: 'Road D, Forthright Gardens Estate, Magboro, Ogun State',
  },
  {
    title: 'Straitgate College',
    coords: [6.7029319, 3.4008986] as [number, number],
    address: 'Road D, Forthright Gardens Estate, Magboro, Ogun State',
  },
  {
    title: 'Straitgate High School',
    coords: [6.6169311, 3.3695676] as [number, number],
    address: '14 Robert Street, Magodo',
  },
];

export default function MapSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="bg-white py-20 px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: text + address cards */}
        <FadeIn direction="left">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-4">
              Visit Our <span className="text-primary">Campuses</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our schools are spread across Lagos and Ogun State, each offering a warm,
              welcoming environment for learning. Find the campus nearest you and come say hello.
            </p>

            <div className="space-y-4">
              {locations.map((loc, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-2xl border border-gray-100 bg-light p-5 shadow-sm"
                >
                  <span className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-primary" />
                  <div>
                    <h3 className="font-bold text-dark">{loc.title}</h3>
                    <p className="mt-1 flex items-start gap-2 text-gray-600">
                      <MapPinIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{loc.address}</span>
                    </p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${loc.coords[0]},${loc.coords[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:text-primary-dark"
                    >
                      Get Directions
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Right: existing Leaflet map (unchanged) */}
        <FadeIn direction="right">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            {mounted ? (
              <MapInner />
            ) : (
              <div className="flex h-[450px] items-center justify-center bg-gray-100">
                <p className="text-gray-400">Loading map...</p>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function MapInner() {
  const [leaflet, setLeaflet] = useState<{
    MapContainer: typeof import('react-leaflet').MapContainer;
    TileLayer: typeof import('react-leaflet').TileLayer;
    Marker: typeof import('react-leaflet').Marker;
    Popup: typeof import('react-leaflet').Popup;
  } | null>(null);

  useEffect(() => {
    import('react-leaflet').then((mod) => {
      setLeaflet({
        MapContainer: mod.MapContainer,
        TileLayer: mod.TileLayer,
        Marker: mod.Marker,
        Popup: mod.Popup,
      });
    });

    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    });
  }, []);

  if (!leaflet) return <div className="h-[450px] bg-gray-100" />;

  const { MapContainer, TileLayer, Marker, Popup } = leaflet;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <MapContainer
        center={[6.66, 3.39]}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: '450px', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, i) => (
          <Marker key={i} position={loc.coords}>
            <Popup>
              <strong>{loc.title}</strong>
              <br />
              {loc.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
