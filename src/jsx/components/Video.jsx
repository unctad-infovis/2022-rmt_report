import React, { /* useState, */ useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

function Video({ anchorClick }) {
  const videoRef = useRef();
  const mp4Ref = useRef();
  const webmRef = useRef();
  const reportHeadline = useRef();

  useEffect(() => {
    videoRef.current.src = (window.location.href.includes('unctad.org') ? 'https://storage.unctad.org/2022-rmt_report/assets/vid/' : './assets/vid/') + ((videoRef.current.offsetWidth < 768) ? '2022-rmt_report_video.mp4' : '2022-rmt_report_video.mp4');
    mp4Ref.current.src = (window.location.href.includes('unctad.org') ? 'https://storage.unctad.org/2022-rmt_report/assets/vid/' : './assets/vid/') + ((videoRef.current.offsetWidth < 768) ? '2022-rmt_report_video.mp4' : '2022-rmt_report_video.mp4');
    webmRef.current.src = (window.location.href.includes('unctad.org') ? 'https://storage.unctad.org/2022-rmt_report/assets/vid/' : './assets/vid/') + ((videoRef.current.offsetWidth < 768) ? '2022-rmt_report_video.webm' : '2022-rmt_report_video.webm');
    videoRef.current.poster = (window.location.href.includes('unctad.org') ? 'https://storage.unctad.org/2022-rmt_report/assets/img/' : './assets/img/') + ((videoRef.current.offsetWidth < 768) ? '2022-rmt_report_section-min.jpg' : '2022-rmt_report_section-min.jpg');
    if (!videoRef.current.playing) {
      videoRef.current.play();
      const interval = setInterval(() => {
        if (videoRef.current.currentTime > 3) {
          document.querySelector('body').style.overflow = 'scroll';
          reportHeadline.current.classList.add('show');
          clearInterval(interval);
        }
      }, 100);
    }
    if (document.documentElement.scrollTop > 0) {
      document.querySelector('body').style.overflow = 'scroll';
    }
  }, []);

  useEffect(() => {
    videoRef.current.addEventListener('ended', () => {
      videoRef.current.play();
      if (document.documentElement.scrollTop === 0) {
        anchorClick('.pagenavigation_container', 'Video ended');
      }
    });
  }, [anchorClick]);

  return (
    <div className="video_container">
      <div className="title_container">
        <h4 className="report_title">
          <div className="big">Review</div>
          <div>of Maritime</div>
          <div>Transport</div>
          <div className="year">2022</div>
        </h4>
        <h4 className="report_headline" ref={reportHeadline}>
          <div>Navigating</div>
          <div>stormy waters</div>
        </h4>
      </div>
      <div className="video_headline_wrapper" />
      <video autoPlay muted playsInline ref={videoRef} poster="">
        <source src="" type="video/mp4" ref={mp4Ref} />
        <source src="" type="video/webm" ref={webmRef} />
        <track default kind="captions" srcLang="en" src="" />
        Your browser does not support the video tag.
      </video>
      <svg className="arrows" onClick={() => anchorClick('.pagenavigation_container', 'Arrows')}>
        <path className="a1" d="M0 0 L30 32 L60 0" />
        <path className="a2" d="M0 20 L30 52 L60 20" />
        <path className="a3" d="M0 40 L30 72 L60 40" />
      </svg>
    </div>
  );
}

Video.propTypes = {
  anchorClick: PropTypes.instanceOf(Function).isRequired
};

Video.defaultProps = {

};

export default memo(Video);
