import React from 'react';
import './App.css';
import Playlist from '../Components/Playlist'
import { Grid, Row, Col } from 'react-flexbox-grid';
import {getAtmosphereByUser, addAtmosphereByUser} from '../db/db_methods';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      atmospheres: []
    }
  }
  componentDidMount() {
    this.fetchAtmospheres();
  }
  fetchAtmospheres() {
    const userId = this.props.context.userId;
    const GABUResult = getAtmosphereByUser(userId)
    GABUResult.then((result) => {
      const finalResult = result.data[0].result.db_result;     
      this.setState({
        atmospheres: finalResult
      })
    })
  }
  handleAddAtmosphereButton() {
    const userId = this.props.context.userId;
    const value = prompt("Name of the atmosphere?");
    const AABUResult = addAtmosphereByUser(userId, value)
    AABUResult.then((result) => {
      if(result.data[0].success) {
        this.fetchAtmospheres();
      }
    })
  }
  render() {    
  return (
    <div className="body" id="App">
      <Grid id="top-row" fluid>
        <Row around="xs">
          <Col xs={3} >
          </Col>
          <Col xs={3}>
          
          </Col>
          <Col xs={3}>
          <button className="largeButton" onClick={() => this.handleAddAtmosphereButton()}>Add atmosphere</button>
          </Col>
        </Row>
      </Grid>
      {this.state.atmospheres.map((atmosphere, i) => 
        <Playlist key={i} atmosphereID={atmosphere.id} atmosphereTitle={atmosphere.atmosphere_name} context={this.props.context} />
      )}
    </div>
  )};
}

export default App;
