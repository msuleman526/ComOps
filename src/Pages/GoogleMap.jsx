import React, { useRef, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { setUpApparatusMarker } from './components/MapUtils';
import IncidentButton from './components/IncidentButton';
import ApparatusPopup from './components/ApparatusPopup';
import { message } from 'antd';


let googleMap = null;
let googleMaps = null;
const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMap = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [drawingEnabled, setDrawingEnabled] = useState(false)
  const [selectedApparatus, setSelectedAppratus] = useState(null);
  const [isApparatusModalOpen, setApparatusModalOpen] = useState(false)

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
    googleMaps = maps;
    googleMap = map;
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

  const handleMapClick = ({ lat, lng }) => {
    if(drawingEnabled && selectedApparatus != null){
      let marker = setUpApparatusMarker(googleMaps, lat, lng, 40, true, selectedApparatus)
      marker.setMap(googleMap);
      setDrawingEnabled(false)
    }
  };

  const onAddMenuClick = (val) => {
    if(val.key == "1"){
        setApparatusModalOpen(true)
    }else{
       message.error("Coming Soon")
    }
  }

  let onChangeAppratusModal = (val) => {
     setSelectedAppratus(val)
     setDrawingEnabled(true)
  }

  return (
    <div style={{ height: 'calc(100vh - 65px)', width: '100%', position: 'relative'}}>
      <GoogleMapReact
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        bootstrapURLKeys={{ key: 'AIzaSyAo1viD-Ut0TzXTyihevwuf-9tv_J3dPa0' }}
        defaultCenter={defaultProps.center}
        onClick={handleMapClick}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
      >
        {currentPosition && <AnyReactComponent lat={currentPosition.lat} lng={currentPosition.lng} text="My Location" />}
      </GoogleMapReact>
      <IncidentButton onMenuSelection={onAddMenuClick}/>
      <ApparatusPopup isOpen={isApparatusModalOpen} setIsOpen={setApparatusModalOpen} selectApparatus={onChangeAppratusModal}/>
    </div>
  );
};

export default GoogleMap;