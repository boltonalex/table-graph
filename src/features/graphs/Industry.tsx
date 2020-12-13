import React, { useState, useEffect } from 'react';
import c3 from 'c3';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import {
  selectIndustryLabelsNoNull,
  selectListOfIndustriesWithArrays
} from './graphSlice';

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

import { reFormatDate } from '../../utils/reFormatDate';

const Industry = () => {
  const industryLabelsNoNull = useSelector(selectIndustryLabelsNoNull);
  const listOfIndustriesWithArrays = useSelector(selectListOfIndustriesWithArrays);
  const [selectedIndustry, setSelectedIndustry] = useState(industryLabelsNoNull[0]);
  const [dataSet, setDataSet] = useState(listOfIndustriesWithArrays[0]);

  useEffect(() => {
    const newIndustryDataSet = listOfIndustriesWithArrays.filter((row: any) => row.industry === selectedIndustry)[0];
    setDataSet(newIndustryDataSet);
  }, [selectedIndustry, listOfIndustriesWithArrays]);

  React.useEffect(() => {
    const newHigh = Number(Math.max(dataSet.age));
    const newLow = Number(Math.min(dataSet.age));
    const fullNameSet = dataSet.first_name.map((firstName: any, i: number) => {
      return (firstName === null ? '': firstName) + ' ' + (dataSet.last_name[i] !== null ? dataSet.last_name[i] : '');
    })
    c3.generate({
      bindto: '#industryChart',
      data: {
        columns: [
          ['Salary', ...dataSet.salary],
          ['DOB', ...dataSet.age],
        ],
        axes: {
          Salary: 'y',
          DOB: 'y2'
        },
        types: {
          Salary: 'bar',
          DOB: 'line'
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
          categories: fullNameSet,
          tick: {
            rotate: 90,
            multiline: false
          },
          height: 150
        },
        y: {
          show: true,
          label: {
            text: 'Salary',
            position: 'outer-middle'
          },
          tick: {
            format: d3.format(',d')
          }
        },
        y2: {
          show: true,
          label: {
            text: 'DOB',
            position: 'outer-middle',
          },
          tick: {
            format: function (x) { return reFormatDate(x); }
          },
          max: newHigh,
          min: newLow,
        }
      },
      size: {
        height: 800,
      }
    });
  }, [dataSet]);

  const handleChange = (event: any) => {
    setSelectedIndustry(event.target.value);
  };

  return (
    <>
      <FormControl
        variant='outlined'
      >
        <InputLabel id='industrySelect'>Industry</InputLabel>
        <Select
          labelId='industrySelect'
          id='industrySelect'
          value={selectedIndustry}
          onChange={handleChange}
          label='Age'
        >
          {industryLabelsNoNull.map((industry: string) => {
            return (
              <MenuItem key={industry} value={industry}>{industry}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <div id='industryChart' />
    </>
  );
};

export default Industry;
