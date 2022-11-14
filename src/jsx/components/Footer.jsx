import React, { /* useState,  useEffect, useRef */ memo } from 'react';

const analytics = window.gtag || undefined;

function Footer() {
  const track = (name) => {
    if (typeof analytics !== 'undefined') {
      analytics('event', 'Press material', {
        event_category: '2022-ldc_report',
        event_label: name,
        transport_type: 'beacon'
      });
    }
  };
  return (
    <>
      <div className="footer_container">
        <h2>What do you want to do next?</h2>
        <div className="download_button anchor_downloads"><a href="#1">Download the report</a></div>
        <div className="footer_elements">
          <div className="footer_element footer_element_1">
            <div className="footer_content anchor_video">
              <h3>Watch the video</h3>
              <div className="iframe_container youtube_iframe">
                <iframe src="" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
              <ul>
                <li>
                  <a href="#1" target="_blank" rel="noreferrer">Français</a>
                  {', '}
                  <a href="#1" target="_blank" rel="noreferrer">Español</a>
                  {', '}
                  <a href="#1" target="_blank" rel="noreferrer">العربية</a>
                  {', '}
                  <a href="#1" target="_blank" rel="noreferrer">简体中文</a>
                  {', '}
                  <a href="#1" target="_blank" rel="noreferrer">Русский</a>
                  {', '}
                  <a href="#1" target="_blank" rel="noreferrer">Português</a>
                </li>
              </ul>
            </div>
            <div className="footer_content anchor_podcasts">
              <h3>Podcast</h3>
              <p>Listen to the Weekly Tradecast episodes that explore some of the main issues in the report</p>
              <div className="iframe_container">
                <iframe title="The Weekly Tradecast" height="150" width="100%" style={{ border: 'none', minWidth: 'min(100%, 430px)' }} scrolling="no" data-name="pb-iframe-player" src="" allowFullScreen />
              </div>
            </div>
          </div>
          <div className="footer_element footer_element_2">
            <div className="footer_content anchor_press">
              <h3>Press material</h3>
              <ul>
                <li>
                  <h4>Press conference</h4>
                  <div className="iframe_container youtube_iframe">
                    <iframe src="" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </div>
                  <ul>
                    <li><a href="#1" target="_blank" rel="noreferrer">Download the press conference</a></li>
                  </ul>
                </li>
              </ul>
              <ul>
                <li>
                  <h4>Download the report video</h4>
                  <ul>
                    <li>
                      <a href="#1" target="_blank" rel="noreferrer">English</a>
                      {', '}
                      <a href="#1" target="_blank" rel="noreferrer">Français</a>
                      {', '}
                      <a href="#1" target="_blank" rel="noreferrer">Español</a>
                      {', '}
                      <a href="#1" target="_blank" rel="noreferrer">العربية</a>
                      {', '}
                      <a href="#1" target="_blank" rel="noreferrer">简体中文</a>
                      {', '}
                      <a href="#1" target="_blank" rel="noreferrer">Русский</a>
                      {', '}
                      <a href="#1" target="_blank" rel="noreferrer">Português</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <h4>Read the global press release</h4>
                  <ul>
                    <li>
                      <a href="#1" onClick={(event) => track(event.target.href)}>English</a>
                      {', '}
                      <a href="#1" onClick={(event) => track(event.target.href)}>Français</a>
                      {', '}
                      <a href="#1" onClick={(event) => track(event.target.href)}>Español</a>
                      {', '}
                      <a href="#1" onClick={(event) => track(event.target.href)}>العربية</a>
                      {', '}
                      <a href="#1" onClick={(event) => track(event.target.href)}>简体中文</a>
                      {', '}
                      <a href="#1" onClick={(event) => track(event.target.href)}>Русский</a>
                      {', '}
                      <a href="#1" onClick={(event) => track(event.target.href)}>Português</a>
                    </li>
                  </ul>
                </li>
              </ul>
              <h4><a href="#1">Download the report</a></h4>
              <div><a href="#1"><img src={`${window.location.href.includes('unctad') ? 'https://storage.unctad.org/2022-ldc_report/' : './'}assets/img/`} alt="RMT 2022 Cover" /></a></div>
            </div>
          </div>
        </div>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </>
  );
}

export default memo(Footer);
