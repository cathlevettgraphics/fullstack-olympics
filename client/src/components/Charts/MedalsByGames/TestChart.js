import { useD3 } from './../../../hooks/useD3';
import React, { useState, useEffect, useContext } from 'react';
import * as d3 from 'd3';

function TestChart({ data }) {
  // NOW IN CONTEXTS – GetMedalByGamesContext.js

  // const [medals, setMedals] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [loaded, setLoaded] = useState(false);

  // GET DATA
  // useEffect(() => {
  //   const getMedalsData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch('/api/v1/medals-by-games');
  //       if (response.ok) {
  //         const data = await response.json();
  //         setMedals(data);
  //         console.log('medal data', data);
  //         setLoading(false);
  //         setLoaded(true);
  //       }
  //     } catch (err) {
  //       console.log('error', err.message || err.statusText);
  //     }
  //   };
  //   if (!loaded && !loading) {
  //     getMedalsData();
  //   }
  // }, [medals, setMedals]);

  // DRAW DATA – THE DATA IS PASSED IN AS A PROP ON THE HOME PAGE – USING LOCAL DATA AT THE MOMENT IN LOCAL DATA FOLDER
  const ref = useD3(
    (svg) => {
      // access data
      const xAccessor = (d) => d.year;
      const yAccessor = (d) => d.total;
      const US = data
        .filter((d) => d.country === 'US')
        .sort((a, b) => a.year.localeCompare(b.year));
      // const countryAccessor = data.filter((d) => d.country === country);

      // todo – loop over and create multiple country charts

      // create dimensions
      let dimensions = {
        width: window.innerWidth,
        height: 300,
        margin: {
          top: 15,
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

      const wrapper = d3
        .select('.wrapper')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height);

      // draw bounds for chart
      const bounds = wrapper
        .append('g')
        .style(
          'transform',
          `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`,
        );

      // create scales
      const xScale = d3
        .scaleBand()
        .domain(US.map((d) => d.year))
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
        .data(US)
        .join('rect')
        .attr('x', (d) => xScale(xAccessor(d)))
        .attr('y', (d) => yScale(yAccessor(d)))
        .attr('width', xScale.bandwidth() - barPadding)
        .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
        .style('fill', 'cyan');

      // text
      const text = bounds
        .append('g')
        .selectAll('text')
        .data(US)
        .join('text')
        .attr('x', (d) => xScale(xAccessor(d)) + xScale.bandwidth() / 2)
        .attr('y', (d) => yScale(yAccessor(d) - 50))
        .attr('width', xScale.bandwidth() - barPadding)
        .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
        .text(yAccessor)
        .attr('text-anchor', 'middle')
        .attr('font-family', 'JetBrains Mono');

      const xAxisGenerator = d3.axisBottom().scale(xScale).tickSizeOuter(0);
      const xAxis = bounds
        .append('g')
        .call(xAxisGenerator)
        .style('transform', `translateY(${dimensions.boundedHeight}px)`);

      const yAxisGenerator = d3.axisLeft().scale(yScale).tickSizeOuter(0);
      // const yAxis = bounds.append('g').call(yAxisGenerator);
    },
    [data.length],
  );

  return (
    <div>
      <h2>how have the top medaling nations performed over time?</h2>
      <p>
        <span>US</span> 2,477 medals since 1976
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
        <g className="wrapper" />
        <g className="bounds" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="text" />
      </svg>
      {/* <ul>
        {data.map(({ year, total, country }) => {
          return (
            <li key={year}>
              {year} – {country}: {total} medals
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}

export default TestChart;
