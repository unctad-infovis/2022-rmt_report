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

import Figure10 from './Figure10.jsx';
import Figure07 from './Figure07.jsx';
import Figure01 from './Figure01.jsx';

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
                  The UN Conference on Trade and Development (UNCTAD) in its flagship “Review of Maritime Transport 2022” has called for increased investment in maritime supply chains. Ports, shipping fleets and hinterland connections need to be better prepared for future global crises, climate change and the transition to low-carbon energy.
                  <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                </p>
              )}
            </IsVisible>
            <IsVisible once>
              {(isVisible) => (
                <p className="ingress">
                  hips carry over 80% of the goods traded globally, with the percentage even higher for most developing countries, hence the urgent need to boost resilience to shocks that disrupt supply chains, fuel inflation and affect the poorest the most.
                  <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                </p>
              )}
            </IsVisible>
          </div>
        </div>
        <div className="right_column">
          <Quote author_name="Rebeca Grynspan" author_title="UNCTAD Secretary-General" first_line="We must not delay the decarbonization of shipping" second_line="We need to learn from the current supply chain crisis and prepare better for future challenges and transitions. This includes enhancing intermodal infrastructure, fleet renewal and improving port performance and trade facilitation" />
        </div>
      </div>
      <div className="section_wrapper">
        <ProgressIndicator appRef={appRef} section1Progress={section1Progress} section2Progress={section2Progress} section3Progress={section3Progress} section4Progress={section4Progress} section5Progress={section5Progress} />
        {/* Section 1 */}
        <div ref={section1} className="section_1_container">
          <PhotoHeadline img="2022-rmt_report_section-min.jpg" max_width={560} text_upper="Investment is needed in maritime" text_lower="transport systems to strengthen global supply chains" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <p>Logistics supply constraints combined with a surge in demand for consumer goods and e-commerce pushed container spot freight rates to five times their pre-pandemic levels in 2021, reaching a historical peak in early 2022 and sharply increasing consumer prices. The rates have dropped since mid-2022 but they remain high for oil and natural gas tanker cargo due to the ongoing energy crisis.</p>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <p>Dry bulk freight rates increased due to the war in Ukraine and related economic measures, as well as the prolonged COVID-19 pandemic and supply chain disruptions. An UNCTAD simulation projects that higher grain prices and dry bulk freight rates can lead to a 1.2% increase in consumer food prices (Figure 7), with higher increases in middle- and low-income countries</p>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <p>“If there is one thing we have learned from the crisis of the last two years it is that ports and shipping greatly matter for a well-functioning global economy,” said Shamika N. Sirimanne, director of UNCTAD’s technology and logistics division. “Higher freight rates have led to surging consumer prices, especially for the most vulnerable. Interrupted supply chains led to lay-offs and food insecurity.”</p>
                <p>UNCTAD calls on countries to carefully assess potential changes in shipping demand, develop and upgrade port infrastructure and hinterland connections while involving the private sector. They should also bolster port connectivity, expand storage and warehousing space and capabilities, minimize labour and equipment shortages.</p>
                <p>Many supply chain disruptions can also be eased through trade facilitation, notably through digitalization, which cuts waiting and clearance times in ports and speeds up documentary processes through e-documents and electronic payments.</p>
              </div>
            </div>
            <div className="right_column">
              <Figure10 />
              <Recommendations headline="UNCTAD calls on" recommendation_list={['1', '2', '3']} />
            </div>
          </div>
        </div>
        {/* Section 2 */}
        <div ref={section2} className="section_2_container">
          <PhotoHeadline img="2022-rmt_report_section-min.jpg" max_width={560} text_upper="More investment required to cut" text_lower="carbon footprint of maritime transport " />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      The report shows that between 2020 and 2021 total carbon emissions from the world maritime fleet increased by 4.7%, with most of the increases coming from container ships, dry bulk and general cargo vessels.
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      The report also raises concern over the increasing average age of ships. By number of ships, the current average age is 21.9 years, and by carrying capacity 11.5 years. Ships are ageing partly due to uncertainty about future technological developments and the most cost-efficient fuels, as well as about changing regulations and carbon prices.
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <p>Investments in new ships that reduce greenhouse gas emissions will be hampered by surging borrowing costs, a darkened economic outlook and regulatory uncertainties. </p>
                <p>UNCTAD calls for more investment in technical and operational improvements to cut the carbon footprint of maritime transport. These include switching to alternative, low or zero-carbon fuels, optimizing operations, using on-shore electricity when in ports and equipping vessels with energy-efficient technology. </p>
                <p>The report also calls for a predictable global regulatory framework for investing in decarbonization and increased support for developing countries in the energy transition. It further underlines the urgent need to adapt ports to the impacts of climate change, especially in the most vulnerable nations. </p>
                <p>UNCTAD urges the international community to ensure countries that are most negatively affected by climate change – and have contributed the least to its causes – are not negatively affected by climate mitigation efforts in maritime transport.</p>
              </div>
            </div>
            <div className="right_column">
              <Figure07 />
              <Recommendations headline="UNCTAD calls on" recommendation_list={['1', '2', '3']} />
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div ref={section3} className="section_3_container">
          <PhotoHeadline img="2022-rmt_report_section-min.jpg" max_width={560} text_upper="Measures to protect competition " text_lower="needed in the face of market consolidation" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      The report says the container shipping sector has been transformed by horizontal consolidation through mergers and acquisitions. Shipping carriers have also pursued vertical integration by investing in terminal operations and other logistics services.
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      Between 1996 and 2022, the top 20 carriers increased their share of container-carrying capacity from 48% to 91%. And over the past five years, the four largest carriers increased their market shares to control more than half of the global capacity (Figure 10).
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <p>The number of companies that provide services to importers and exporters fell in 110 countries, notably in small island developing states, where at times a duopoly of just two carriers dropped to a monopoly of one.  </p>
                <p>Market consolidation results in reduced competition, constrained supply, and can lead to market power abuse and higher rates and prices for consumers. </p>
                <p>Ship oversizing also raises concern. Between 2006 and 2022, the size of the world’s largest container ships more than doubled from 9,380 twenty-foot equivalent unit (TEU) to 23,992 TEU. The size of the largest ship in each country almost tripled, thus ships grew faster than the volumes of cargo to fill them.  </p>
                <p>
                  UNCTAD calls on competition and port authorities to work together respond to industry consolidation with measures to protect competition. The report urges stronger international cooperation on cross-border, anticompetitive practices in maritime transport, based on the
                  <a href="https://unctad.org/topic/competition-and-consumer-protection/the-united-nations-set-of-principles-on-competition">UN Set of Competition Rules and Principles</a>
                  .
                </p>
              </div>
            </div>
            <div className="right_column">
              <Figure01 />
              <Recommendations headline="UNCTAD calls on" recommendation_list={['1', '2', '3']} />
            </div>
          </div>
        </div>
        {/* Section 4 */}
        <div ref={section4} className="section_4_container">
          <PhotoHeadline img="2022-rmt_report_section-min.jpg" max_width={560} text_upper="Global maritime" text_lower="trade expected to slow " />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      According to the report, international maritime trade bounced back significantly in 2021 with an estimated growth of 3.2% and overall shipments of 11 billion tons (Figure 1). This is an improvement of 7 percentage points compared to the 3.8% decline in 2020.
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Highlight</span>
                    </p>
                  )}
                </IsVisible>
                <p>Africa’s maritime trade in 2021 increased by 5.6% over 2020.  </p>
                <p>AFRICA MARITIME TRADE FIGURES  </p>
                <p>Asia remained the world’s leading maritime cargo handling centre in 2021, accounting for 42% of exports and 64% imports.  </p>
                <p>ASIA MARITIME TRADE FIGURES  </p>
                <p>Latin America and the Caribbean saw a 3% increase in maritime trade in 2021.  </p>
                <p>LATIN AMERICA AND THE CARIBBEAN MARITIME TRADE FIGURES  </p>
                <p>For 2022, UNCTAD projects global maritime trade growth to moderate to 1.4%. And for the period 2023–2027, it is expected to expand at an annual average of 2.1%, a slower rate than the previous three-decade average of 3.3%.  </p>
                <p>The report and its online annexes provide an extensive collection of statistics from maritime trade and an analysis of structural and cyclical changes affecting seaborne trade, ports and shipping.</p>
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
