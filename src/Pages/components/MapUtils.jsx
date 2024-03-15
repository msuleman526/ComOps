
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
export let setUpAreaDrawingManager = (googleMaps, type = null) => {
    return new googleMaps.drawing.DrawingManager({
      drawingMode: googleMaps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: googleMaps.ControlPosition.TOP_CENTER,
        drawingModes: [googleMaps.drawing.OverlayType.POLYGON],
      },
      polygonOptions: {
        editable: true,
        draggable: true,
        fillColor: type === 'obstacle' ? POLYLINE_COLOR : HOUSE_BOUNDARY_COLOR,
        strokeColor: type === 'obstacle' ? POLYLINE_COLOR : HOUSE_BOUNDARY_COLOR,
        zIndex: 1,
      },
    });
};