import React, { PropTypes } from 'react';

const renderExpandIcon = (expanded) => {
  return expanded
  ? <span
    style={{
      height: 1,
      width: 6,
      top: -4,
      position: 'relative',
      backgroundColor: '#000',
      display: 'inline-block'
    }}
  />
  : '+';
};

const JSONArrow = ({
  styling,
  arrowStyle,
  expanded,
  nodeType,
  onClick
}) => (
  <div
    {...styling('arrowContainer', arrowStyle)}
    onClick={onClick}
  >
    <div {...styling(['arrow', 'arrowSign'], nodeType, expanded, arrowStyle)}>
      {renderExpandIcon(expanded)}
      {arrowStyle === 'double' &&
        <div {...styling(['arrowSign', 'arrowSignInner'])}>{renderExpandIcon(expanded)}</div>
      }
    </div>
  </div>
);


JSONArrow.propTypes = {
  styling: PropTypes.func.isRequired,
  arrowStyle: PropTypes.oneOf(['single', 'double']),
  expanded: PropTypes.bool.isRequired,
  nodeType: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

JSONArrow.defaultProps = {
  arrowStyle: 'single'
};

export default JSONArrow;
