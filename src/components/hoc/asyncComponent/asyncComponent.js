import React, { Component } from "react";

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount = async () => {
      try {
        const cmp = await importComponent();
        this.setState({
          component: cmp.default,
        });
      } catch (e) {
        console.log(e);
      }
    };

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
