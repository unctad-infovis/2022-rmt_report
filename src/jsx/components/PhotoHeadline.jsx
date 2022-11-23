import React, { /* useState, */ useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

function PhotoHeadline({
  img, max_width, text_lower, text_upper
}) {
  const waveRef1 = useRef();
  const waveRef2 = useRef();
  const waveRef3 = useRef();
  const waveRef4 = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const value = window.scrollY;
      waveRef1.current.style.backgroundPositionX = `${400 + value * 4}px`;
      waveRef2.current.style.backgroundPositionX = `${300 + value * -4}px`;
      waveRef3.current.style.backgroundPositionX = `${200 + value * 2}px`;
      waveRef4.current.style.backgroundPositionX = `${100 + value * -4}px`;
    });
  }, []);

  return (
    <div className="photo_headline_container" style={{ backgroundImage: `url(${window.location.href.includes('unctad.org') ? 'https://storage.unctad.org/2022-rmt_report/' : './'}assets/img/${img})` }}>
      <div className="photo_headline_content">
        <div className="photo_headlines">
          <h2 className="" style={{ maxWidth: max_width }}>{text_upper}</h2>
          <h2 className="highlight">{text_lower}</h2>
        </div>
      </div>
      <div className="photo_headline_waves">
        <div className="wave wave_1" ref={waveRef1} style={{ '--i': 1 }} />
        <div className="wave wave_2" ref={waveRef2} style={{ '--i': 2 }} />
        <div className="wave wave_3" ref={waveRef3} style={{ '--i': 3 }} />
        <div className="wave wave_4" ref={waveRef4} style={{ '--i': 4 }} />
      </div>
    </div>
  );
}

PhotoHeadline.propTypes = {
  img: PropTypes.string.isRequired,
  max_width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  text_upper: PropTypes.string.isRequired,
  text_lower: PropTypes.string.isRequired
};

PhotoHeadline.defaultProps = {
  max_width: 'auto'
};

export default memo(PhotoHeadline);
