import React, { useState } from 'react';
import { useD3 } from './../../../hooks/useD3';
import * as d3 from 'd3';
import styles from './Records100m.module.css';

function Records100m({ data }) {
  const ref = useD3(
    (svg) => {
      // create dimensions
      let dimensions = {
        width: 1024,
        height: 430,
        margin: {
          top: 30,
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

      const xAxisGenerator = d3
        .axisBottom()
        .scale(xScale)
        // .tickSizeOuter(0)
        .tickSize(-dimensions.boundedHeight + 20);

      const xAxis = bounds
        .append('g')
        .call(xAxisGenerator)
        .style('transform', `translateY(${dimensions.boundedHeight}px)`)
        .attr('font-family', 'JetBrains Mono')
        .attr('font-size', '13px')
        .attr('stroke-dasharray', '2px 2px');

      // start position circles
      const athletes = bounds
        .append('g')
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', 0)
        .attr('cy', (d, i) => 45 + i * 44)
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
        .attr('y', (d, i) => 40 + i * 44)
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
        .attr('y', (d, i) => 81 + i * 44)
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
        .attr('y', (d, i) => 51 + i * 44)
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

      // todo – render buttons in react not d3
      // Make buttons
      const makeButton = (xPos, width) => {
        const button = bounds
          .append('g')
          .selectAll('rect')
          .data(data)
          .join('rect')
          .attr('x', xPos)
          .attr('y', -30)
          .attr('width', width)
          .attr('height', 40)
          .style('rx', 20)
          .style('fill', 'hsla(48, 81%, 75%, 1)')
          .style('cursor', 'pointer');

        return button;
      };
      // Make button text
      const makeButtonText = (xPos, textContent) => {
        const buttonText = bounds
          .append('g')
          .selectAll('text')
          .data(data)
          .join('text')
          .attr('x', xPos)
          .attr('y', -5)
          .text(textContent)
          .style('fill', '#333')
          .style('text-anchor', 'middle')
          .style('cursor', 'pointer');

        return buttonText;
      };

      // Make race animation
      const playAnimation = (elToAnmiate, timesAsFast) => {
        return elToAnmiate.on('click', function (e) {
          athletes
            .transition()
            .ease(d3.easeLinear)
            .duration((d) => (timeAccessor(d) * 1000) / timesAsFast)
            .attr('cx', dimensions.boundedWidth);

          athleteTrailingBar
            .transition()
            .ease(d3.easeLinear)
            .duration((d) => (timeAccessor(d) * 1000) / timesAsFast)
            .attr('x', 0)
            .attr('width', dimensions.boundedWidth);

          times
            .transition()
            .delay((d) => (timeAccessor(d) * 1000) / timesAsFast)
            .attr('opacity', 1);
        });
      };

      // Play button
      const playBtn = makeButton(0, 100);
      const playBtnText = makeButtonText(50, 'Play');
      const playRecordAnimationText = playAnimation(playBtnText, 1);
      const playRecordAnimationBtn = playAnimation(playBtn, 1);

      // Reset button
      const resetBtn = makeButton(110, 100);
      const resetBtnText = makeButtonText(160, 'Reset');
      // Reset main animation
      const resetAnimation = (elToAnmiate) => {
        return elToAnmiate.on('click', function (e) {
          athletes.transition().attr('cx', 0);
          athleteTrailingBar.transition().attr('x', 0).attr('width', 0);
          times.transition().attr('opacity', 0);
        });
      };

      resetAnimation(resetBtnText);
      resetAnimation(resetBtn);

      // Play twice as fast button
      const playBtnTwiceAsFast = makeButton(220, 160);
      const playBtnTwiceAsFastText = makeButtonText(300, 'Twice as fast');
      const playRecordAnimation2xText = playAnimation(
        playBtnTwiceAsFastText,
        2,
      );
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
        <p>Here are the eight fastest 100m times ever run</p>
      </div>

      {/* Fallback if no data */}

      {data.length ? (
        <svg
          className={styles.recordAnimation}
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
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Records100m;
