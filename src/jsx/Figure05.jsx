import React, { useState, useEffect } from 'react';

import { transpose } from 'csv-transpose';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartBar from './components/ChartBar.jsx';

function Figure05() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map(el => {
    const labels = Object.keys(el).filter(val => val !== 'Name');
    const values = Object.values(el).map(val => parseFloat(val)).filter(val => !Number.isNaN(val));
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
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-rmt_report/' : './'}assets/data/2022-rmt_report_figure_05.csv`;
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
        chart_height={600}
        data={dataFigure}
        data_decimals={1}
        idx="05"
        labels_align="left"
        labels_inside
        note=""
        prefix=""
        source="UNCTAD, based on data provided by MDS Transmodal."
        subtitle="Changes in number of direct calls by region, third quarter 2020–second quarter 2022, per cent"
        title="Port traffic fell in all regions, but some suffered more"
        xlabelrotation={0}
        ylabel="Change"
        ytick_interval={2}
        ymax={0}
        ymin={-16}
      />
      )}
    </div>
  );
}

export default Figure05;
