import { useD3 } from './../../../hooks/useD3';
// import React, { useState, useEffect, useContext } from 'react';
import * as d3 from 'd3';
import styles from './MedalsByGames.module.css';

function MedalsByGamesGER({ data }) {
  const ref = useD3(
    (svg) => {
      // todo – loop through and create new charts for these countries
      // const countries = ['US', 'Russia', 'Germany', 'UK', 'France', 'Italy'];

      // create dimensions
      let dimensions = {
        width: 620,
        // width: window.innerWidth,
        height: 300,
        margin: {
          top: 20,
          right: 0,
          bottom: 40,
          left: 0,
        },
      };

      // set size of bounds
      dimensions.boundedWidth =
        dimensions.width - dimensions.margin.left - dimensions.margin.right;
      dimensions.boundedHeight =
        dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

      // todo – render this function as seperate charts
      // const drawOneChart = (country) => {

      // access data
      const xAccessor = (d) => d.year;
      const yAccessor = (d) => d.total;
      const countryAccessor = data
        .filter((d) => d.country === 'Germany')
        .sort((a, b) => a.year.localeCompare(b.year));

      // calculate average
      const medalsArr = data
        .filter((d) => d.country === 'Germany')
        .map((d) => d.total)
        .reduce((acc, curr) => acc + curr, 0);

      const mean = medalsArr / countryAccessor.length;

      // todo – loop over and create multiple country charts
      // const countryAccessor = data
      //   .filter((d) => d.country === country)
      //   .sort((a, b) => a.year.localeCompare(b.year));

      const germanyChart = d3
        .select('.germanyChart')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height);

      // draw bounds for chart
      const bounds = germanyChart
        .append('g')
        .style(
          'transform',
          `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`,
        );

      // create scales
      const xScale = d3
        .scaleBand()
        .domain(countryAccessor.map((d) => d.year))
        .range([0, dimensions.boundedWidth]);

      // create scales
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, yAccessor)])
        .range([dimensions.boundedHeight, 0]);

      const barPadding = 2;

      // chart
      const bars = bounds
        .append('g')
        .selectAll('rect')
        .data(countryAccessor)
        .join('rect')
        .attr('x', (d) => xScale(xAccessor(d)))
        .attr('y', (d) => yScale(yAccessor(d)))
        .attr('width', xScale.bandwidth() - barPadding)
        .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
        .style('fill', '#F3DE8A');

      // text
      const text = bounds
        .append('g')
        .selectAll('text')
        .data(countryAccessor)
        .join('text')
        .attr('x', (d) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
        .attr('y', (d) => yScale(yAccessor(d) + 10))
        .attr('width', xScale.bandwidth() - barPadding)
        .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
        .text(yAccessor)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'JetBrains Mono');

      const meanLine = bounds
        .append('g')
        .selectAll('line')
        .data(data)
        .join('line')
        .attr('x1', 0)
        .attr('x2', dimensions.boundedWidth)
        .attr('y1', yScale(mean))
        .attr('y2', yScale(mean))
        .attr('stroke', 'hsla(8, 72%, 72%, 1)')
        .attr('stroke-dasharray', '2px 2px');

      const meanLabel = bounds
        .append('g')
        .selectAll('text')
        .data(countryAccessor)
        .join('text')
        .attr('x', dimensions.boundedWidth - 85)
        .attr('y', yScale(mean) - 7)
        .text(`Average ${Math.floor(mean)}`)
        .attr('text-anchor', 'right')
        .attr('font-size', '13px')
        .attr('fill', 'hsla(8, 72%, 72%, 1)');

      const xAxisGenerator = d3.axisBottom().scale(xScale).tickSizeOuter(0);
      const xAxis = bounds
        .append('g')
        .call(xAxisGenerator)
        .style('transform', `translateY(${dimensions.boundedHeight}px)`)
        .attr('font-family', 'JetBrains Mono')
        .attr('font-size', '13px');

      const yAxisGenerator = d3.axisLeft().scale(yScale).tickSizeOuter(0);
      // const yAxis = bounds.append('g').call(yAxisGenerator);
      // };

      // todo – loop thru data and add each country
      // for (const country of countries) {
      //   drawOneChart(country);
      // }
    },
    [data.length],
  );

  return (
    <div>
      <p className={styles.countryMedalCount}>
        <span className={styles.countryName}>Germamny</span> 1,748 medals since
        1976
      </p>
      <svg
        // appending to the svg element
        ref={ref}
        style={{
          height: 300,
          width: '100%',
          marginRight: '0px',
          marginLeft: '0px',
        }}
      >
        <g className="germanyChart" />
        <g className="bounds" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="text" />
      </svg>
    </div>
  );
}

export default MedalsByGamesGER;
