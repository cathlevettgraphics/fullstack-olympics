import { useD3 } from './../../../hooks/useD3';
// import React, { useState, useEffect, useContext } from 'react';
import * as d3 from 'd3';
import styles from './MedalsByCountry.module.css';

function MedalsByCountry({ data, shapes }) {
  const ref = useD3(
    (svg) => {
      // access data
      const countryNameAccessor = (d) => d.properties['NAME'];
      const countryIdAccessor = (d) => d.properties['ADM0_A3_IS'];
      const countryShapes = shapes;

      // create dimensions
      let dimensions = {
        width: 1024,
        // width: window.innerWidth * 0.9,
        height: 450,
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      };

      // calculate total width
      dimensions.boundedWidth =
        dimensions.width - dimensions.margin.left - dimensions.margin.right;

      // create map projection
      const sphere = { type: 'Sphere' };
      const projection = d3
        .geoEqualEarth()
        .fitWidth(dimensions.boundedWidth, sphere);

      const pathGenerator = d3.geoPath(projection);
      // get height dimentions
      const [[x0, y0], [x1, y1]] = pathGenerator.bounds(sphere);

      dimensions.boundedHeight = y1;
      dimensions.height =
        dimensions.boundedHeight +
        dimensions.margin.top +
        dimensions.margin.bottom;

      // draw canvas
      const map = d3
        .select('.map')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height);

      // draw bounds for chart
      const bounds = map
        .append('g')
        .style(
          'transform',
          `translate( ${dimensions.margin.left}px, ${dimensions.margin.top}px)`,
        );

      // start –  cloropleth map
      // filter the data we need
      let totalMedals = {};

      for (const country of data) {
        totalMedals[country['ioc-code']] = +country['total'];
      }

      // create color scale for total medals
      const metricValues = Object.values(totalMedals);
      // extract smallest /largest value
      const metricValuesExtent = d3.extent(metricValues);

      const colorScale = d3
        .scaleQuantize()
        .domain([metricValuesExtent[0], metricValuesExtent[1]])
        .range(['#CAE7B9', '#F3DE8A', '#EFB988', '#EB9486', '#97A7B3']);

      // draw map
      const countries = bounds
        .selectAll('.country')
        .data(countryShapes.features)
        .join('path')
        .attr('class', 'country')
        .attr('id', (d) => countryNameAccessor(d))
        .attr('d', pathGenerator)
        .attr('fill', (d) => {
          const metricValue = totalMedals[countryIdAccessor(d)];
          if (typeof metricValue === 'undefined' || metricValue === 0) {
            return '#fff';
          }
          return colorScale(metricValue);
        })
        .attr('stroke-width', 0.5)
        .attr('stroke', (d) => {
          if (countryNameAccessor(d) === 'Antarctica') {
            return '#fff';
          }
          return '#bbb';
        });

      // create legend
      const keyGroup = map
        .append('g')
        .attr('transform', `translate(${70}, ${dimensions.boundedHeight / 2})`);

      const keyTitle = keyGroup
        .append('text')
        .attr('y', -23)
        .attr('x', -60)
        .attr('class', 'key-title')
        .text('Olympic medals')
        .attr('font-size', '16px')
        .attr('font-family', 'JetBrains Mono');

      const keyline = keyGroup
        .append('text')
        .attr('y', 0)
        .attr('x', -60)
        .attr('class', 'key-byline')
        .text('All time summer games')
        .attr('font-size', '13px')
        .attr('font-family', 'JetBrains Mono');

      // BUCKETS SCALE BAR
      const keyScale = keyGroup.append('g');
      const keys = ['500', '1000', '1500', '2000', '2500'];
      const keyLabels = ['under 500', '500', '1,000', '1,500', '> 2,000'];

      // Add one dot in the legend for each bucket
      keyScale
        .selectAll('keyDots')
        .data(keys)
        .enter()
        .append('circle')
        .attr('cx', -50)
        .attr('cy', (d, i) => 30 + i * 25) // 32 is first dot. 25 is the distance between
        .attr('r', 7)
        .style('fill', (d) => colorScale(d));

      keyScale
        .selectAll('keyLabels')
        .data(keyLabels)
        .enter()
        .append('text')
        .attr('x', -30)
        .attr('y', (d, i) => 32 + i * 25) // 32 is first dot. 25 is the distance between
        .style('fill', '#333')
        .text((d) => d)
        .attr('font-size', '13px')
        .attr('font-family', 'JetBrains Mono')
        .style('alignment-baseline', 'middle')
        .attr('text-anchor', 'left');

      // Add numbers
      // todo – This is throwing an error in console
      const medalTotalText = bounds
        .append('g')
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d) => projection([d.longitude, d.latitude])[0])
        .attr('y', (d) => projection([d.longitude, d.latitude])[1])
        .attr('dy', 5)
        .text((d) => {
          if (d.total > 300) {
            const format = d3.format(',');
            return format(d.total);
          }
        })
        .attr('fill', (d) => (d.total > 2000 ? '#fff' : '#333'))
        .attr('text-anchor', 'middle')
        .attr('font-size', '13px')
        .attr('font-family', 'JetBrains Mono');

      // end –  cloropleth map

      // Set interaction
      const tooltip = d3.select('.tooltip');

      countries.on('mouseenter', onMouseEnter).on('mouseleave', onMouseLeave);

      function onMouseEnter(e, datum) {
        tooltip.style('opacity', 1);

        const metricValues = totalMedals[countryIdAccessor(datum)];
        tooltip.select('.tooltipCountry').text(countryNameAccessor(datum));
        tooltip.select('.value').text(`${d3.format(',')(metricValues || 0)}`);

        // Get country centroids and position tooltip
        const [centerX, centerY] = pathGenerator.centroid(datum);
        const x = centerX;
        const y = centerY + dimensions.margin.top;

        tooltip.style(
          'transform',
          `translate(` +
            `calc( -50% + ${x}px),` +
            `calc( ${y}px - 400px)` +
            `)`,
        );
      }

      function onMouseLeave() {
        tooltip.style('opacity', 0);
      }
    },
    [data.length, shapes],
  );

  return (
    <div className={styles.medalContainer}>
      <div className={styles.introText}>
        <h2 className={styles.subhead}>
          The US, Russia and Europe dominate the all time medals table
        </h2>
        <p className={styles.strap}>
          Some pilots get picked and become television programs. Some don't,
          become nothing. She starred in one of the ones that became nothing.
        </p>
        <p>Hover over the map to explore</p>
      </div>
      <svg
        className={styles.worldMap}
        // appending to the svg element
        ref={ref}
        style={{
          height: 450,
          width: '100%',
          marginRight: '0px',
          marginLeft: '0px',
        }}
      >
        <g className="map" />
      </svg>
      <div
        className="tooltip"
        style={{
          border: '1px solid black',
          padding: '10px',
          width: '275px',
          textAlign: 'center',
          backgroundColor: '#fff',
          opacity: '0',
        }}
      >
        <div className="tooltipCountry" id="country"></div>
        <div className="tooltipValue">
          <span className="value"></span> medals
        </div>
      </div>
    </div>
  );
}

export default MedalsByCountry;
