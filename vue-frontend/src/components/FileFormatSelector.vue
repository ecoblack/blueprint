<template>
    <div class="file-format-selector">
      <button 
        v-for="format in formats" 
        :key="format"
        @click="selectFormat(format)"
        :class="{ 'active': selectedFormat === format }"
      >
        {{ format }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FileFormatSelector',
    data() {
      return {
        formats: ['PNG', 'JPEG', 'SVG'],
        selectedFormat: 'SVG'
      }
    },
    methods: {
      selectFormat(format) {
        this.selectedFormat = format;
        this.$emit('format-selected', format);
      }
    }
  }
  </script>
  
  <style scoped>
  .file-format-selector {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  button {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    margin: 0;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  button:first-child {
    border-radius: 4px 0 0 4px;
  }
  
  button:last-child {
    border-radius: 0 4px 4px 0;
  }
  
  button.active {
    background-color: #4c224f;
    color: white;
  }
  </style>