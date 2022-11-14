import React, { /* useState, useEffect, useRef */ memo } from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/scroll-into-view
import scrollIntoView from 'scroll-into-view';

const analytics = window.gtag || undefined;

function PageNavigation({ appRef }) {
  const track = (name) => {
    if (typeof analytics !== 'undefined') {
      analytics('event', 'Navigation Click', {
        event_category: '2022-ldc_report',
        event_label: name,
        transport_type: 'beacon'
      });
    }
  };
  const anchorClick = (target, name) => {
    track(name);
    setTimeout(() => {
      scrollIntoView(appRef.current.querySelector(target), {
        align: {
          left: 0,
          leftOffset: 0,
          lockX: false,
          lockY: false,
          top: 0,
          topOffset: 100
        },
        cancellable: false,
        time: 1000
      });
    }, 50);
  };
  return (
    <>
      <div className="pagenavigation_container">
        <div className="navigation">
          <div className="button_container"><button type="button" onClick={() => anchorClick('.anchor_video', 'Videos')}>Videos</button></div>
          <div className="button_container"><button type="button" onClick={() => anchorClick('.anchor_downloads', 'Downloads')}>Downloads</button></div>
          <div className="button_container"><button type="button" onClick={() => anchorClick('.anchor_press', 'Press')}>Press</button></div>
          <div className="button_container"><button type="button" onClick={() => anchorClick('.anchor_podcasts', 'Podcasts')}>Podcast</button></div>
          <div className="button_container"><a href="https://unctad.org/publications-search?f[0]=product%3A392" onClick={() => track('Previous reports')}>Previous reports</a></div>
        </div>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </>
  );
}

PageNavigation.propTypes = {
  appRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired
};
PageNavigation.defaultProps = {

};

export default memo(PageNavigation);
