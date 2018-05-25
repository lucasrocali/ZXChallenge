import React from 'react';
import PropTypes from 'prop-types';
import { RootStack } from './Routers';

class RootNavigator extends React.Component {

  render() {
    return (
        <RootStack/>
    );
  }
}

export default RootNavigator;