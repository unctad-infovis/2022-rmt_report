import React, { /* useState, useEffect, useRef */ memo, useRef } from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

function Recommendations({ headline, recommendation_list }) {
  const isVisibleRef1 = useRef();
  const isVisible1 = useIsVisible(isVisibleRef1, { once: true });
  return (
    <div ref={isVisibleRef1} className={`recommendations_container ${(isVisible1) ? 'visible' : ''}`}>
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
  );
}

Recommendations.propTypes = {
  headline: PropTypes.string.isRequired,
  recommendation_list: PropTypes.instanceOf(Array).isRequired
};

export default memo(Recommendations);
