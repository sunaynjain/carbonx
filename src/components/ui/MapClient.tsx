'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Fix Leaflet icon issue
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/marker-icon-2x.png',
    iconUrl: '/marker-icon.png',
    shadowUrl: '/marker-shadow.png',
  });
}

export interface MapClientProps {
  center?: [number, number];
  zoom?: number;
  farms?: unknown[];
  drawingEnabled?: boolean;
  onPolygonDrawn?: (geoJSON: unknown, areaSqm: number) => void;
  satelliteMode?: boolean;
  selectedFarmId?: string;
}

export default function MapClient({
  center = [20.5937, 78.9629],
  zoom = 5,
  farms = [],
  drawingEnabled = false,
  onPolygonDrawn,
  satelliteMode = false,
  selectedFarmId
}: MapClientProps) {
  const [map, setMap] = useState<L.Map | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCreated = (e: any) => {
    const layer = e.layer;
    const geoJSON = layer.toGeoJSON();
    const areaSqm = turf.area(geoJSON);
    if (onPolygonDrawn) {
      onPolygonDrawn(geoJSON, areaSqm);
    }
  };

  const tileUrl = satelliteMode
    ? 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const tileAttr = satelliteMode
    ? 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      className="h-full w-full z-0 rounded-lg"
      ref={setMap as React.Ref<L.Map>}
    >
      <TileLayer attribution={tileAttr} url={tileUrl} />
      
      {drawingEnabled && (
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={onCreated}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false,
              polygon: {
                allowIntersection: false,
                drawError: {
                  color: '#e1e100',
                  message: 'Polygons cannot intersect!',
                },
                shapeOptions: {
                  color: '#D6A85C',
                  fillColor: '#153D2E',
                  fillOpacity: 0.5
                }
              }
            }}
          />
        </FeatureGroup>
      )}

      {farms.map((farm) => {
        if (!farm) return null;
        const isSelected = farm.id === selectedFarmId;
        const lat = farm.location?.lat || 20.5937;
        const lng = farm.location?.lng || 78.9629;
        
        let polygonPositions = null;
        if (farm.geometry && farm.geometry.geometry && farm.geometry.geometry.coordinates) {
          // GeoJSON coordinates are [lng, lat], Leaflet wants [lat, lng]
          const coords = farm.geometry.geometry.coordinates[0];
          polygonPositions = coords.map((c: number[]) => [c[1], c[0]]);
        }

        return (
          <React.Fragment key={farm.id}>
            {polygonPositions ? (
              <Polygon 
                positions={polygonPositions} 
                pathOptions={{ 
                  color: isSelected ? '#D6A85C' : '#153D2E', 
                  fillColor: isSelected ? '#D6A85C' : '#A8B99A',
                  fillOpacity: 0.6
                }} 
              >
                <Popup>
                  <strong>{farm.name}</strong><br/>
                  Owner: {farm.ownerName}<br/>
                  Crop: {farm.cropType}
                </Popup>
              </Polygon>
            ) : (
              <Marker position={[lat, lng]}>
                <Popup>
                  <strong>{farm.name}</strong><br/>
                  Owner: {farm.ownerName}<br/>
                  Crop: {farm.cropType}
                </Popup>
              </Marker>
            )}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}
