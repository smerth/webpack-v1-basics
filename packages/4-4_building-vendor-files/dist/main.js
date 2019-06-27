var React = require("react");
var ReactDOM = require("react-dom");
require("./style.scss");

class Message extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="page-title">Pacific Northwest!</h1>
        <nav>
          <ul className="menu">
            <li>
              <a href="dist/about.html">About</a>
            </li>
            <li>
              <a href="dist/contact.html">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

ReactDOM.render(<Message />, document.getElementById("react-container"));
