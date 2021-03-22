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
      const height = 300;
      const width = 500;
      const margin = { top: 20, right: 0, bottom: 30, left: 0 };

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.year))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.total)])
        .rangeRound([height - margin.bottom, margin.top])
        .nice();

      const xAxis = (g) =>
        g.attr('transform', `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined),
            )
            .tickSizeOuter(0),
        );

      const y1Axis = (g) =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y1).ticks(null, 's'))
          .call((g) => g.select('.domain').remove())
          .call((g) =>
            g
              .append('text')
              .attr('x', -margin.left)
              .attr('y', 10)
              .attr('text-anchor', 'start')
              .text(data.y1),
          );

      svg.select('.x-axis').call(xAxis);
      svg.select('.y-axis').call(y1Axis);

      // chart
      svg
        .select('.plot-area')
        .attr('fill', 'hsla(187, 37%, 83%, 1)')
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.year))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y1(d.total))
        .attr('height', (d) => y1(0) - y1(d.total));

      // text
      svg
        .select('.text')
        .selectAll('.text')
        .data(data)
        .join('text')
        .text((d) => d.total)
        .attr('text-anchor', 'center')
        .attr('x', (d) => x(d.year))
        .attr('width', x.bandwidth())
        .attr('y', (d) => y1(d.total))
        .attr('height', (d) => y1(0) - y1(d.total));
    },
    [data.length],
  );

  return (
    <div>
      <h2>how have the top medaling nations performed over time?</h2>
      <p>[ charts showing US, UK, Ger, Fra, Ita medals 1976-2016 ]</p>
      <p>medals for the US team dropped after the 2004 Athens games </p>
      <svg
        ref={ref}
        style={{
          height: 300,
          width: '100%',
          marginRight: '0px',
          marginLeft: '0px',
        }}
      >
        <g className="plot-area" />
        <g className="x-axis" />
        {/* <g className="y-axis" /> */}
        <g className="text" />
      </svg>
      {/* <ul>
        {medals.map(({ year, total }) => {
          return <li key={year}>total medals: {total}</li>;
        })}
      </ul> */}
    </div>
  );
}

export default TestChart;
