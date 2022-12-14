import React, {
  useEffect, useCallback, useRef, useMemo, memo
} from 'react';
import PropTypes from 'prop-types';

// https://www.highcharts.com/
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

// Load helpers.
import roundNr from '../helpers/RoundNr.js';
import formatNr from '../helpers/FormatNr.js';

highchartsAccessibility(Highcharts);
highchartsExporting(Highcharts);
highchartsExportData(Highcharts);

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    downloadCSV: 'Download CSV data',
    thousandsSep: ','
  }
});
Highcharts.SVGRenderer.prototype.symbols.download = (x, y, w, h) => {
  const path = [
    // Arrow stem
    'M', x + w * 0.5, y,
    'L', x + w * 0.5, y + h * 0.7,
    // Arrow head
    'M', x + w * 0.3, y + h * 0.5,
    'L', x + w * 0.5, y + h * 0.7,
    'L', x + w * 0.7, y + h * 0.5,
    // Box
    'M', x, y + h * 0.9,
    'L', x, y + h,
    'L', x + w, y + h,
    'L', x + w, y + h * 0.9
  ];
  return path;
};

function LineChart({
  allow_decimals, change, chart_height, data, data_decimals, idx, line_width, note, plot_lines, prefix, show_only_first_and_last_labels, source, subtitle, suffix, title, title_margin, tooltip_date_interval, tooltip_label, ymax, ymin, ytick_interval
}) {
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });

  const month_names = useMemo(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], []);

  const createChart = useCallback(() => {
    Highcharts.chart(`chartIdx${idx}`, {
      caption: {
        align: 'left',
        margin: 15,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'Roboto',
          fontSize: '14px'
        },
        text: `<em>Source:</em> ${source} ${note ? (`<br /><em>Note:</em> <span>${note}</span>`) : ''}`,
        useHTML: true,
        verticalAlign: 'bottom',
        x: 0
      },
      chart: {
        events: {
          load() {
            // eslint-disable-next-line react/no-this-in-sfc
            this.renderer.image('https://unctad.org/sites/default/files/2022-11/unctad_logo.svg', 5, 15, 80, 100).add();
            if (show_only_first_and_last_labels === true) {
              setTimeout(() => {
                // eslint-disable-next-line react/no-this-in-sfc
                this.series.forEach((series) => {
                  series.points[series.points.length - 1].update({
                    dataLabels: {
                      enabled: true
                    }
                  });
                  series.points[0].update({
                    dataLabels: {
                      enabled: true
                    }
                  });
                });
              }, 2800);
            }
          }
        },
        height: chart_height,
        resetZoomButton: {
          theme: {
            fill: '#fff',
            r: 0,
            states: {
              hover: {
                fill: '#0077b8',
                stroke: 'transparent',
                style: {
                  color: '#fff',
                  fontFamily: 'Roboto',
                }
              }
            },
            stroke: '#7c7067',
            style: {
              fontFamily: 'Roboto',
              fontSize: '13px',
              fontWeight: 400
            }
          }
        },
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'Roboto',
          fontWeight: 400
        },
        type: 'line',
        zoomType: 'x'
      },
      colors: ['#009edb', '#72bf44'],
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadPDF', 'separator', 'downloadCSV'],
            symbol: 'download',
            symbolFill: '#000'
          }
        }
      },
      legend: {
        align: 'right',
        enabled: (data.length > 1),
        itemDistance: 20,
        itemStyle: {
          color: '#000',
          cursor: 'default',
          fontFamily: 'Roboto',
          fontSize: '14px',
          fontWeight: 400
        },
        layout: 'horizontal',
        verticalAlign: 'top'
      },
      plotOptions: {
        line: {
          animation: {
            duration: 3000,
          },
          cursor: 'pointer',
          dataLabels: {
            allowOverlap: true,
            enabled: false,
            formatter() {
              // eslint-disable-next-line react/no-this-in-sfc
              return `<span style="color: ${this.color}">${roundNr(this.y, data_decimals).toLocaleString('en-US')}${suffix}</div>`;
            },
            style: {
              color: 'rgba(0, 0, 0, 0.8)',
              fontFamily: 'Roboto',
              fontSize: '18px',
              fontWeight: 400,
              textOutline: '2px solid #fff'
            }
          },
          events: {
            legendItemClick() {
              return false;
            },
            mouseOver() {
              return false;
            }
          },
          selected: true,
          lineWidth: line_width,
          marker: {
            enabled: false,
            radius: 0,
            states: {
              hover: {
                animation: false,
                enabled: false,
                radius: 8
              }
            },
            symbol: 'circle'
          },
          states: {
            hover: {
              halo: {
                size: 0
              },
              enabled: false,
              lineWidth: line_width,
            }
          }
        }
      },
      responsive: {
        rules: [{
          chartOptions: {
            title: {
              margin: title_margin - 20
            }
          },
          condition: {
            maxWidth: 630
          }
        }, {
          chartOptions: {
            chart: {
              height: chart_height
            },
            legend: {
              layout: 'horizontal'
            },
            title: {
              margin: title_margin - 30,
              style: {
                fontSize: '26px',
                lineHeight: '30px'
              }
            }
          },
          condition: {
            maxWidth: 500
          }
        }, {
          chartOptions: {
            chart: {
              height: chart_height
            }
          },
          condition: {
            maxWidth: 400
          }
        }]
      },
      series: data,
      subtitle: {
        align: 'left',
        enabled: true,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '18px'
        },
        text: subtitle,
        widthAdjust: -144,
        x: 100
      },
      title: {
        align: 'left',
        margin: title_margin,
        style: {
          color: '#000',
          fontSize: '30px',
          fontWeight: 700,
          lineHeight: '34px'
        },
        text: title,
        widthAdjust: -144,
        x: 100
      },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: 0,
        borderWidth: 1,
        crosshairs: true,
        formatter() {
          // eslint-disable-next-line react/no-this-in-sfc
          const values = this.points.filter(point => point.series.name !== '').map(point => [point.series.name.split(' (')[0], point.y, point.color]);
          const rows = [];
          rows.push(values.map(point => `<div><span class="tooltip_label" style="color: ${point[2]}">${(point[0]) ? `${point[0]}: ` : ''}</span><span class="tooltip_value">${prefix}${formatNr(roundNr(point[1], data_decimals), ',', suffix, '', false, change)}</span></div>`).join(''));
          // eslint-disable-next-line react/no-this-in-sfc
          return `<div class="tooltip_container"><h3 class="tooltip_header">${tooltip_label} ${tooltip_date_interval === 'day' ? (`${(new Date(this.x)).getDate()} ${month_names[(new Date(this.x)).getMonth()]} ${(new Date(this.x)).getFullYear()}`) : (tooltip_date_interval === 'month') ? (`${month_names[(new Date(this.x)).getMonth()]} ${(new Date(this.x)).getFullYear()}`) : (tooltip_date_interval === 'semester') ? `${this.points[0].point.semester} ${(new Date(this.x)).getFullYear()}` : (new Date(this.x)).getFullYear()}</h3>${rows}</div>`;
        },
        shadow: false,
        shared: true,
        useHTML: true
      },
      xAxis: {
        allowDecimals: false,
        crosshair: {
          color: '#ccc',
          width: 1
        },
        labels: {
          enabled: true,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 400
          },
          useHTML: false,
          y: 30
        },
        // tickInterval: 1000 * 60 * 60 * 24 * 365,
        lineColor: '#ccc',
        lineWidth: 0,
        opposite: false,
        plotLines: plot_lines,
        tickLength: 5,
        tickWidth: 1,
        type: 'datetime',
        title: {
          enabled: true,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: 'Year'
        }
      },
      yAxis: {
        allowDecimals: allow_decimals,
        gridLineColor: 'rgba(124, 112, 103, 0.2)',
        gridLineDashStyle: 'shortdot',
        gridLineWidth: 1,
        labels: {
          formatter: (el) => `${el.value.toLocaleString('en-US')}`,
          reserveSpace: true,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          }
        },
        lineColor: 'transparent',
        lineWidth: 0,
        max: ymax,
        min: ymin,
        opposite: false,
        plotLines: (ymin < 0) ? [{
          color: '#aaa096',
          value: 0,
          width: 1
        }] : undefined,
        showFirstLabel: true,
        showLastLabel: true,
        tickInterval: ytick_interval,
        title: {
          enabled: true,
          reserveSpace: true,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: null
        },
        type: 'linear'
      }
    });
    chartRef.current.querySelector(`#chartIdx${idx}`).style.opacity = 1;

    Highcharts.charts[0].redraw(true);
  }, [allow_decimals, change, chart_height, data, data_decimals, idx, line_width, month_names, note, plot_lines, prefix, show_only_first_and_last_labels, source, subtitle, suffix, title, title_margin, tooltip_date_interval, tooltip_label, ymax, ymin, ytick_interval]);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        createChart();
      }, 300);
    }
  }, [createChart, isVisible]);

  return (
    <div className="chart_container" style={{ minHeight: chart_height }}>
      <div ref={chartRef}>
        {(isVisible) && (<div className="chart" id={`chartIdx${idx}`} style={{ maxWidth: '700px' }} />)}
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

LineChart.propTypes = {
  allow_decimals: PropTypes.bool,
  change: PropTypes.bool,
  data: PropTypes.instanceOf(Array).isRequired,
  chart_height: PropTypes.number,
  data_decimals: PropTypes.number.isRequired,
  idx: PropTypes.string.isRequired,
  line_width: PropTypes.number,
  note: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  plot_lines: PropTypes.instanceOf(Array),
  prefix: PropTypes.string,
  show_only_first_and_last_labels: PropTypes.bool,
  source: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  suffix: PropTypes.string,
  title: PropTypes.string.isRequired,
  title_margin: PropTypes.number,
  tooltip_date_interval: PropTypes.string,
  tooltip_label: PropTypes.string,
  ymax: PropTypes.number,
  ymin: PropTypes.number,
  ytick_interval: PropTypes.number
};

LineChart.defaultProps = {
  allow_decimals: true,
  change: false,
  chart_height: 600,
  line_width: 5,
  note: false,
  plot_lines: [{}],
  prefix: '',
  show_only_first_and_last_labels: true,
  subtitle: false,
  suffix: '',
  title_margin: 40,
  tooltip_date_interval: 'year',
  tooltip_label: 'Year',
  ymax: undefined,
  ymin: undefined,
  ytick_interval: undefined
};

export default memo(LineChart);
