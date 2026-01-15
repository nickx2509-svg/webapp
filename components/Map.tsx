'use client'

import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map({ position }: { position: [number, number] | null }) {
  if (!position) return null

  return (
   
  )
}
