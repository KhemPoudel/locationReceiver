import React, {PropTypes} from 'react'
import GoogleMap from './googleMap.jsx'
class Home extends React.Component{
  constructor(props){
    super(props)

  }
  render(){
    return (
      <GoogleMap />
    )
  }
}

export default Home;
