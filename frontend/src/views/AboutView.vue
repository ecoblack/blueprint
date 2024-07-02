<template>
  <div class="about">


    <p>
      upload your photo...
    </p>
    <input type="file" @change="onFileChange" accept="image/*">
    <img v-if="imageUrl" :src="imageUrl" alt="Uploaded image">
    <button @click="applyFilter" :disabled="!imageUrl">Apply GameBoy Filter</button>
    <img v-if="filteredImageUrl" :src="filteredImageUrl" alt="Filtered image">
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const imageUrl = ref(null)
    const filteredImageUrl = ref(null)

    const onFileChange = (e) => {
      const file = e.target.files[0]
      imageUrl.value = URL.createObjectURL(file)
    }

    const applyFilter = async () => {
      const formData = new FormData()
      formData.append('image', await fetch(imageUrl.value).then(r => r.blob()))

      try {
        const response = await axios.post('http://localhost:3000/api/apply_filter', formData)
        filteredImageUrl.value = `data:image/png;base64,${response.data.filtered_image}`
      } catch (error) {
        console.error('Error applying filter:', error)
      }
    }

    return {
      imageUrl,
      filteredImageUrl,
      onFileChange,
      applyFilter
    }
  }
}
</script>

<style>
.about {
  text-align: center;
  margin-top: 20px;
}

img {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}
</style>
