// import React from 'react';
import { useD3 } from './../../hooks/useD3';
import * as d3 from 'd3';

function MedalsByGames({ data }) {
  const ref = useD3(
    (svg) => {
      // get data and parse dates
      const dateParser = d3.timeParse('%Y');
      const xAccessor = (d) => dateParser(d.year);
      const yAccessor = (d) => d.total;

      // const width = 500;
      const margin = { top: 0, right: 0, bottom: 0, left: 0 };

      // Create dimensions
      const width = 500;

      let dimensions = {
        width: width,
        height: width * 0.6,
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      };

      dimensions.boundedWidth =
        dimensions.width - dimensions.margin.left - dimensions.margin.right;

      dimensions.boundedHeight =
        dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.year))
        .rangeRound([0, dimensions.boundedWidth])
        .padding(0.05);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.total)])
        .rangeRound([dimensions.boundedHeight, 0])
        .nice();

      const xAxis = (g) =>
        g
          .attr(
            'transform',
            `translate(0,${dimensions.height - margin.bottom})`,
          )
          .call(
            d3
              .axisBottom(xScale)
              .tickValues(
                d3
                  .ticks(...d3.extent(xScale.domain()), width / 40)
                  .filter((v) => xScale(v) !== undefined),
              )
              .tickSizeOuter(0),
          );

      svg.select('.x-axis').call(xAxis);

      svg
        .select('.plot-area')
        .attr('fill', 'cyan')
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', (d) => xScale(d.year))
        .attr('width', xScale.bandwidth())
        .attr('y', (d) => yScale(d.total))
        .attr('height', (d) => yScale(0) - yScale(d.total));
    },
    [data.length],
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 320,
        width: 620,
        marginRight: '0px',
        marginLeft: '0px',
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
    </svg>
  );
}

export default MedalsByGames;
