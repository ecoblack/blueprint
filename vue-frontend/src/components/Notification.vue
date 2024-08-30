<template>
    <transition name="slide-fade">
      <div v-if="show" class="notification">
        <i class="fas fa-check-circle"></i>
        <span>{{ $t('message.copied') }}</span>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'Notification',
    props: {
      show: Boolean,
      message: String
    }
  }
  </script>
  
  <style scoped>
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #34c759;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .notification i {
    margin-right: 10px;
    font-size: 1.2em;
  }
  
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter-from, .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  </style>