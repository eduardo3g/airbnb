import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map((item) => ({
    longitude: item.long,
    latitude: item.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_MAP_STYLE_URI}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      {...viewport}
      onViewportChange={(nextViewPort) => setViewport(nextViewPort)}
    >
      {searchResults.map(({ long, lat, title }) => (
        <div key={long}>
          <Marker longitude={long} latitude={lat} offsetTop={-10}>
            <p
              role="img"
              onClick={() => setSelectedLocation({ long, lat, title })}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📍
            </p>
          </Marker>

          {/* The pop up that showns when the Marker is clicked */}
          {selectedLocation.long === long ? (
            <Popup
              closeOnClick={true}
              onClick={() => setSelectedLocation({})}
              latitude={lat}
              longitude={long}
            >
              {title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
