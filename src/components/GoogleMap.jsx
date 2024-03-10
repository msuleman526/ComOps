import React, { useRef } from 'react'
import GoogleMapReact from 'google-map-react'
const AnyReactComponent = ({ text }) => <div>{text}</div>
const GoogleMap = ({ height }) => {
  const mapRef = useRef(null)

  const handleApiLoaded = (map, maps) => {}
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  }

  return (
    <div style={{ height: 'calc(100vh - 65px)', width: '100%' }}>
      <GoogleMapReact onGoogleApiLoaded={(map, maps) => handleApiLoaded(map, maps)} ref={mapRef} bootstrapURLKeys={{ key: 'AIzaSyAo1viD-Ut0TzXTyihevwuf-9tv_J3dPa0' }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} yesIWantToUseGoogleMapApiInternals={true}>
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  )
}

export default GoogleMap
