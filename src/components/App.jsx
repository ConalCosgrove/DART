import React from "react";
import api from "../../utils/api.js";
class App extends React.Component {
    constructor() {
        super();
        console.log('Getting stations');
        this.state= {stations:null};
        api.getStations()
        .then((res) => {
            this.state = {stations:res};
        })
        .catch((err) => {
            console.error(err);
        })
    }
    render() {
      return <div>
        {this.state && this.state.stations && JSON.stringify(this.state.stations)}
        <h1>Hi</h1>
      </div>
    }
}

export default App;
