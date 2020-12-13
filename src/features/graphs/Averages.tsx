import React from 'react';
import c3 from 'c3';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import {
  selectAverageSalariesNoNull,
  selectAverageExperienceNoNull,
  selectIndustryLabelsNoNull,
} from './graphSlice';

const Averages = () => {
  const averageSalariesNoNull = useSelector(selectAverageSalariesNoNull);
  const averageExperienceNoNull = useSelector(selectAverageExperienceNoNull);
  const industryLabelsNoNull = useSelector(selectIndustryLabelsNoNull);

  React.useEffect(() => {
    c3.generate({
      bindto: '#averagesChart',
      data: {
        columns: [
          ['Salary', ...averageSalariesNoNull],
          ['Experience', ...averageExperienceNoNull],
        ],
        axes: {
          Salary: 'y',
          Experience: 'y2'
        },
        types: {
          Salary: 'bar',
          Experience: 'line'
        },
      },
      grid: {
        y: {
          show: true
        }
      },
      axis: {
        x: {
          type: 'category',
          categories: industryLabelsNoNull,
          tick: {
            rotate: 90,
            multiline: false
          },
          height: 350
        },
        y: {
          show: true,
          label: {
            text: 'Average Salary',
            position: 'outer-middle'
          },
          tick: {
            format: d3.format(',d')
          }
        },
        y2: {
          show: true,
          label: {
            text: 'Average Experience (Years)',
            position: 'outer-middle'
          }
        }
      },
      size: {
        height: 800,
      },
    });
  }, [averageExperienceNoNull, averageSalariesNoNull, industryLabelsNoNull]);

  return (
    <div id='averagesChart' />
  );
};

export default Averages;
