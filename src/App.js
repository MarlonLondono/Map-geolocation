import { useEffect, useState } from "react";
import Header from "./components/header";
import Map from "./components/map";

function App() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const obtenerPosition = () => {
      if (navigator.permissions) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            console.log(permissionStatus);
            if (permissionStatus.state === "granted") {
              // El usuario ya otorgó permisos, obtener la ubicación
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                },
                (error) => {
                  console.error(error);
                },
                { enableHighAccuracy: true }
              );
            } else if (permissionStatus.state === "prompt") {
              // El usuario aún no ha respondido, puedes solicitar permisos
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                },
                (error) => {
                  console.error(error);
                },
                { enableHighAccuracy: true }
              );
            } else {
              // Permiso denegado
              console.error("Permiso de ubicación denegado.");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // Fallback para navegadores que no admiten navigator.permissions
        console.error(
          "La API Permissions no está disponible en este navegador."
        );
      }
    };

    const intervalId = setInterval(() => {
      obtenerPosition();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      {/* <Header /> 6.289702, -75.545242 */}
      {position && (
        <>
          {position.latitude}
          {position.longitude}
          <Map
            // latitude={6.289702}
            // longitude={-75.545242}
            latitude={position.latitude}
            longitude={position.longitude}
          />
        </>
      )}
    </div>
  );
}

export default App;
