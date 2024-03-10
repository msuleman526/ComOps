import React, { useRef, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMap = ({ height }) => {
  const mapRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }, []);

  const handleApiLoaded = (map, maps) => {
    map.setMapTypeId('satellite');
    if (currentPosition) {
      map.setCenter(currentPosition);
      map.setZoom(15);
      new maps.Marker({
        position: currentPosition,
        map,
        title: "Your Current Location"
      });
    }
  };

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: 'calc(100vh - 65px)', width: '100%' }}>
      <GoogleMapReact
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        ref={mapRef}
        bootstrapURLKeys={{ key: 'AIzaSyAo1viD-Ut0TzXTyihevwuf-9tv_J3dPa0' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
      >
        {currentPosition && <AnyReactComponent lat={currentPosition.lat} lng={currentPosition.lng} text="My Location" />}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;