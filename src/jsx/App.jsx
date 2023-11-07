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

import Figure01 from './Figure01.jsx';
import Figure02 from './Figure02.jsx';
import Figure022 from './Figure022.jsx';
import Figure032 from './Figure032.jsx';
import Figure041 from './Figure041.jsx';
import Figure0431 from './Figure0431.jsx';
import Figure05 from './Figure05.jsx';
import Figure07 from './Figure07.jsx';
import Figure10 from './Figure10.jsx';

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
    setSection4Progress((offset > section4.current.offsetTop - windowHeight) ? (Math.min(((offset - (section4.current.offsetTop - windowHeight)) / section4.current.offsetHeight) * 100, 100)) : 0);
    setSection5Progress((offset > section5.current.offsetTop - windowHeight) ? (Math.min(((offset - (section5.current.offsetTop - windowHeight)) / section5.current.offsetHeight) * 100, 100)) : 0);
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
        event_category: '2022-rmt_report',
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
          topOffset: 30
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
      <div className="download_button"><a href="https://unctad.org/rmt2023">See the Review of Maritime Transport 2023</a></div>
      <div className="two_column_layout center">
        <div className="left_column">
          <div className="text_container">
            <p className="ingress">
              COVID-19, the war in Ukraine, climate change and geopolitics have wreaked havoc on maritime transport and logistics, clogging some ports and closing others, reconfiguring routes, extending delays and pushing up shipping costs.
            </p>
            <IsVisible once>
              {(isVisible) => (
                <p className="ingress">
                  Ships deliver over 80% of world trade, so disruptions in ports and on shipping lanes mean food, energy, medicine and other essential items don’t reach those in need.
                  {' '}
                  <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Businesses are left without supplies. And prices for producers and consumers soar.</span>
                </p>
              )}
            </IsVisible>
            <IsVisible once>
              {(isVisible) => (
                <p className="ingress">
                  Although delays have improved and dry cargo rates are coming down, maritime transport – and thus world trade – remains vulnerable.
                  {' '}
                  <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>The industry must invest now to shore up its resilience to future crises and climate change.</span>
                </p>
              )}
            </IsVisible>
            <p className="ingress">Ports, shipping companies and transport operators need to expand capacity, renew and expand fleets and equipment, ensure adequate and skilled labour, improve connectivity and performance, reduce emissions and safeguard competition to ensure maritime transport can weather the next storm.</p>
          </div>
        </div>
        <div className="right_column">
          <Quote author_name="Rebeca Grynspan" author_title="UNCTAD Secretary-General" first_line="We must change course and we must do it now" second_line="To prepare for the future, we need shipping and supply chains to be more efficient, more resilient, and far greener." />
        </div>
      </div>
      <div className="section_wrapper">
        <ProgressIndicator appRef={appRef} section1Progress={section1Progress} section2Progress={section2Progress} section3Progress={section3Progress} section4Progress={section4Progress} section5Progress={section5Progress} />
        {/* Section 1 */}
        <div ref={section1} className="section_1_container">
          <PhotoHeadline img="2022-rmt_report_section_1-min.jpg" max_width={560} text_upper="World should prepare for unpredictable future" text_lower="with volatile shipping costs" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      A surge in consumer spending – especially for goods ordered online – combined with supply chain disruptions and logistics constraints
                      {' '}
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>pushed container freight rates to five times their pre-pandemic levels in 2021</span>
                      . The surge in container shipping costs, which peaked in early 2022, sharply increased consumer prices for many goods.
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      Likewise, freight rates for dry bulk – unpackaged raw materials like grains – increased due to the war in Ukraine, the prolonged pandemic and supply chain crisis. An UNCTAD simulation projects that
                      {' '}
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>higher grain prices and dry bulk freight rates can lead to a 1.2% hike in consumer food prices</span>
                      , with higher increases in middle- and low-income countries.
                    </p>
                  )}
                </IsVisible>
                <p>Although freight and charter rates have fallen since mid-2022, they are still above pre-COVID-19 levels. And rates remain high for oil and natural gas tanker cargo due to the ongoing energy crisis. In an increasingly unpredictable operating environment, future shipping costs will likely be higher and more volatile than in the past.</p>
              </div>
              <Figure07 />
            </div>
            <div className="right_column">
              <Figure032 />
              <Recommendations headline="UNCTAD calls for" recommendation_list={['Governments and operators to expand and upgrade port infrastructure and land transport connections, and accelerate trade facilitation reforms, especially digitalization.', 'Port operators and shipping companies to invest in increasing storage facilities and reducing equipment shortages.', 'Shipping companies to invest in sustainable shipping and deploy the necessary ship-carrying capacity.']} />
            </div>
          </div>
        </div>
        {/* Section 2 */}
        <div ref={section2} className="section_2_container">
          <PhotoHeadline img="2022-rmt_report_section_2-min.jpg" max_width={560} text_upper="Urgent need to minimize risks" text_lower="and uncertainties to growth" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      Riding on the surge in demand for containerized cargo,
                      {' '}
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>world maritime trade bounced back in 2021</span>
                      . Shipments grew by an estimated 3.2% to reach 11 billion tons. This represents an improvement of 7 percentage points compared with the 3.8% decline in 2020.
                    </p>
                  )}
                </IsVisible>
                <p>
                  Growth was recorded in all developing regions. It increased by an estimated 5.6% in Africa, 3% in Latin America and the Caribbean and 3%in Asia, which remained the world’s leading maritime cargo handling centre, accounting for 42% of goods loaded and 64% of those unloaded in 2021. Read maritime transport figures for
                  {' '}
                  <a href="https://unctad.org/press-material/unctads-review-maritime-transport-2022-facts-and-figures-africa">Africa</a>
                  ,
                  {' '}
                  <a href="https://unctad.org/press-material/unctads-review-maritime-transport-2022-facts-and-figures-asia-and-pacific">Asia</a>
                  {' '}
                  and
                  {' '}
                  <a href="https://unctad.org/press-material/unctads-review-maritime-transport-2022-facts-and-figures-latin-america-and-caribbean">Latin America and the Caribbean</a>
                  .
                </p>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>But risks and uncertainty remain high.</span>
                      {' '}
                      Globally, inflation and living costs are rising and could dampen consumer spending. A zero-COVID policy in China, the world’s largest exporter, could disrupt manufacturing. And the war in Ukraine continues to impact global food, energy and fertilizer markets.
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>UNCTAD projects global maritime trade will lose steam</span>
                      , with growth slowing to 1.4% in 2022. For the period 2023–2027, it is expected to grow at 2.1% annually – slower than the 3.3% average recorded during the past three decades.
                    </p>
                  )}
                </IsVisible>
                <Figure02 />
              </div>
            </div>
            <div className="right_column">
              <Figure01 />
              <Recommendations headline="UNCTAD calls for" recommendation_list={['The international community to mitigate COVID-19’s impact by providing better access to vaccines and medicines in developing countries.', 'Countries to keep trade flowing by minimizing lockdowns and by avoiding export and import restrictions – especially of food, fertilizers and energy.', 'Countries to promote economic growth, avoid austerity measures, while taming inflation and reducing financial vulnerability.']} />
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div ref={section3} className="section_3_container">
          <PhotoHeadline img="2022-rmt_report_section_3-min.jpg" max_width={580} text_upper="Industry should reduce fleet’s emissions" text_lower="and invest in new ships" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Greenhouse gas emissions from the world’s maritime fleet are heading in the wrong direction.</span>
                      {' '}
                      Between 2020 and 2021, they went up by 4.7%, with most of the increase coming from container ships, dry bulk carriers and general cargo vessels.
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      Like emissions,
                      {' '}
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>the fleet’s average age is also rising – another concern for the environment</span>
                      {' '}
                      since older ships pollute more. By number of ships, the current average age is 21.9 years, and by carrying capacity 11.5 years.
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Ships are getting older partly due to shipowners’ uncertainty</span>
                      {' '}
                      about future technological developments and the most cost-efficient fuels, as well as about changing regulations and carbon prices.
                    </p>
                  )}
                </IsVisible>
                <p>The world needs a new generation of ships that can use the most cost-efficient fuels and integrate seamlessly with smart digital systems. But shipbuilding volumes remain low. The global commercial fleet grew by less than 3% in 2021 – the second lowest rate since 2005.</p>
                <p>Adapting ports and other critical transport infrastructure to the impacts of climate change is a matter of increasing urgency, especially for the most vulnerable countries.</p>
                <Figure0431 />
              </div>
            </div>
            <div className="right_column">
              <Figure022 />
              <Recommendations headline="UNCTAD calls for" recommendation_list={['More investment in energy-efficient shipping technologies and an accelerated shift to alternative, low-carbon fuels to cut the carbon footprint of maritime transport.', 'A predictable global regulatory framework for investing in decarbonization and increased support for developing countries in the energy transition.', 'Stronger support to help developing countries adapt ports to the impacts of climate change, especially in small island developing states.']} />
            </div>
          </div>
        </div>
        {/* Section 4 */}
        <div ref={section4} className="section_4_container">
          <PhotoHeadline img="2022-rmt_report_section_4-min.jpg" max_width={560} text_upper="Countries should improve" text_lower="port performance and connectivity" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <p>The global economy picked up in 2021 and the world’s cargo-carrying ships made more port calls. The rebound continued in the first nine months of 2022 in all segments except container ships, which faced continuing congestion.</p>
                <p>The median turnaround time for container ships, which carry most of the world’s manufactured goods, increased by 13.7% between 2020 and 2021.</p>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>Globally, liner shipping connectivity has also suffered in all regions</span>
                      {' '}
                      since the start of the supply chain crisis – but with variations between countries.
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      In the United States, for example, long-term underinvestment in West Coast port infrastructure weakened performance in handling containers. And
                      {' '}
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>countries in Africa and Latin America and the Caribbean lost more than 10% of direct shipping connections</span>
                      .
                    </p>
                  )}
                </IsVisible>
                <p>Meanwhile, India extended its regional connections by upgrading port capacity. And China, the world’s most connected country, widened its lead.</p>
                <Figure041 />
              </div>
            </div>
            <div className="right_column">
              <Figure05 />
              <Recommendations headline="UNCTAD calls for" recommendation_list={['Stronger support to help developing countries adopt smart maritime logistics and digital technologies, and implement measures to improve port, road and rail connections.', 'Developing countries to improve port performance and productivity, including by upgrading port capacity and strengthening regional transport connections.', 'Port authorities to reduce labour shortages by attracting more women workers and increasing female participation in the sector.  ']} />
              <div className="text_container">
                <h4>Get the data on four key performance indicators</h4>
                <ul>
                  <li><a href="https://unctadstat.unctad.org/datacentre/dataviewer/US.LSCI">Liner Shipping Connectivity Index for all countries, container</a></li>
                  <li><a href="https://unctadstat.unctad.org/datacentre/dataviewer/US.PortCalls_S">Time in port for top 20 countries, six different vessel types</a></li>
                  <li><a href="https://unctadstat.unctad.org/datacentre/dataviewer/US.PLSCI">Port Liner Shipping Connectivity Index for all ports, container</a></li>
                  <li><a href="https://unctadstat.unctad.org/datacentre/dataviewer/US.PortCallsArrivals_S">Port calls for top 20 countries, eight different vessel types</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Section 5 */}
        <div ref={section5} className="section_5_container">
          <PhotoHeadline img="2022-rmt_report_section_5-min.jpg" max_width={560} text_upper="Countries should protect competition" text_lower="and level the playing field" />
          <div className="two_column_layout">
            <div className="left_column">
              <div className="text_container">
                <p>Over the years, mergers and acquisitions have consolidated and transformed the container shipping sector, which carries most consumer goods. Carriers have also pursued vertical integration by investing in terminal operations and other logistics services.</p>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      Over the last 25 years,
                      {' '}
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>the top 20 carriers have almost doubled their market share from 48% to 91%</span>
                      . And the four largest carriers now control more than half of the global container shipping capacity.
                    </p>
                  )}
                </IsVisible>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      Consequently,
                      {' '}
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>the number of companies that provide services to importers and exporters have fallen in 110 countries</span>
                      , notably in small island developing states, where at times a duopoly of just two carriers dropped to a monopoly of one.
                    </p>
                  )}
                </IsVisible>
                <p>Integration has given carriers and their alliances stronger negotiating and bargaining positions vis-à-vis port authorities, as they now have two seats at the table – as both tenants of terminals and providers of shipping services.</p>
                <IsVisible once>
                  {(isVisible) => (
                    <p>
                      Consolidation in the shipping market reduces competition and constrains supply.
                      {' '}
                      <span className={`highlight ${(isVisible) ? 'visible' : ''}`}>It can lead to market power abuse, higher shipping costs</span>
                      {' '}
                      for businesses and thus higher prices for consumers.
                    </p>
                  )}
                </IsVisible>
              </div>
            </div>
            <div className="right_column">
              <Figure10 />
            </div>
          </div>
          <Recommendations headline="UNCTAD calls for" recommendation_list={['Competition and port authorities to work together to monitor freight rates and charges and respond to industry consolidation with measures to protect competition.', 'Stronger international cooperation on cross-border, anticompetitive practices in maritime transport, based on the UN Set of Competition Rules and Principles.', 'Governments to monitor trends in maritime industry structures and services to ensure level playing fields, especially for smaller shippers in developing countries.']} />
        </div>
      </div>
      <Footer />
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
