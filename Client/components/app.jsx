import React from 'react';
import axios from 'axios';
import Location from './Location.jsx';
import Host from './HostInfo.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: {},
      HostInfo: {},
      ToKnow: {},
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    Promise.all([
      axios.get('/location/Austin'),
      axios.get('/hostInfo/Jon-Lasley'),
      axios.get('/toKnow/Model-H-is-for-house'),
    ])
      .then((data) => {
        const [location, HostInfo, ToKnow] = data.map((obj) => obj.data);
        this.setState({
          location,
          HostInfo,
          ToKnow,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  render() {
    const { location, HostInfo, ToKnow } = this.state;
    return (
      <div>
        <Location location={location} />
        <Host host={HostInfo} />
        <div>{ToKnow}</div>
      </div>
    );
  }
}

export default App;
