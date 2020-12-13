import React, { useState, useEffect } from 'react';
import c3 from 'c3';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import {
  selectListOfPeople,
  selectListOfIndustriesWithArrays,
  selectRowData
} from './graphSlice';

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core';

const Individual = () => {
  const listOfPeople = useSelector(selectListOfPeople);
  const listOfIndustriesWithArrays = useSelector(selectListOfIndustriesWithArrays);
  const rowData = useSelector(selectRowData);
  const [selectedPerson, setSelectedPerson] = useState(listOfPeople[0]);
  const [dataSet, setDataSet] = useState(rowData[1]);
  const [newSalaryAverage, setNewSalaryAverage] = useState(0);
  const [newExperienceAverage, setNewExperienceAverage] = useState(0);
  useEffect(() => {
    const newPersonDataSet = rowData.filter((row: any) => row.first_name === selectedPerson.split(' ')[0])[0];
    const industrySalaries = listOfIndustriesWithArrays.filter((row: any) => row.industry === newPersonDataSet.industry)[0].salary;
    const newSalaryAverage = d3.mean(industrySalaries);
    const industryExperience = listOfIndustriesWithArrays.filter((row: any) => row.industry === newPersonDataSet.industry)[0].years_of_experience;
    const newExperienceAverage = d3.mean(industryExperience);
    setDataSet(newPersonDataSet);
    setNewSalaryAverage(Number(newSalaryAverage));
    setNewExperienceAverage(Number(newExperienceAverage));
  }, [selectedPerson, rowData, listOfIndustriesWithArrays]);

  React.useEffect(() => {
    c3.generate({
      bindto: '#individualChart',
      data: {
        columns: [
          ['Salary', dataSet.salary, newSalaryAverage],
          ['Experience', dataSet.years_of_experience, newExperienceAverage.toFixed(2)],
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
          categories: [ selectedPerson, 'Industry Average'],
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
            text: 'Experience (Years)',
            position: 'outer-middle'
          },
          max: 10,
          min: 0,
        }
      },
      size: {
        height: 800,
      }
    });
  }, [dataSet, newExperienceAverage, newSalaryAverage, selectedPerson]);

  const handleChange = (event: any) => {
    setSelectedPerson(event.target.value);
  };

  return (
    <>
      <FormControl
        variant='outlined'
      >
        <InputLabel id='personSelect'>Person</InputLabel>
        <Select
          labelId='personSelect'
          id='personSelect'
          value={selectedPerson}
          onChange={handleChange}
          label='Age'
        >
          {listOfPeople.map((person: string) => {
            return (
              <MenuItem key={person} value={person}>{person}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <div id='individualChart' />
    </>
  );
};

export default Individual;
