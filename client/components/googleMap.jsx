import React from 'react'
import ReactDOM from 'react-dom'
import {GoogleMaps} from 'meteor/dburles:google-maps'

class GoogleMap extends React.Component{
  constructor(props) {
    super(props)
    this.state={marker:{doc:{lat:0,lng:0}}}
    this.map={mapInstance:null,marker:null}
  }
  componentDidMount() {
    let self=this
    Tracker.autorun(function(){
      if(GoogleMaps.loaded()){
        let map = new google.maps.Map(document.getElementById('map'), {
              center: {lat:27.705584199999997, lng:85.3360838},
              zoom: 15
            });
        self.map={mapInstance:map,marker:null}
      }
    })
    loc=locDb.find()
    loc.observeChanges({
      added:(id,doc)=>{
        console.log(doc)
        self.setState({marker:{id:id,doc:doc}})
        if(self.map.mapInstance && self.map.marker==null)
        {
          let myPosition={lat:doc.lat,lng:doc.lng}
          self.map.mapInstance.setCenter(myPosition)
          let marker = new google.maps.Marker({
                      position:myPosition ,
                      map: self.map.mapInstance,
                      title: 'Hello World!'
                    });
          self.map.marker=marker
          console.log(marker)
        }
      },
      changed:(id,doc)=>{
        if(self.map.mapInstance)
        {
          if(self.map.marker){
            let frames=[],
                toLat=doc.lat,
                fromLat=self.state.marker.doc.lat,
                toLng=doc.lng,
                fromLng=self.state.marker.doc.lng
            for (var percent = 0; percent < 1; percent += 0.01) {
              curLat = fromLat + percent * (toLat - fromLat);
              curLng = fromLng + percent * (toLng - fromLng);
              frames.push(new google.maps.LatLng(curLat, curLng));
            }
            self.map.mapInstance.setCenter(new google.maps.LatLng(doc.lat,doc.lng))
            self.move(self.map.marker,frames,0,20,self.map.marker.position)
          }
          else{
            let marker = new google.maps.Marker({
                        position:{lat:doc.lat,lng:doc.lng} ,
                        map: self.map.mapInstance,
                        title: 'Hello World!'
                      });
            self.map.marker=marker
          }
        }
        self.setState({marker:{id:id,doc:doc}})
      }
    })
  }
  move(marker, latlngs, index, wait, newDestination) {
        marker.setPosition(latlngs[index]);
        if(index != latlngs.length-1) {
          // call the next "frame" of the animation
          setTimeout(function() {
            move(marker, latlngs, index+1, wait, newDestination);
          }, wait);
        }
  }
  render() {
    return(
      <div id="map" style={{height:"800px",width:"1500px"}}>adasdasdas</div>
    )
  }
}

export default GoogleMap
