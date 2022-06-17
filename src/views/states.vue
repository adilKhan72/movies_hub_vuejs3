<template>
  <div class="about">
    <div class="container">
      <div class="row" style="margin-top: 20px">
        <div class="col-sm-12">
          <Chart />
        </div>
      </div>
    </div>  
  </div>
</template>


<script>
  import Chart from '../components/Chart.vue';
  export default {
    name: 'states',
    components: {
      Chart,
    }
  };
</script>
