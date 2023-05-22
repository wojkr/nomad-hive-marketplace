"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
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

interface MapPropertiesTypes {
  center: L.LatLngExpression;
  bounds: L.LatLngBoundsExpression;
}

const Map: React.FC<MapProps> = ({ center = [51.505, -0.09] }) => {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState<L.LatLngExpression>(
    L.latLng(center[0], center[1])
  );
  const [isMarkerInViewport, setIsMarkerInViewport] = useState(true);
  const [message, setMessage] = useState("Move marker to add your address");

  const markerRef = useRef(null);
  const mapRef = useRef(null);

  //DRAGGING THE MARKER:
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // @ts-ignore{
          const markerCoords: L.LatLng = marker.getLatLng();
          checkIsMarkerInViewport(markerCoords);
          setPosition(markerCoords);
        }
      },
    }),
    []
  );

  //MOVING THE MAP:
  function MapEventHandlers() {
    const map = useMapEvents({
      moveend() {
        checkIsMarkerInViewport(position, false);
      },
    });
    return null;
  }

  const checkIsMarkerInViewport = useCallback(
    (markerCoords: L.LatLngExpression, updateInfo = true) => {
      const checkIsMarkerInViewport = mapRef.current
        // @ts-ignore{
        ?.getBounds()
        .contains(markerCoords);
      setIsMarkerInViewport(checkIsMarkerInViewport);

      const messageNewLocation = `Your location: ${markerCoords}`;
      const messageMarkerNotInTheViewport =
        "Marker not in the viewport, please center it and place it over the correct address.";
      setMessage(
        checkIsMarkerInViewport
          ? messageNewLocation
          : messageMarkerNotInTheViewport
      );
    },
    [position]
  );

  const toggleDraggable = useCallback(() => {
    if (!isMarkerInViewport) {
      //@ts-ignore
      const map = mapRef?.current.setView(position);
      setMessage("centering the view on marker");
    } else {
      setDraggable((d) => !d);
    }
  }, [draggable, isMarkerInViewport]);

  const DraggableMarker = (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
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
      const mapProperties: MapPropertiesTypes = {
        //@ts-ignore
        center: map.getCenter(),
        //@ts-ignore
        bounds: map.getBounds(),
      };
      if (isMarkerInViewport) {
        //ADD COORD
      } else {
        //SHOW AND CENTER THE MARKER
        centerMarker(mapProperties);
      }
    }
  }
  function centerMarker(map: MapPropertiesTypes) {
    //@ts-ignore
    const marker = markerRef.current;
    //@ts-ignore
    const markerCoords: L.LatLngExpression = marker.getLatLng();

    //@ts-ignore
    marker.setLatLng(map.center);
    checkIsMarkerInViewport(map.center);
    setPosition(map.center);
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
        <MapEventHandlers />
      </MapContainer>
      {message}

      <div
        className="
                flex
                flex-row
                items-center
                p-6
                gap-4
                w-full
                "
      >
        {/* when !isMarkerInViewport and marker draggable => button "lock/move marker" center on marker */}
        <Button
          // disabled={!isMarkerInViewport}
          label={
            !isMarkerInViewport
              ? "Center On Marker"
              : !draggable
              ? "Move Marker"
              : "Lock Marker"
          }
          onClick={toggleDraggable}
          outline
        />
        <Button
          label={!isMarkerInViewport ? "Center Marker" : "Add Coords"}
          onClick={handleMap}
          outline
        />
      </div>
    </>
  );
};

export default Map;
