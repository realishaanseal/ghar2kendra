import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Create friendly colored emoji markers so no PNG icon asset paths break
const createEmojiIcon = (emoji) => {
  return L.divIcon({
    className: 'custom-leaflet-pin',
    html: `<div style="
      background: white;
      border: 2px solid #1565C0;
      border-radius: 50%;
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2);
    ">${emoji}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
};

const CATEGORY_ICONS = {
  roads: '🛣️',
  electricity: '⚡',
  water: '💧',
  waste: '🗑️',
  safety: '🚨',
};

export default function CityMap({ issues }) {
  // Center near New Delhi
  const center = [28.6250, 77.2100];

  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative z-0">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {issues.map((issue) => {
          const emoji = CATEGORY_ICONS[issue.category] || '📍';
          return (
            <Marker
              key={issue.id}
              position={[issue.lat, issue.lng]}
              icon={createEmojiIcon(emoji)}
            >
              <Popup>
                <div className="p-1 max-w-[200px]">
                  <img
                    src={issue.imageUrl}
                    alt={issue.title}
                    className="w-full h-24 object-cover rounded-md mb-2"
                  />
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                    {issue.id}
                  </span>
                  <h4 className="font-bold text-xs text-gray-900 mt-1 line-clamp-2">
                    {issue.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {issue.address}
                  </p>
                  <p className="text-[11px] font-semibold text-gray-700 mt-1">
                    👍 {issue.upvotes} upvotes
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
