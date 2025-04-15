import React, { /* useState, useEffect, useRef */ memo, useCallback } from 'react';
import PropTypes from 'prop-types';

// https://www.npmjs.com/package/scroll-into-view
import scrollIntoView from 'scroll-into-view';

function ProgressIndicator({
  appRef, section1Progress, section2Progress, section3Progress, section4Progress, section5Progress
}) {
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
    track('Anchor', name);
    setTimeout(() => {
      scrollIntoView(appRef.current.querySelector(target), {
        align: {
          left: 0,
          leftOffset: 0,
          lockX: false,
          lockY: false,
          top: 0,
          topOffset: 0
        },
        cancellable: false,
        time: 1000
      });
    }, 50);
  };
  return (
    <div className="progress_indicator_container" style={{ top: `${window.location.href.includes('unctad.org') ? '0' : '0'}` }}>
      <button type="button" className="section" onClick={() => anchorClick('.section_1_container', 'Section 1')}>
        {
          // eslint-disable-jsx-a11y/control-has-associated-label
          <div className="progress_bar" style={{ width: `${section1Progress}%` }} />
        }
      </button>
      <div className="section_divider" />
      <button type="button" className="section" onClick={() => anchorClick('.section_2_container', 'Section 2')}>
        {
          // eslint-disable-jsx-a11y/control-has-associated-label
          <div className="progress_bar" style={{ width: `${section2Progress}%` }} />
          }
      </button>
      <div className="section_divider" />
      <button type="button" className="section" onClick={() => anchorClick('.section_3_container', 'Section 3')}>
        {
          // eslint-disable-jsx-a11y/control-has-associated-label
          <div className="progress_bar" style={{ width: `${section3Progress}%` }} />
        }
      </button>
      <div className="section_divider" />
      <button type="button" className="section" onClick={() => anchorClick('.section_4_container', 'Section 4')}>
        {
          // eslint-disable-jsx-a11y/control-has-associated-label
          <div className="progress_bar" style={{ width: `${section4Progress}%` }} />
        }
      </button>
      <div className="section_divider" />
      <button type="button" className="section" onClick={() => anchorClick('.section_5_container', 'Section 5')}>
        {
          // eslint-disable-jsx-a11y/control-has-associated-label
          <div className="progress_bar" style={{ width: `${section5Progress}%` }} />
        }
      </button>
    </div>
  );
}

ProgressIndicator.propTypes = {
  appRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]).isRequired,
  section1Progress: PropTypes.number,
  section2Progress: PropTypes.number,
  section3Progress: PropTypes.number,
  section4Progress: PropTypes.number,
  section5Progress: PropTypes.number
};

ProgressIndicator.defaultProps = {
  section1Progress: 0,
  section2Progress: 0,
  section3Progress: 0,
  section4Progress: 0,
  section5Progress: 0
};

export default memo(ProgressIndicator);
