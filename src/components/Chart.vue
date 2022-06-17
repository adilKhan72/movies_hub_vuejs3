<template>
  <div class="title">Worldwide Covid-19 Deaths</div>
  <div v-if="selectedItem" class="tooltip">
    <p>Deaths as of: {{ selectedItem.date }}</p>
    <p class="count">
      {{
        selectedItem.total_deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }}
    </p>
  </div>
  <svg v-if="items" ref="svg" viewBox="0 0 600 400">
    <g :transform="`translate(${margin.left},${margin.top})`">
      <g>
        <rect
          v-for="(item, index) in items"
          :key="index"
          class="bar"
          :x="scaleX(item.date)"
          :y="scaleY(item.total_deaths)"
          :width="scaleX.bandwidth()"
          :height="height - scaleY(item.total_deaths)"
          @mouseover="selectedItem = item"
        />
      </g>
      <g v-if="items" ref="xAxis" :transform="`translate(0,${height})`">
      </g>
      <g v-if="items" ref="yAxis">
      </g>
    </g>
  </svg>
</template>

<script>
import axios from "axios";
import * as d3 from 'd3';
export default {
  name: "BarChart",
  data() {
    return {
      outsideWidth: 600,
      outsideHeight: 400,
      margin: {
        left: 50,
        top: 10,
        right: 10,
        bottom: 40,
      },
      items: [],
      selectedItem: null
    }
  },
  
  computed: {
    width() {
      return this.outsideWidth - this.margin.left - this.margin.right
    },
    
    height() {
      return this.outsideHeight - this.margin.top - this.margin.bottom
    },
    
    scaleX () {
     return d3.scaleBand()
       .rangeRound([0, this.width]).padding(0.1)
       .domain(this.items.map(x => x.date)) 
    },
    
    scaleY () {
      return d3.scaleLinear()
        .rangeRound([this.height, 0])
        .domain([0, Math.max(...this.items.map(x => x.total_deaths))])
    },
    
    xAxisTickValues () {
    	 return this.items
    }
  },
  
  watch: {
    items () {
      this.updateXAxis()
      this.updateYAxis()
    }
  },
  created () {
    axios.get('https://api.github.com/gists/903c1e837ad98fc7e50b693af78b8e7e')
      .then(response => {
        console.log(response);
        this.items = this.statesJson = JSON.parse(response.data.files['covid_deaths.json'].content)
        this.selectedItem = this.items[this.items.length - 1]
      })
      .catch(error => {
      console.log(error)
    })
  },
  methods: {
    updateXAxis () {
      let tickValues = this.scaleX.domain().filter((date, i) => { return i % 7 === 0 })
      d3.select(this.$refs.xAxis)
        .attr('class', 'axis axis--x')
        .call(d3.axisBottom(this.scaleX).tickValues(tickValues))
    },
    
    updateYAxis () {
      d3.select(this.$refs.yAxis).append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(this.scaleY))
    }
  }
};
</script>
<style scoped>
.title {
  margin-top: 15px;
  font-size: 2.0em;
  font-weight: bold;
  font-family: Helvetica, sans-serif;
  text-align: center;
  color: #333;
}
rect.bar {
  stroke: none;
  fill: crimson;
}
rect.bar:hover {
  fill: #333;
}
.axis path,
.axis .tick line {
  stroke: darkslategrey;
}
.tooltip {
  position: absolute;
  border: solid 1px #333;
  margin-left: 80px;
  margin-top: 20px;
  padding: 15px;
  text-align: center;
}
.tooltip .count {
  font-size: 2em;
  font-family: arial;
  font-weight: bold;
  color: crimson;
  margin: 5px;
}
</style>