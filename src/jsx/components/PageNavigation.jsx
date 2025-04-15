import React, { /* useState, useEffect, useRef */ memo, useCallback } from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/scroll-into-view
import scrollIntoView from 'scroll-into-view';

function PageNavigation({ appRef }) {
  const analytics = window.gtag || undefined;
  const track = useCallback((label_event = false, value_event = false) => {
    if (typeof analytics !== 'undefined' && label_event !== false && value_event !== false) {
      analytics('event', 'project_interaction', {
        label: label_event,
        project_name: '2022-rmt_report',
        transport_type: 'beacon',
        value: value_event
      });
    }
  }, [analytics]);
  const anchorClick = (target, name) => {
    track('Navigation Click', name);
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
    <div className="pagenavigation_container">
      <div className="navigation">
        <div className="button_container"><button type="button" onClick={() => anchorClick('.anchor_video', 'Videos')}>Videos</button></div>
        <div className="button_container"><button type="button" onClick={() => anchorClick('.anchor_downloads', 'Downloads')}>Downloads</button></div>
        <div className="button_container"><button type="button" onClick={() => anchorClick('.anchor_press', 'Press')}>Press</button></div>
        <div className="button_container"><button type="button" onClick={() => anchorClick('.anchor_podcasts', 'Podcasts')}>Podcast</button></div>
        <div className="button_container"><a href="https://unctad.org/publications-search?f[0]=product%3A393" onClick={() => track('Previous reports')}>Previous reports</a></div>
      </div>
    </div>
  );
}

PageNavigation.propTypes = {
  appRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired
};
PageNavigation.defaultProps = {

};

export default memo(PageNavigation);
