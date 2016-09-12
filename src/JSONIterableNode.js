import React from 'react';
import JSONNestedNode from './JSONNestedNode';

// Configures <JSONNestedNode> to render an iterable
export default function JSONIterableNode({ ...props }) {
  return (
    <JSONNestedNode
      {...props}
      nodeType='Iterable'
      nodeTypeIndicator='()'
    />
  );
}
