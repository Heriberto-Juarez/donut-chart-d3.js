import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const dimensions = {
	width: 216,
	height: 216,
	margin: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	}
}

const dataset = [30,50,10,10];

const container = d3.select("#container")
// create svg 
const svg = container
	.append("svg")
	.attr("width", dimensions.width)
	.attr("height", dimensions.height)

console.log('Container ',container)

const radius = Math.min(dimensions.width, dimensions.height)/2;
const innerRadius = radius * 0.6; // inner radius for donut effect
const outerRadius = radius;


const translateX = dimensions.width/2;
const translateY = dimensions.height/2;

// Donut group:
const donutGroup = svg
	.append('g')
	.attr('transform', `translate(${translateX}, ${translateY})`)


// Compute angles based on dataset 
// in our case the data already represents 100% for every data. 
// example: [50,50] (total 100), or: [50,25,25] (total: 100%)
const pie = d3.pie().value(d=>d) // value uses d as accessor

// Define the arc generator
const arc = d3
	.arc()
	.innerRadius(innerRadius)
	.outerRadius(outerRadius)


// Define the color scale
const colorScale = d3.scaleOrdinal(d3.schemeCategory10)


const arcs = donutGroup
	.selectAll("path")
	.data(pie(dataset))
	.enter()
	.append("path")
	.attr("d", arc)
	.attr("fill", (d,i)=>colorScale(i))
	.attr('stroke', '#ffffff')
	.attr('stroke-width', 2)


