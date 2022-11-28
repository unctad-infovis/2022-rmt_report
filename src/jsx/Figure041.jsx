import React, { useState, useEffect } from 'react';

import { transpose } from 'csv-transpose';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartBar from './components/ChartBar.jsx';

function Figure041() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map(el => {
    const labels = Object.keys(el).filter(val => val !== 'Name');
    const values = Object.values(el).map(val => parseFloat(val) * 24).filter(val => !Number.isNaN(val));
    return {
      data: values.map((e, j) => ({
        color: (labels[j] === 'World') ? '#004987' : '#009edb',
        name: labels[j],
        y: e,
      })),
      name: el.Name
    };
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-rmt_report/' : './'}assets/data/2022-rmt_report_figure_041.csv`;
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
      <ChartBar
        data={dataFigure}
        data_decimals={1}
        idx="041"
        labels_align="right"
        labels_inside
        note="Ships of 1,000GT and above."
        source="UNCTAD, based on data provided by MarineTraffic"
        subtitle="Median time in port in hours, first semester 2022, top 20 countries in terms of number of container ship arrivals."
        title="Port performance: Big differences among top countries"
        ylabel="Hours in port"
        xlabelrotation={0}
        ymax={50}
        ymin={0}
      />
      )}
    </div>
  );
}

export default Figure041;
