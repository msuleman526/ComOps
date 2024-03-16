
let HOUSE_BOUNDARY_COLOR = '#1ac74b';
let POLYLINE_COLOR = '#FF0000';

export let setUpApparatusMarker = (googleMaps, lat, lng, size, drag, image) => {
    const marker = new googleMaps.Marker({
        position: new googleMaps.LatLng(lat, lng),
        icon: {
            url: image,
            scaledSize: new googleMaps.Size(size, size),
        },
        draggable: drag,
    });

    return marker;
};

export let setUpHazardMarker = (googleMaps, lat, lng, width, height, drag, image) => {
    const marker = new googleMaps.Marker({
        position: new googleMaps.LatLng(lat, lng),
        icon: {
            url: image,
            scaledSize: new googleMaps.Size(width, height),
        },
        draggable: drag,
    });

    return marker;
};


//Setup House Boundary Drawing Manager
export let setUpAreaDrawingManager = (googleMaps, area) => {
    return new googleMaps.drawing.DrawingManager({
      drawingMode: googleMaps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: googleMaps.ControlPosition.TOP_CENTER,
        drawingModes: [googleMaps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: {
        editable: false,
        draggable: false,
        fillColor: area.color,
        strokeColor: area.color,
        zIndex: 1,
      },
    });
};

export let setApparatusLbl = (googleMaps, googleMap, drag, lat, lng, value, currentApparatusImg, size) => {
    const marker =  new googleMaps.Marker({
        position: {lat: lat, lng: lng},
        map: googleMap,
        icon: {
            url: currentApparatusImg,
            labelOrigin: new googleMaps.Point(11, -10), // Adjust the label origin to position it correctly
            scaledSize: new googleMaps.Size(size, size),
        },
        label: {
            text: value,
            className: 'apparatus-label',
        },
        draggable: drag
    });

    return marker;
}

export let setAreaLblMarker = (googleMaps, googleMap, drag, lat, lng, value) => {
    const marker =  new googleMaps.Marker({
        position: {lat: lat, lng: lng},
        map: googleMap,
        label: {
            text: value,
            className: 'apparatus-label',
        },
        icon: {
            url: "/assets/transparent.png",
            scaledSize: new googleMaps.Size(20, 20),
        },
        draggable: drag
    });
    
    return marker;
}

export const calculatePolygonCenter = (polygonPath) => {
    if (!polygonPath || polygonPath.getLength() === 0) {
      return null;
    }
  
    let sumLat = 0;
    let sumLng = 0;
  
    // Iterate through each LatLng in the path and calculate the sum of latitudes and longitudes
    for (let i = 0; i < polygonPath.getLength(); i++) {
      const latLng = polygonPath.getAt(i);
      sumLat += latLng.lat();
      sumLng += latLng.lng();
    }
  
    // Calculate the average
    const avgLat = sumLat / polygonPath.getLength();
    const avgLng = sumLng / polygonPath.getLength();
  
    return { lat: avgLat, lng: avgLng };
  };