import React, { useState, useEffect, memo } from 'react';
import '../styles/styles.less';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartStackedColumn from './components/ChartStackedColumn.jsx';

function Figure07() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map(el => ({
    data: Object.values(el).map(val => parseFloat(val)).filter(val => !Number.isNaN(val)),
    labels: Object.keys(el).filter(val => val !== 'Name'),
    name: el.Name
  }));

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-rmt_report/' : './'}assets/data/2022-rmt_report_figure_07.csv`;
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
      <ChartStackedColumn
        data={dataFigure}
        data_decimals={2}
        export_title_margin={10}
        idx="07"
        note=""
        source="UNCTAD calculations based on data provided by Clarksons Research, Shipping Intelligence Network, the IMF, International Financial Statistics, Direction of Trade Statistics and Consumer Price Index, UNCTADstat, and the World Bank, World Integrated Trade Solution, Commodity Price Data (The Pink Sheet) and A Global Database of Inflation."
        subtitle="Impact of higher dry bulk freight rates and global grain prices on consumer food prices based on a simulation covering two years, percentage change"
        suffix="%"
        title="Higher freight rates and grain prices hit countries differently"
        xlabelrotation={0}
        ymax={1.6}
        ymin={0}
      />
      )}
    </div>
  );
}

export default memo(Figure07);
