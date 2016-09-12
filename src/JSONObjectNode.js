import React, { PropTypes } from 'react';
import JSONNestedNode from './JSONNestedNode';

// Configures <JSONNestedNode> to render an Object
const JSONObjectNode = ({ data, ...props }) => (
  <JSONNestedNode
    {...props}
    data={data}
    nodeType='Object'
    nodeTypeIndicator='{}'
    expandable
  />
);

JSONObjectNode.propTypes = {
  data: PropTypes.object
};

export default JSONObjectNode;
