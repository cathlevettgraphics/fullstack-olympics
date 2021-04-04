import React from 'react';
import styles from './MedalTable.module.css';
import { useD3 } from './../../../hooks/useD3';
import * as d3 from 'd3';
import { utcFormat } from 'd3';
// import React, { useState, useEffect, useContext } from 'react';import * as d3 from 'd3';

function MedalTable({ data }) {
  const ref = useD3(
    (svg) => {
      console.log('all time medals', data);

      // create dimensions
      let dimensions = {
        width: 620,
        height: 950,
        margin: {
          top: 0,
          right: 100,
          bottom: 40,
          left: 135,
        },
      };

      // set size of bounds
      dimensions.boundedWidth =
        dimensions.width - dimensions.margin.left - dimensions.margin.right;
      dimensions.boundedHeight =
        dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

      // access data
      const yAccessor = (d) => d.team;

      const format = d3.format(',');
      const goldMedals = (d) => {
        if (typeof d.gold === 'number') return format(d.gold);
        return d.gold;
      };

      const silverMedals = (d) => d.silver;
      const bronzeMedals = (d) => d.bronze;

      const totalMedals = (d) => {
        if (typeof d.total === 'number') return format(d.total);
        return d.total;
      };

      // Draw table
      const medalsTable = d3
        .select('.medalsTable')
        .append('svg')
        // .attr('width', dimensions.width)
        // .attr('height', dimensions.height)
        .attr('viewbox', dimensions.width, dimensions.height);

      // draw bounds for chart
      const bounds = medalsTable
        .append('g')
        .style(
          'transform',
          `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`,
        );

      // create scales for proportional circles
      const maxCircValue = 1022;
      const circScale = d3.scaleSqrt().domain([0, maxCircValue]).range([0, 48]);

      // Country names
      const countryText = medalsTable
        .append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', 0)
        .attr('y', (d, i) => 20 + i * 60)
        .text(yAccessor)
        .attr('text-anchor', 'right');

      // Dividing line
      const line = medalsTable
        .append('g')
        .selectAll('line')
        .data(data)
        .join('line')
        .attr('x1', 0)
        .attr('y1', (d, i) => 44 + i * 60)
        .attr('x2', 620)
        .attr('y2', (d, i) => 44 + i * 60)
        .style('stroke', 'hsla(206, 16%, 65%, 1)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3, 3');

      // Gold medals circles
      const goldBubble = medalsTable
        .append('g')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', 165)
        .attr('cy', (d, i) => 14 + i * 60)
        .attr('r', (d) => circScale(d.gold))
        .attr('fill', 'hsla(48, 81%, 75%, 1)')
        .style('opacity', '.6');

      // Gold medals text
      const goldText = medalsTable
        .append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', 165)
        .attr('y', (d, i) => 20 + i * 60)
        .text(goldMedals)
        .style('text-anchor', 'middle');

      // Silver medals circles
      const silverBubble = medalsTable
        .append('g')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', 300)
        .attr('cy', (d, i) => 14 + i * 60)
        .attr('r', (d) => circScale(d.silver))
        .attr('fill', ' hsla(206, 16%, 65%, 1)')
        .style('opacity', '.5');

      // Silver medals
      const silverText = medalsTable
        .append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', 300)
        .attr('y', (d, i) => 20 + i * 60)
        .text(silverMedals)
        .style('text-anchor', 'middle');

      // Bronze medals circles
      const bronzeBubble = medalsTable
        .append('g')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', 435)
        .attr('cy', (d, i) => 14 + i * 60)
        .attr('r', (d) => circScale(d.bronze))
        .attr('fill', ' hsla(29, 76%, 74%, 1)')
        .style('opacity', '.6');

      const bronzeText = medalsTable
        .append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', 435)
        .attr('y', (d, i) => 20 + i * 60)
        .text(bronzeMedals)
        .style('text-anchor', 'middle');

      const totalText = medalsTable
        .append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', 550)
        .attr('y', (d, i) => 20 + i * 60)
        .text(totalMedals)
        .style('text-anchor', 'middle');
    },
    [data.length],
  );
  return (
    <div className={styles.medalContainer}>
      <div className={styles.introText}>
        <h2 className={styles.subhead}>All time medal table</h2>
        <p className={styles.strap}>
          We swallow it too fast, we choke. We get some in our lungs, we drown.
          However unreal it may seem, we are connected, you and I. We're on the
          same curve, just on opposite ends.
        </p>
        <p>The top 20 medal winning nations of all time</p>
      </div>

      <svg
        className={styles.table}
        // appending to the svg element
        ref={ref}
        style={{
          height: 950,
          width: '100%',
          marginRight: '0px',
          marginLeft: '0px',
        }}
      >
        <g className="medalsTable" />
        <g className="bounds" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="text" />
      </svg>
    </div>
  );
}

export default MedalTable;
