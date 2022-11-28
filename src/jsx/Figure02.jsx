import React, { useState, useEffect, memo } from 'react';
import '../styles/styles.less';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

function Figure02() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => {
      const tmp = val.split(' ');
      return {
        date: Date.UTC(parseInt(tmp[1], 10), (tmp[0] === 'S1') ? 0 : 5, 1),
        semester: tmp[0]
      };
    });
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, j) => ({
        semester: labels[j].semester,
        x: labels[j].date,
        y: e
      })),
      name: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-rmt_report/' : './'}assets/data/2022-rmt_report_figure_02.csv`;
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
        chart_height={600}
        data={dataFigure}
        data_decimals={0}
        idx="02"
        line_width={4}
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
            text: 'COVID-19',
            y: -10
          },
          zIndex: 4,
          value: Date.UTC(2020, 0, 1),
          width: 0
        }]}
        note="Ships of 1,000 GT and above, not including passenger ships and roll-on/roll-off vessels."
        show_only_first_and_last_labels
        source="UNCTAD, based on data provided by MarineTraffic."
        subtitle="Port calls per half year, world total, first semester 2019–first semester 2022"
        suffix=""
        title="The roller-coaster of global port traffic"
        title_margin={50}
        ylabel="Year"
        tooltip_date_interval="semester"
        tooltip_label=""
        ymax={2400000}
        ymin={1800000}
        ytick_interval={100000}
      />
      )}
    </div>
  );
}

export default memo(Figure02);
