import React, { useRef, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { setUpApparatusMarker, setUpAreaDrawingManager, setUpHazardMarker } from './components/MapUtils';
import IncidentButton from './components/IncidentButton';
import ApparatusPopup from './components/ApparatusPopup';
import { message } from 'antd';
import HazardsPopup from './components/HazardsPopup';


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
      let marker = setUpApparatusMarker(googleMaps, lat, lng, 40, true, selectedApparatus.image)
      marker.setMap(googleMap);
      setApparatusDrawingEnabled(false)
    }else if(harzardDrawingEnabled && selectedHazard != null){
      let marker = setUpHazardMarker(googleMaps, lat, lng, selectedHazard.width, selectedHazard.height, true, selectedHazard.image)
      marker.setMap(googleMap);
      setHarzardDrawingEnabled(false)
    }
  };

  const onAddMenuClick = (val) => {
    if(val.key == "1"){
        setApparatusModalOpen(true)
    // }else if(val.key == "2"){
    //    setIsAreaDrawing(true)
    //     drawingListener = setUpAreaDrawingManager(googleMaps, 'obstacle');
    //     drawingListener.setMap(googleMap);

    //     googleMaps.event.addListener(drawingListener, 'polygoncomplete', function (polygon) {
    //       //completePolygon(polygon);
    //     });
    // }else{
    }else if(val.key == "2"){
      setIsHazardModelOpen(true)
    }else{
       message.error("Coming Soon")
    }
  }

  // function completePolygon(polygon, number) {
  //   const polygonPath = polygon.getPath();
  //   const polygonCoordinates = [];

  //   for (let i = 0; i < polygonPath.getLength(); i++) {
  //     const latLng = polygonPath.getAt(i);
  //     polygonCoordinates.push({
  //       lat: latLng.lat(),
  //       lng: latLng.lng(),
  //     });
  //   }
  //   const centerPoint = calculatePolygonCenter(polygonPath);

  //   // Set a marker at the center of the polygon
  //   if (googleMap && googleMaps && centerPoint) {
  //     const centerMarker = setUpCenterMarker(
  //       googleMaps,
  //       centerPoint.lat,
  //       centerPoint.lng,
  //       35,
  //       false,
  //       number || options?.must_height,
  //     );
  //     centerMarker.setMap(googleMap);

  //     const newObstacle = {
  //       polygon: polygon,
  //       centerPoint: polygonPath,
  //       centerMarker: centerMarker,
  //       number: number ? number : 90, // Default obstacle number
  //       height: number ? number : 90, // Default obstacle height
  //     };

  //     // Add both polygon and center marker with a unique identifier
  //     polygon.index = currentPolygons.length;
  //     let arr = [...currentPolygons, newObstacle];

  //     setObstacleBoundaries(arr);
  //     currentPolygons = arr;
  //     setIsObstacleDrawing(false);

  //     googleMaps.event.addListener(polygon, 'click', function (event) {
  //       let index = polygon.index;
  //       obstacleIndex = index;
  //       form.setFieldValue('obstacle_number', currentPolygons[index].height);
  //       setOpenObstacleModal(true);
  //     });

  //     polygon.getPaths().forEach((path) => {
  //       googleMaps.event.addListener(path, 'set_at', () => {
  //         let index = polygon.index;
  //         obstacleIndex = index;
  //         form.setFieldValue('obstacle_number', currentPolygons[index].height);
  //         update();
  //       });
  //     });
  //   }

  //   form.resetFields();
  // }


  let onChangeAppratusModal = (val) => {
     setSelectedAppratus(val)
     setApparatusDrawingEnabled(true)
  }

  let onChangeHazardModal = (val) => {
    setSelectedHazard(val)
    setHarzardDrawingEnabled(true)
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
      <HazardsPopup isOpen={isHazardModalOpen} setIsOpen={setIsHazardModelOpen} selectedHazard={onChangeHazardModal}/>
    </div>
  );
};

export default GoogleMap;