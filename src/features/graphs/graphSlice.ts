import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createSelector } from 'reselect';
import { convertDate } from '../../utils/convertDate';

// eslint-disable-next-line 
const dataSet = require('../../mockData/MOCK_DATA.json');

const initialState: TableState = {
  rowData: dataSet,
};

export const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {},
});

export const selectRowData = (state: RootState) => state.graph.rowData;

export const selectListOfIndustries = createSelector(selectRowData, (rowData: any) =>
  rowData.reduce((acc: any, curr: any) => {
    const currIndustry = curr.industry;
    if (acc.indexOf(currIndustry) === -1) {
      acc.push(currIndustry);
    }
    return acc;
  }, []),
);

export const selectListOfIndustriesWithArrays = createSelector(selectRowData, (rowData: any) =>
  rowData.reduce((acc: any, curr: any) => {
    const age = convertDate(curr.date_of_birth);
    if (acc.filter((row: { industry: string }) => row.industry === curr.industry).length === 0) {
      acc.push({
        industry: curr.industry,
        salary: [curr.salary],
        age: [age],
        first_name: [curr.first_name],
        last_name: [curr.last_name],
        years_of_experience: [curr.years_of_experience],
      });
    } else {
      acc.filter((row: { industry: string }) => row.industry === curr.industry)[0].salary.push(curr.salary);
      acc.filter((row: { industry: string }) => row.industry === curr.industry)[0].age.push(age);
      acc.filter((row: { industry: string }) => row.industry === curr.industry)[0].first_name.push(curr.first_name);
      acc.filter((row: { industry: string }) => row.industry === curr.industry)[0].last_name.push(curr.last_name);
      acc.filter((row: { industry: string }) => row.industry === curr.industry)[0].years_of_experience.push(curr.years_of_experience);
    }
    return acc;
  }, []),
);

const selectListOfIndustriesWithAverageAgeAndAverageSalary = createSelector(selectRowData, (rowData: any) =>
  rowData.reduce((acc: any, curr: any) => {
    if (acc.filter((row: { industry: string }) => row.industry === curr.industry).length === 0) {
      acc.push({
        industry: curr.industry,
        salary: [curr.salary],
        years_of_experience: [curr.years_of_experience],
      });
    } else {
      acc.filter((row: { industry: string }) => row.industry === curr.industry)[0].salary.push(curr.salary);
      acc.map((row: any) => {
        const sumOfSalary = row.salary.reduce((acc: any, curr: any) => {
          if (curr !== null) {
            return acc + curr;
          }
        });
        return (row.averageSalary = Number(sumOfSalary / row.salary.length).toFixed(2));
      });
      acc.filter((row: { industry: string }) => row.industry === curr.industry)[0].years_of_experience.push(curr.years_of_experience);
      acc.map((row: any) => {
        const yearsSum = row.years_of_experience.reduce((acc: any, curr: any) => {
          if (curr !== null) {
            return acc + curr;
          }
        });
        row.averageExperience = Number(yearsSum / row.years_of_experience.length).toFixed(2);
      });
    }
    return acc;
  }, []),
);

const selectAverageSalaries = createSelector(selectListOfIndustriesWithAverageAgeAndAverageSalary, (rowData: any) =>
  rowData.map((row: { averageSalary: number; }) => row.averageSalary),
);

export const selectAverageSalariesNoNull = createSelector(selectAverageSalaries, (rowData: any) =>
  rowData.filter(function (e: string) {
    return e !== 'NaN';
  }),
);

const selectAverageExperience = createSelector(selectListOfIndustriesWithAverageAgeAndAverageSalary, (rowData: any) =>
  rowData.map((row: { averageExperience: number; }) => row.averageExperience),
);

export const selectAverageExperienceNoNull = createSelector(selectAverageExperience, (rowData: any) =>
  rowData.filter(function (e: string) {
    return e !== 'NaN';
  }),
);

export const selectIndustryLabelsNoNull = createSelector(selectListOfIndustries, (rowData: any) =>
  rowData.filter(function (e: null) {
    return e !== null;
  }),
);

export const selectListOfPeople = createSelector(selectRowData, (rowData: any) =>
  rowData.reduce((acc: any, curr: any) => {
    const fullName = `${curr.first_name} ${curr.last_name !== null ? curr.last_name : ''}`;
    acc.push(fullName);
    return acc;
  }, []),
);

export default graphSlice.reducer;
