import React, {
  useState, useEffect, useCallback, useRef, useMemo, memo
} from 'react';
import PropTypes from 'prop-types';

import '../../styles/map_container.less';

// https://github.com/topojson/topojson
import * as topojson from 'topojson-client';

// https://d3js.org/
import * as d3 from 'd3';

import Versor from '../helpers/Versor.js';

function Map({ appID }) {
  // const countries = useMemo(() => ({
  //   '024': 'Angola', 204: 'Benin', 854: 'Burkina Faso', 108: 'Burundi', 140: 'Central African Republic', 148: 'Chad', 174: 'Comoros', 180: 'Congo, Dem. Rep. of the', 262: 'Djibouti', 232: 'Eritrea', 231: 'Ethiopia', 270: 'Gambia', 324: 'Guinea', 624: 'Guinea-Bissau', 426: 'Lesotho', 430: 'Liberia', 450: 'Madagascar', 454: 'Malawi', 466: 'Mali', 478: 'Mauritania', 508: 'Mozambique', 562: 'Niger', 646: 'Rwanda', 678: 'Sao Tome and Principe', 686: 'Senegal', 694: 'Sierra Leone', 706: 'Somalia', 728: 'South Sudan', 729: 'Sudan', 768: 'Togo', 800: 'Uganda', 834: 'Tanzania, United Republic of', 894: 'Zambia', '004': 'Afghanistan', '050': 'Bangladesh', '064': 'Bhutan', 116: 'Cambodia', 418: 'Lao People\'s Dem. Rep.', 104: 'Myanmar', 524: 'Nepal', 626: 'Timor-Leste', 887: 'Yemen', 296: 'Kiribati', '090': 'Solomon Islands', 798: 'Tuvalu', 332: 'Haiti'
  // }), []);

  const [currentLocation, setCurrentLocation] = useState(0);
  const coordinates = useMemo(() => [{
    countries: ['024', '204', '854', '108', '140', '148', '174', '180', '262', '232', '231', '270', '324', '624', '426', '430', '450', '454', '466', '478', '508', '562', '646', '678', '686', '694', '706', '728', '729', '768', '800', '834', '894'],
    countries_small: ['678', '426', '174'],
    lat: 20,
    lng: 7
  }, {
    countries: ['004', '050', '064', '116', '418', '104', '524', '626', '887'],
    countries_small: ['626'],
    lat: 20,
    lng: 70
  }, {
    countries: ['296', '090', '798'],
    countries_small: ['296', '090', '798'],
    lat: 0,
    lng: 160
  }, {
    countries: ['332'],
    countries_small: ['332'],
    lat: 25,
    lng: -73
  }], []);

  const width = (appID === '#app-root-2022-ldc_report') ? 500 : 800;
  const height = (appID === '#app-root-2022-ldc_report') ? 500 : 800;

  const interval = useRef();
  const projection = useRef(d3.geoOrthographic().fitExtent([[0, 0], [width, height]], { type: 'Sphere' }));
  const path = d3.geoPath().projection(projection.current);
  const svg = useRef();
  const g = useRef();

  useEffect(() => {
    svg.current = d3.select(`${appID} .map_container`).append('svg').attr('width', width).attr('height', height);
    g.current = svg.current.append('g');
    interval.current = setInterval(() => {
      setCurrentLocation((cur) => cur + 1);
    }, 7000);
  }, [appID, interval, height, width]);

  const getAreaFill = useCallback((d) => ((coordinates[currentLocation].countries.includes(d.properties.code)) ? 'rgba(114, 191, 68, 1)' : '#eee'), [coordinates, currentLocation]);
  const getCircleFill = useCallback((d) => ((coordinates[currentLocation].countries_small.includes(d.properties.code)) ? 'rgba(114, 191, 68, 1)' : 'transparent'), [coordinates, currentLocation]);
  const getCircleStroke = useCallback((d) => ((coordinates[currentLocation].countries_small.includes(d.properties.code)) ? '#fff' : 'transparent'), [coordinates, currentLocation]);

  const p2 = useRef([0, 0]);
  const r2 = useRef([0, 0, 0]);
  const changeLocation = useCallback(() => {
    const tilt = 20;
    if (coordinates[currentLocation]) {
      p2.current = [coordinates[currentLocation].lng, coordinates[currentLocation].lat];
      const r1 = r2.current;
      r2.current = [-p2.current[0], tilt - p2.current[1], 0];
      const iv = Versor.interpolateAngles(r1, r2.current);
      d3.transition(appID).duration(1000).tween('tween', () => t => {
        projection.current.rotate(iv(t.toFixed(2)));
        g.current.selectAll('text').attr('visibility', 'hidden');
        g.current.selectAll('circle').attr('visibility', 'hidden');
        g.current.selectAll('path').attr('d', path).attr('fill', '#eee');
      }).on('end', () => {
        g.current.selectAll('path').attr('fill', d => getAreaFill(d));
        g.current.selectAll('circle')
          .attr('visibility', (d) => {
            const visible = coordinates[currentLocation].countries.includes(d.properties.code);
            return visible ? 'visible' : 'hidden';
          })
          .attr('cx', (d) => projection.current(d3.geoCentroid(d))[0])
          .attr('cy', (d) => projection.current(d3.geoCentroid(d))[1])
          .attr('fill', (d) => getCircleFill(d))
          .attr('stroke', (d) => getCircleStroke(d));
        // g.current.selectAll('text')
        //   .attr('visibility', (d) => {
        //     const visible = coordinates[currentLocation].countries.includes(d.properties.code);
        //     return visible ? 'visible' : 'hidden';
        //   })
        //   .attr('x', (d) => projection.current(d3.geoCentroid(d))[0])
        //   .attr('y', (d) => projection.current(d3.geoCentroid(d))[1]);
      });
    } else {
      setCurrentLocation(0);
    }
  }, [appID, coordinates, currentLocation, getAreaFill, getCircleFill, getCircleStroke, p2, r2, path, projection]);

  const drawMap = useCallback(() => {
    d3.json(`${window.location.href.includes('unctad.org') ? 'https://storage.unctad.org/2022-ldc_report/' : './'}assets/data/2022-ldc_report_world_map.topojson`).then((topology) => {
      g.current.selectAll('path').data(topojson.feature(topology, topology.objects.features).features)
      // g.current.selectAll('path').data(topology.features)
        .enter().append('path')
        .attr('d', path)
        .attr('class', 'path')
        .style('stroke', '#f1f1f1')
        .style('stroke-width', '0.5px')
        .attr('fill', '#eee');
      // g.current.selectAll('text').data(topology.features)
      //   .enter().append('text')
      //   .attr('visibility', 'hidden')
      //   .attr('class', 'map_text')
      //   .text((d) => countries[d.properties.code]);
      g.current.selectAll('circle').data(topojson.feature(topology, topology.objects.features).features)
      // g.current.selectAll('circle').data(topology.features)
        .enter().append('circle')
        .attr('fill', 'transparent')
        .attr('stroke-width', '1px')
        .attr('stroke', '#fff')
        .attr('visibility', 'hidden')
        .attr('r', 5);
    });
  }, [path]);

  useEffect(() => {
    drawMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    changeLocation();
  }, [changeLocation, currentLocation]);

  return (
    <div className="map_bg" style={appID === '#app-root-2022-ldc_report_figure_globe' ? { width: 800, height: 800 } : {}}>
      <div className="map_container" />
    </div>
  );
}

Map.propTypes = {
  appID: PropTypes.string
};
Map.defaultProps = {
  appID: '#app-root-2022-ldc_report_figure_globe'
};

export default memo(Map);
