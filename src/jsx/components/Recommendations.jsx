import React, { /* useState, useEffect, useRef */ memo } from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import IsVisible from 'react-is-visible';

function Recommendations({ headline, recommendation_list }) {
  return (
    <IsVisible once>
      {(isVisible) => (
        <div className={`recommendations_container ${(isVisible) ? 'visible' : ''}`}>
          <h3>{headline}</h3>
          <ul>
            {recommendation_list && recommendation_list.map((el, i) => (
              <li key={el}>
                <div className="list_indicator">{i + 1}</div>
                <div className="list_text">{el}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </IsVisible>
  );
}

Recommendations.propTypes = {
  headline: PropTypes.string.isRequired,
  recommendation_list: PropTypes.instanceOf(Array).isRequired
};

Recommendations.defaultProps = {
};

export default memo(Recommendations);
