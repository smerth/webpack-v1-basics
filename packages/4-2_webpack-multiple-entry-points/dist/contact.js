var React = require("react");
var ReactDOM = require("react-dom");

class Contact extends React.Component {
  render() {
    return <h1>Contact us</h1>;
  }
}

ReactDOM.render(<Contact />, document.getElementById("react-container"));
