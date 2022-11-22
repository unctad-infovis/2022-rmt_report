import React, { useState, useEffect, memo } from 'react';
import '../styles/styles.less';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

function Figure01() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val, 10), 0, 1));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, j) => ({
        x: labels[j],
        y: e,
      })),
      name: el.Name,
      zoneAxis: 'x',
      zones: [{
        value: Date.UTC(2022, 0, 1)
      }, {
        dashStyle: 'shortdot'
      }]
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-rmt_report/' : './'}assets/data/2022-rmt_report_figure_01.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        change
        data={dataFigure}
        data_decimals={1}
        idx="01"
        note="Data for 2022 are projections and for 2023 to 2027 are forecasts."
        plot_lines={[{
          color: '#aaa096',
          label: {
            align: 'center',
            style: {
              color: 'rgba(0, 0, 0, 0.8)',
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: 700,
              textOutline: '2px solid #fff'
            },
            rotation: 0,
            verticalAlign: 'bottom',
            text: 'Global financial crisis',
            y: -5
          },
          zIndex: 4,
          value: Date.UTC(2009, 0, 1),
          width: 0
        }, {
          color: '#aaa096',
          label: {
            align: 'center',
            style: {
              color: 'rgba(0, 0, 0, 0.8)',
              fontFamily: 'Roboto',
              fontSize: '16px',
              fontWeight: 700,
              textOutline: '2px solid #fff'
            },
            rotation: 0,
            verticalAlign: 'bottom',
            text: 'COVID-19',
            y: -5
          },
          zIndex: 4,
          value: Date.UTC(2020, 0, 1),
          width: 0
        }]}
        source="UNCTAD secretariat, based on UNCTADstat data and Review of Maritime Transport, various issues."
        subtitle="International maritime trade, percentage annual change"
        line_width={3}
        show_only_first_and_last_labels={false}
        suffix="%"
        title="Maritime trade recovered in 2021 but is projected to slow down"
        ylabel=""
        ymax={10}
        ymin={-6}
        ytick_interval={2}
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default memo(Figure01);
