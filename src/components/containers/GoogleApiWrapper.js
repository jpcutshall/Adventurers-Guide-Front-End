import React, {useState, useEffect, useCallback, useRef} from 'react'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript
} from '@react-google-maps/api';
import {Container} from 'react-bootstrap'

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const mapContainerStyle = {
  width: 800, 
  height: 800
}

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true
}

 
export default function GoogleApiWrapper(props) {
  const [ marker, setMarker] = useState()
  const [ selected, setSelected] = useState(null)
  const [ isShowing, setShowing] = useState(false)
  
  
  const onMapClick = useCallback((event) => {
    if (isShowing) {
      return
    }
    console.log("lat :  ", event.latLng.lat())
    console.log("long :  ", event.latLng.lng())
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date()
    })
    
    if (props.setCoords) {
      props.setCoords(event.latLng.lat(), event.latLng.lng())
    }
  }, [])


  const checkShow = () => {
    console.log("checkingSHow")
      props.post ? setShowing(true) : setShowing(false)
              
  }
  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    console.log("onMapLoad")
    checkShow()
    
    mapRef.current = map
  }, [])

  


  let center = {
    lat: props.lat ? Number.parseFloat(props.lat, 10) : 34,
    lng: props.lng ? Number.parseFloat(props.lng, 10) : -83
  }

  useEffect(() => {
    if(props.lat && !marker){

      setMarker({
        lat: Number.parseFloat(props.lat, 10),
        lng: Number.parseFloat(props.lng, 10),
        time: new Date(),
      })
      
    }
    
  }, [props])

  return (
    <Container className="mr-5 ml-5 mb-5 rounded">
        <LoadScript
        googleMapsApiKey={googleMapsApiKey}
        >
          <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={marker ? {
            lat: marker.lat, lng: marker.lng
          } : {lat: 34, lng: -81}}
          zoom={isShowing ? 10 : 5}  
          options={options}
          onClick={isShowing ? null : onMapClick}
          onLoad={onMapLoad}
          onUnmount={map => {
            props.lat ? setMarker({
              lat: Number.parseFloat(props.lat, 10),
              lng: Number.parseFloat(props.lng, 10),
              time: new Date(),
            }) : setMarker(center)
          }}
          >
            { marker ?
              <Marker 
              key={marker.lat}
              position={{lat: marker.lat, lng: marker.lng}}
              onClick={() => {
                setSelected(marker)
              }}
              /> : null
            }

            {selected ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng}}>
              <Container>
                <h2>Selected Location</h2>
                <p>
                  Latitude: {selected.lat}
                </p>
                <p>
                  Longitude: {selected.lng}
                </p>
              </Container>
            </InfoWindow>) : null}
          </GoogleMap>

        </LoadScript>
    </Container>

  )

}