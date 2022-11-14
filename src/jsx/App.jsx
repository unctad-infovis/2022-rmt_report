import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.less';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import IsVisible from 'react-is-visible';

// https://www.npmjs.com/package/scroll-into-view
import scrollIntoView from 'scroll-into-view';

import Video from './components/Video.jsx';
import PageNavigation from './components/PageNavigation.jsx';
import Quote from './components/Quote.jsx';
import ProgressIndicator from './components/ProgressIndicator.jsx';
import PhotoHeadline from './components/PhotoHeadline.jsx';
import Recommendations from './components/Recommendations.jsx';
import Footer from './components/Footer.jsx';

// const appID = '#app-root-2022-rmt_report';

const analytics = window.gtag || undefined;

function App() {
  const appRef = useRef();
  const section1 = useRef();
  const section2 = useRef();
  const section3 = useRef();
  const section4 = useRef();
  const section5 = useRef();

  const [section1Seen, setSection1Seen] = useState(false);
  const [section2Seen, setSection2Seen] = useState(false);
  const [section3Seen, setSection3Seen] = useState(false);
  const [section4Seen, setSection4Seen] = useState(false);
  const [section5Seen, setSection5Seen] = useState(false);

  const [section1Progress, setSection1Progress] = useState(0);
  const [section2Progress, setSection2Progress] = useState(0);
  const [section3Progress, setSection3Progress] = useState(0);
  const [section4Progress, setSection4Progress] = useState(0);
  const [section5Progress, setSection5Progress] = useState(0);

  const [offset, setOffset] = useState(false);
  // Data states.
  // const [data, setData] = useState(false);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const windowHeight = 0;
    setSection1Progress((offset > section1.current.offsetTop - windowHeight) ? (Math.min(((offset - (section1.current.offsetTop - windowHeight)) / section1.current.offsetHeight) * 100, 100)) : 0);
    setSection2Progress((offset > section2.current.offsetTop - windowHeight) ? (Math.min(((offset - (section2.current.offsetTop - windowHeight)) / section2.current.offsetHeight) * 100, 100)) : 0);
    setSection3Progress((offset > section3.current.offsetTop - windowHeight) ? (Math.min(((offset - (section3.current.offsetTop - windowHeight)) / section3.current.offsetHeight) * 100, 100)) : 0);
    setSection4Progress((offset > section4.current.offsetTop - windowHeight) ? (Math.min(((offset - (section3.current.offsetTop - windowHeight)) / section3.current.offsetHeight) * 100, 100)) : 0);
    setSection5Progress((offset > section5.current.offsetTop - windowHeight) ? (Math.min(((offset - (section3.current.offsetTop - windowHeight)) / section3.current.offsetHeight) * 100, 100)) : 0);
  }, [offset]);

  useEffect(() => {
    if (section1Progress === 100 && section1Seen === false) {
      setSection1Seen(true);
      if (typeof analytics !== 'undefined') {
        analytics('event', 'Scroll', { event_category: '2022-rmt_report', event_label: 'Section 1', transport_type: 'beacon' });
      }
    }
  }, [section1Progress, section1Seen]);

  useEffect(() => {
    if (section2Progress === 100 && section2Seen === false) {
      setSection2Seen(true);
      if (typeof analytics !== 'undefined') {
        analytics('event', 'Scroll', { event_category: '2022-rmt_report', event_label: 'Section 2', transport_type: 'beacon' });
      }
    }
  }, [section2Progress, section2Seen]);

  useEffect(() => {
    if (section3Progress === 100 && section3Seen === false) {
      setSection3Seen(true);
      if (typeof analytics !== 'undefined') {
        analytics('event', 'Scroll', { event_category: '2022-rmt_report', event_label: 'Section 3', transport_type: 'beacon' });
      }
    }
  }, [section3Progress, section3Seen]);

  useEffect(() => {
    if (section4Progress === 100 && section4Seen === false) {
      setSection4Seen(true);
      if (typeof analytics !== 'undefined') {
        analytics('event', 'Scroll', { event_category: '2022-rmt_report', event_label: 'Section 4', transport_type: 'beacon' });
      }
    }
  }, [section4Progress, section4Seen]);

  useEffect(() => {
    if (section5Progress === 100 && section5Seen === false) {
      setSection5Seen(true);
      if (typeof analytics !== 'undefined') {
        analytics('event', 'Scroll', { event_category: '2022-rmt_report', event_label: 'Section 5', transport_type: 'beacon' });
      }
    }
  }, [section5Progress, section5Seen]);

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
    <div className="app" ref={appRef}>
      <Video anchorClick={anchorClick} />
      <PageNavigation appRef={appRef} />
      <div className="two_column_layout">
        <div className="left_column">
          <div className="text_container">
            <IsVisible once>
              {(isVisible) => (
                <p className="ingress">
                  <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                </p>
              )}
            </IsVisible>
            <IsVisible once>
              {(isVisible) => (
                <p className="ingress">
                  <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                </p>
              )}
            </IsVisible>
          </div>
        </div>
        <div className="right_column">
          <Quote author_name="Rebeca Grynspan" author_title="UNCTAD Secretary-General" first_line="" second_line="" />
        </div>
      </div>
      <div className="section_wrapper">
        <ProgressIndicator appRef={appRef} section1Progress={section1Progress} section2Progress={section2Progress} section3Progress={section3Progress} section4Progress={section4Progress} section5Progress={section5Progress} />
        {/* Section 1 */}
        <div ref={section1} className="section_1_container">
          <PhotoHeadline img="2022-rmt_report_section-min.jpg" max_width={560} text_upper="Emissions" text_lower="Age of vessels" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
              </div>
            </div>
            <div className="right_column">
              <Recommendations headline="UNCTAD calls on" recommendation_list={['1', '2', '3']} />
            </div>
          </div>
        </div>
        {/* Section 2 */}
        <div ref={section2} className="section_2_container">
          <PhotoHeadline img="2022-rmt_report_section-min.jpg" max_width={560} text_upper="Freight" text_lower="rates" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
              </div>
            </div>
            <div className="right_column">
              <Recommendations headline="UNCTAD calls on" recommendation_list={['1', '2', '3']} />
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div ref={section3} className="section_3_container">
          <PhotoHeadline img="2022-rmt_report_section-min.jpg" max_width={560} text_upper="Ukraine" text_lower="Food prices" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
              </div>
            </div>
            <div className="right_column">
              <Recommendations headline="UNCTAD calls on" recommendation_list={['1', '2', '3']} />
            </div>
          </div>
        </div>
        {/* Section 4 */}
        <div ref={section4} className="section_4_container">
          <PhotoHeadline img="2022-rmt_report_section-min.jpg" max_width={560} text_upper="Port" text_lower="Performance" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
              </div>
            </div>
            <div className="right_column">
              <Recommendations headline="UNCTAD calls on" recommendation_list={['1', '2', '3']} />
            </div>
          </div>
        </div>
        {/* Section 5 */}
        <div ref={section5} className="section_5_container">
          <PhotoHeadline img="2022-rmt_report_section-min.jpg" max_width={560} text_upper="Competition" text_lower="Monopoly" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
              </div>
            </div>
            <div className="right_column">
              <Recommendations headline="UNCTAD calls on" recommendation_list={['1', '2', '3']} />
            </div>
          </div>
        </div>
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
      <Footer />
    </div>
  );
}

export default App;
