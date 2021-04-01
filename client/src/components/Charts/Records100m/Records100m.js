import React from 'react';
import { useD3 } from './../../../hooks/useD3';
import * as d3 from 'd3';
import styles from './Records100m.module.css';

function Records100m({ data }) {
  const ref = useD3(
    (svg) => {
      // console.log('100m record data', data);

      // create dimensions
      let dimensions = {
        width: 1024,
        height: 430,
        margin: {
          top: 40,
          right: 100,
          bottom: 20,
          left: 135,
        },
      };

      // set size of bounds
      dimensions.boundedWidth =
        dimensions.width - dimensions.margin.left - dimensions.margin.right;
      dimensions.boundedHeight =
        dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

      // access data
      const xAccessor = (d) => d.track;
      const yAccessor = (d) => d.competitor;
      const timeAccessor = (d) => d.time;

      const animated100m = d3
        .select('.animated100m')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height);

      // draw bounds for chart
      const bounds = animated100m
        .append('g')
        .style(
          'transform',
          `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`,
        );

      // create scales
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, xAccessor)])
        .range([0, dimensions.boundedWidth])
        .nice();

      const xAxisGenerator = d3.axisBottom().scale(xScale).tickSizeOuter(0);
      const xAxis = bounds
        .append('g')
        .call(xAxisGenerator)
        .style('transform', `translateY(${dimensions.boundedHeight}px)`)
        .attr('font-family', 'JetBrains Mono')
        .attr('font-size', '13px');

      // start position circles
      const athletes = bounds
        .append('g')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', 0)
        .attr('cy', (d, i) => 25 + i * 44)
        .attr('r', 10)
        .style('fill', (d) =>
          d.competitor === 'Usain Bolt'
            ? 'hsla(8, 72%, 72%, 1)'
            : 'hsla(206, 16%, 65%, 1',
        );

      const athleteTrailingBar = bounds
        .append('g')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', 0)
        .attr('y', (d, i) => 20 + i * 44)
        .attr('width', 0)
        .attr('height', 10)
        .style('fill', (d) =>
          d.competitor === 'Usain Bolt'
            ? 'hsla(8, 72%, 72%, 1)'
            : 'hsla(206, 16%, 65%, 1',
        );

      // athlete names text
      const text = animated100m
        .append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', 0)
        .attr('y', (d, i) => 71 + i * 44)
        .text(yAccessor)
        .attr('text-anchor', 'right')
        .style('fill', (d) =>
          d.competitor === 'Usain Bolt'
            ? 'hsla(8, 72%, 72%, 1)'
            : 'hsla(206, 16%, 65%, 1',
        )
        .style('font-weight', (d) =>
          d.competitor === 'Usain Bolt' ? 'bold' : 'normal',
        );

      // race time text
      const times = bounds
        .append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', dimensions.boundedWidth + 20)
        .attr('y', (d, i) => 31 + i * 44)
        .text(timeAccessor)
        .attr('text-anchor', 'left')
        .attr('opacity', 0)
        .style('fill', (d) =>
          d.competitor === 'Usain Bolt'
            ? 'hsla(8, 72%, 72%, 1)'
            : 'hsla(206, 16%, 65%, 1',
        )
        .style('font-weight', (d) =>
          d.competitor === 'Usain Bolt' ? 'bold' : 'normal',
        );

      // todo – render these in react not d3
      // Play button
      const playBtn = bounds
        .append('g')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', 0)
        .attr('y', -30)
        .attr('width', 100)
        .attr('height', 25)
        .style('fill', 'black')
        .style('cursor', 'pointer');

      const playBtnText = bounds
        .append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', 10)
        .attr('y', -10)
        .text('Play')
        .style('fill', '#fff')
        .style('cursor', 'pointer');

      // !  Animation
      // Play main animation
      playBtnText.on('click', function (e) {
        athletes
          .transition()
          .ease(d3.easeLinear)
          .duration((d) => timeAccessor(d) * 1000)
          .attr('cx', dimensions.boundedWidth);

        athleteTrailingBar
          .transition()
          .ease(d3.easeLinear)
          .duration((d) => timeAccessor(d) * 1000)
          .attr('x', 0)
          .attr('width', dimensions.boundedWidth);

        times
          .transition()
          .delay((d) => timeAccessor(d) * 1000)
          .attr('opacity', 1);
      });

      // todo – render these in react not d3
      // Play twice as fast button
      const playBtnTwiceAsFast = bounds
        .append('g')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', 250)
        .attr('y', -30)
        .attr('width', 100)
        .attr('height', 25)
        .style('fill', 'orange')
        .style('cursor', 'pointer');

      const playBtnTwiceAsFastText = bounds
        .append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', 250)
        .attr('y', -10)
        .text('Twice as fast')
        .style('cursor', 'pointer');

      // !  Animation
      // Play twice as fast animation
      playBtnTwiceAsFastText.on('click', function (e) {
        athletes
          .transition()
          .ease(d3.easeLinear)
          .duration((d) => (timeAccessor(d) * 1000) / 2)
          .attr('cx', dimensions.boundedWidth);

        athleteTrailingBar
          .transition()
          .ease(d3.easeLinear)
          .duration((d) => (timeAccessor(d) * 1000) / 2)
          .attr('x', 0)
          .attr('width', dimensions.boundedWidth);

        times
          .transition()
          .delay((d) => (timeAccessor(d) * 1000) / 2)
          .attr('opacity', 1);
      });

      // todo – render these in react not d3
      // Reset button
      const resetBtn = bounds
        .append('g')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', 120)
        .attr('y', -30)
        .attr('width', 100)
        .attr('height', 25)
        .style('fill', 'red')
        .style('cursor', 'pointer');

      const resetBtnText = bounds
        .append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', 120)
        .attr('y', -10)
        .text('Reset')
        .style('fill', '#fff')
        .style('cursor', 'pointer');

      // !  Animation
      // Reset main animation
      resetBtnText.on('click', function (e) {
        athletes.transition().attr('cx', 0);
        athleteTrailingBar.transition().attr('x', 0).attr('width', 0);
        times.transition().attr('opacity', 0);
      });
    },
    [data.length],
  );

  return (
    <div className={styles.recordContainer}>
      <div className={styles.introText}>
        <h2 className={styles.subhead}>
          Can Usain Bolt's 100m record ever be beaten?
        </h2>
        <p className={styles.strap}>
          Your bones don't break, mine do. That's clear. Your cells react to
          bacteria and viruses differently than mine. You don't get sick, I do.
          That's also clear. But for some reason, you and I react the exact same
          way to water.
        </p>
        <p>[ TODO – render these buttons in react not d3]</p>
      </div>

      {/* <button className={styles.btn}>Replay the world record</button>
      <button>Twice the speed</button>
      <button>Reset</button> */}
      <svg
        // appending to the svg element
        ref={ref}
        style={{
          height: 430,
          width: '100%',
          marginRight: '0px',
          marginLeft: '0px',
        }}
      >
        <g className="animated100m" />
        <g className="bounds" />
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="text" />
      </svg>
    </div>
  );
}

export default Records100m;
