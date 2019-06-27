var React = require("react");
var ReactDOM = require("react-dom");

class About extends React.Component {
  render() {
    return <h1>About us</h1>;
  }
}

ReactDOM.render(<About />, document.getElementById("react-container"));
