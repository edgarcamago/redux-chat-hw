import React, { Component } from "react";
import "./App.css";
import mapDispatchToProps from "./actions.js";
import { connect } from "react-redux";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channelName: ""
    };
  }

  componentDidMount() {
    this.props.connect(window.location.pathname);
  }

  render() {
    const channels = Object.values(this.props.channels.channels).map(ch => {
      const isSelected = ch.url === this.props.channels.selected;
      const styles = isSelected ? { color: "blue" } : {};
      return (
        <tr
          style={styles}
          onClick={() => this.props.selectChannel(ch.url)}
          key={ch.url}
        >
          <td>{ch.name}</td>
        </tr>
      );
    });

    return (
      <div className="App">
        {!this.props.connection.connected ? (
          <h1>Connecting...</h1>
        ) : (
          <h1>Connected as {this.props.connection.user.userId}</h1>
        )}
        <div>
          <input
            value={this.state.channelName}
            onChange={e => this.setState({ channelName: e.target.value })}
          />
          <button
            disabled={!this.props.connection.connected}
            onClick={() => this.props.createChannel(this.state.channelName)}
          >
            +
          </button>
        </div>
        <table>
          <tbody>{channels}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
