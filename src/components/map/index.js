import React, { useRef, useEffect, useState } from "react";
import * as mapTilerSdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

import { ContainerMap, DivMap } from "./styles";
// medellin Latitud: 6.245012750350089, -75.56117464704829
// casa 6.289702, -75.545242
export default function Map({ longitude, latitude }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const medellin = { lng: -75.56117464704829, lat: 6.245012750350089 };
  const [zoom] = useState(11);
  mapTilerSdk.config.apiKey = "3vq7056gEeuw68hgizOp";

  useEffect(() => {
    if (map.current) return;

    map.current = new mapTilerSdk.Map({
      container: mapContainer.current,
      style: mapTilerSdk.MapStyle.STREETS,
      center: [medellin.lng, medellin.lat],
      zoom: zoom,
    });

    new mapTilerSdk.Marker({ color: "#FF0000" })
      .setLngLat([longitude, latitude])
      .addTo(map.current);
  }, [medellin.lng, medellin.lat, zoom]);

  return (
    <ContainerMap>
      <DivMap ref={mapContainer} />
    </ContainerMap>
  );
}
