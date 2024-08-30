<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
     <QRGenerator />
  </div>
</template>

<script>
// @ is an alias to /src
import QRGenerator from '@/components/QRGenerator.vue';

export default {
  name: 'HomeView',
  components: {
    QRGenerator
  }
}
</script>
