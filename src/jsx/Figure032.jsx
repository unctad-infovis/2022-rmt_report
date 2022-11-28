import React, { useState, useEffect, memo } from 'react';
import '../styles/styles.less';

import { transpose } from 'csv-transpose';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

function Figure032() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val.split('-')[0], 10), (parseInt(val.split('-')[1], 10) - 1), parseInt(val.split('-')[2], 10)));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, j) => ({
        x: labels[j],
        y: e,
      })),
      name: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-rmt_report/' : './'}assets/data/2022-rmt_report_figure_032.csv`;
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
        data_decimals={1}
        idx="032"
        line_width={4}
        note=""
        show_only_first_and_last_labels={false}
        source="UNCTAD, based on data from Clarksons Shippping Intelligence Network."
        subtitle="Shanghai Containerized Freight Index, US dollars per container per shipment, Jan 2018 – Nov 2022 "
        suffix=""
        title="The volatile ride of shipping costs"
        tooltip_date_interval="day"
        tooltip_label=""
        ylabel=""
        ymax={5500}
        ymin={0}
        ytick_interval={1000}
      />
      )}
    </div>
  );
}

export default memo(Figure032);
