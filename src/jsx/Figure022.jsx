import React, { useState, useEffect, memo } from 'react';
import '../styles/styles.less';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

function Figure022() {
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
      name: el.Name
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-rmt_report/' : './'}assets/data/2022-rmt_report_figure_022.csv`;
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
        chart_height={550}
        data={dataFigure}
        data_decimals={1}
        idx="022"
        line_width={4}
        note="Propelled seagoing vessels of 100 gross tons and above, as of 1 January 2022."
        show_only_first_and_last_labels
        source="UNCTAD calculations, based on data from Clarksons Research."
        subtitle="Average age of merchant fleet, 2011–2022"
        suffix=" years"
        title="Average age of vessels was in decline but is now growing slowly"
        ylabel=""
        ymax={25}
        ymin={10}
        ytick_interval={5}
      />
      )}
    </div>
  );
}

export default memo(Figure022);
