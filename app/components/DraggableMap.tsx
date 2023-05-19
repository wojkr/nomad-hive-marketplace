"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import Button from "./Button";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

const Map: React.FC<MapProps> = ({ center }) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center || [51.505, -0.09]);
  const markerRef = useRef(null);
  const mapRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // @ts-ignore{
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const DraggableMarker = (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      // @ts-ignore
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );

  function handleMap() {
    const map = mapRef.current;
    if (map != null) {
      //@ts-ignore
      const mapCenter = map.getCenter();
      if (draggable) {
        //SHOW AND CENTER THE MARKER
        centerMarker(mapCenter);
      } else {
        //ADD COORD
      }
    }
  }
  function centerMarker(mapCenter: L.LatLngExpression) {
    const marker = markerRef.current;
    //@ts-ignore
    marker.setLatLng(mapCenter);
  }
  return (
    <>
      <MapContainer
        center={(center as L.LatLngExpression) || [51.505, -0.09]}
        zoom={4}
        scrollWheelZoom={false}
        className="h-[35vh] rounded-lg"
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {DraggableMarker}
      </MapContainer>
      <Button
        //   disabled={disabled}
        label={draggable ? "Turn Off Drag" : "Drag Marker"}
        onClick={toggleDraggable}
        outline
      />
      <Button
        label={draggable ? "Center Marker" : "Add Coords"}
        onClick={handleMap}
        outline
      />
    </>
  );
};

export default Map;
