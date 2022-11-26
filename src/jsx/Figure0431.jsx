import React, { useState, useEffect, memo } from 'react';
import '../styles/styles.less';

import { transpose } from 'csv-transpose';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

function Figure0431() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val.split('-')[0], 10), (parseInt(val.split('-')[1], 10) - 1), parseInt(val.split('-')[2], 10)));
    const values = Object.values(el).map(val => (parseFloat(val) / 1000000)).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, j) => ({
        x: labels[j],
        y: e,
      })),
      name: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-rmt_report/' : './'}assets/data/2022-rmt_report_figure_0431.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(transpose(body)))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        data={dataFigure}
        data_decimals={0}
        idx="0431"
        line_width={4}
        note="CO2 emissions from vessels spesific calculated bunker fuel from AIS."
        show_only_first_and_last_labels
        source="UNCTAD, based on data provided by Marine Benchmark."
        subtitle="Total CO2 emissions of world fleet, annualized monthly, January 2012 – April 2022, million tons"
        tooltip_date_interval="month"
        suffix=""
        title="Overall CO2 emissions from vessels are rising"
        tooltip_label=""
        ylabel=""
        ymax={900}
        ymin={400}
        ytick_interval={100}
      />
      )}
    </div>
  );
}

export default memo(Figure0431);
