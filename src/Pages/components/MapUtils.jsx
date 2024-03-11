
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
