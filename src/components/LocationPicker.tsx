import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useTranslation } from 'react-i18next'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

// Vite rewrites these to asset URLs, but Leaflet's default icon logic looks
// for them relative to the page instead — without this they render as broken
// image icons.
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const RIYADH: [number, number] = [24.7136, 46.6753]

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => onPick(e.latlng.lat, e.latlng.lng),
  })
  return null
}

/**
 * Click (or drag the marker) to set a venue/place's coordinates, instead of
 * typing raw lat/lng numbers. Still hands back plain strings so it drops
 * into existing form state and validation unchanged.
 */
export default function LocationPicker({
  latitude,
  longitude,
  onChange,
}: {
  latitude: string
  longitude: string
  onChange: (latitude: string, longitude: string) => void
}) {
  const { t } = useTranslation()
  const lat = Number(latitude)
  const lng = Number(longitude)
  const hasPosition = latitude !== '' && longitude !== '' && !Number.isNaN(lat) && !Number.isNaN(lng)
  const center: [number, number] = hasPosition ? [lat, lng] : RIYADH

  const handlePick = (pickedLat: number, pickedLng: number) => {
    onChange(pickedLat.toFixed(6), pickedLng.toFixed(6))
  }

  return (
    <div className="overflow-hidden rounded-md border border-slate-300">
      <MapContainer
        center={center}
        zoom={hasPosition ? 14 : 6}
        style={{ height: 260, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onPick={handlePick} />
        {hasPosition && (
          <Marker
            position={center}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target as L.Marker
                const pos = marker.getLatLng()
                handlePick(pos.lat, pos.lng)
              },
            }}
          />
        )}
      </MapContainer>
      <p className="border-t border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500">
        {hasPosition
          ? `${lat.toFixed(6)}, ${lng.toFixed(6)}`
          : t('locationPicker.hint')}
      </p>
    </div>
  )
}
