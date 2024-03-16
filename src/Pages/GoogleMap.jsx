import React, { useRef, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { calculatePolygonCenter, setApparatusLbl, setAreaLblMarker, setUpApparatusMarker, setUpAreaDrawingManager, setUpHazardMarker } from './components/MapUtils';
import IncidentButton from './components/IncidentButton';
import ApparatusPopup from './components/ApparatusPopup';
import { message } from 'antd';
import HazardsPopup from './components/HazardsPopup';
import AppratusLblPopup from './components/AppratusLblPopup';
import AreaPopup from './components/AreaPopup';


let googleMap = null;
let googleMaps = null;
let drawingListener = null;
const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};
let currentLat = null;
let currentLng = null;
let currentApparatusImg = null;
let selectedArea = null;
let currentApparatusMarker = null;


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const GoogleMap = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [apparatusDrawingEnabled, setApparatusDrawingEnabled] = useState(false)
  const [harzardDrawingEnabled, setHarzardDrawingEnabled] = useState(false)
  const [selectedApparatus, setSelectedAppratus] = useState(null);
  const [isApparatusModalOpen, setApparatusModalOpen] = useState(false)
  const [isHazardModalOpen, setIsHazardModelOpen] = useState(false)
  const [selectedHazard, setSelectedHazard] = useState(null)
  const [isAreaDrawing, setIsAreaDrawing] = useState(false)
  const [showAppratusLblPopup, setShowAppratusLblPopup] = useState(false)
  const [isAreaPopupOpen, setIsAreaPopupOpen] = useState(false)

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
    if(apparatusDrawingEnabled && selectedApparatus != null){
      currentLat = lat
      currentLng = lng
      currentApparatusImg = selectedApparatus.image
      currentApparatusMarker = setUpApparatusMarker(googleMaps, lat, lng, 40, true, currentApparatusImg)
      currentApparatusMarker.setMap(googleMap);
      setApparatusDrawingEnabled(false)
      setShowAppratusLblPopup(true)
    }else if(harzardDrawingEnabled && selectedHazard != null){
      let marker = setUpHazardMarker(googleMaps, lat, lng, selectedHazard.width, selectedHazard.height, true, selectedHazard.image)
      marker.setMap(googleMap);
      setHarzardDrawingEnabled(false)
    }
  };

  const onAddMenuClick = (val) => {
    if(val.key == "1"){
        setApparatusModalOpen(true)
    }else if(val.key == "3"){
        setIsAreaDrawing(true)
        setIsAreaPopupOpen(true)
    }
    else if(val.key == "2"){
      setIsHazardModelOpen(true)
    }else{
       message.error("Coming Soon")
    }
  }

  function completePolygon(polygon, number) {
    const polygonPath = polygon.getPath();
    const polygonCoordinates = [];

    for (let i = 0; i < polygonPath.getLength(); i++) {
      const latLng = polygonPath.getAt(i);
      polygonCoordinates.push({
        lat: latLng.lat(),
        lng: latLng.lng(),
      });
    }
    const centerPoint = calculatePolygonCenter(polygonPath);
    if (googleMap && googleMaps && centerPoint) {
      const centerMarker = setAreaLblMarker(
        googleMaps,
        googleMap,
        false,
        centerPoint.lat,
        centerPoint.lng,
        selectedArea.name,
      );
      centerMarker.setMap(googleMap);
    }
    drawingListener.setMap(null);
    setIsAreaDrawing(false)
  }


  let onChangeAppratusModal = (val) => {
     setSelectedAppratus(val)
     setApparatusDrawingEnabled(true)
  }

  let onChangeHazardModal = (val) => {
    setSelectedHazard(val)
    setHarzardDrawingEnabled(true)
  }

  let onApparatusLblChange = (val) => {
     currentApparatusMarker.setMap(null);
     var labelMarker = setApparatusLbl(googleMaps, googleMap, true, currentLat, currentLng, val, currentApparatusImg, 40)
     labelMarker.setMap(googleMap);
  }

  let onAreaTypeClick = (area) => {
    selectedArea = area
    drawingListener = setUpAreaDrawingManager(googleMaps, area);
    drawingListener.setMap(googleMap);

    googleMaps.event.addListener(drawingListener, 'polygoncomplete', function (polygon) {
      completePolygon(polygon);
    });
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
      {isAreaDrawing == false && <IncidentButton onMenuSelection={onAddMenuClick}/>}
      <ApparatusPopup isOpen={isApparatusModalOpen} setIsOpen={setApparatusModalOpen} selectApparatus={onChangeAppratusModal}/>
      <HazardsPopup isOpen={isHazardModalOpen} setIsOpen={setIsHazardModelOpen} selectedHazard={onChangeHazardModal}/>
      <AppratusLblPopup isOpen={showAppratusLblPopup} setIsOpen={setShowAppratusLblPopup} currentApparatus={selectedApparatus?.name} setApparatusLabel={onApparatusLblChange}/>
      <AreaPopup isOpen={isAreaPopupOpen} setIsOpen={setIsAreaPopupOpen} chooseArea={onAreaTypeClick}/>
    </div>
  );
};

export default GoogleMap;