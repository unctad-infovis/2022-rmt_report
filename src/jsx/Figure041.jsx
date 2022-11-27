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
    <div>
      {dataFigure && (
      <ChartBar
        data={dataFigure}
        data_decimals={1}
        idx="041"
        note="Ships of 1,000GT and above."
        source="UNCTAD, based on data provided by MarineTraffic"
        subtitle="Median time in port in hours, S1 2022, container ships"
        title="There is a big variaty in port performance"
        ylabel="Hours"
        xlabelrotation={0}
        ymax={48}
        ymin={0}
      />
      )}
    </div>
  );
}

export default Figure041;
