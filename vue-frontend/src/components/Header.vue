<template>
    <header class="header">
      <div class="logo">FreeQRWifi</div>
      <nav class="menu" :class="{ 'menu-open': isMenuOpen }">
        <RouterLink to="/"  @click="closeMenu">{{ $t('menu.home') }}</RouterLink>
        <RouterLink to="/about"  @click="closeMenu"> {{ $t('menu.about') }}</RouterLink>
        <RouterLink to="/services"  @click="closeMenu">{{ $t('menu.services') }} </RouterLink>
        <RouterLink to="/contact"  @click="closeMenu">{{ $t('menu.contact') }} </RouterLink>
        <LanguageSwitch />
      </nav>
      <div class="burger" @click="toggleMenu">☰</div>
      <div class="overlay" v-if="isMenuOpen">
        <span class="close-btn" @click="closeMenu">&times;</span>
        <div class="overlay-content">
          <a href="#" @click="closeMenu">Home</a>
          <a href="#" @click="closeMenu">About</a>
          <a href="#" @click="closeMenu">Services</a>
          <a href="#" @click="closeMenu">Contact</a>
        </div>
      </div>
    </header>
  </template>
  
  <script>
  import LanguageSwitch from './LanguageSwitch.vue'

  export default {
    name: 'Header',
    components: {
      LanguageSwitch
    },
    data() {
      return {
        isMenuOpen: false
      }
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen
      },
      closeMenu() {
        this.isMenuOpen = false
      }
    }
  }
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f8f8f8;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .menu {
    display: flex;
    gap: 1rem;
  }
  
  .menu a {
    text-decoration: none;
    color: #333;
  }
  
  .burger {
    display: none;
    cursor: pointer;
    font-size: 1.5rem;
  }
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1000;
  }
  
  .overlay-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .overlay a {
    color: white;
    text-decoration: none;
    font-size: 1.5rem;
    margin: 1rem 0;
  }
  
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: white;
    font-size: 2rem;
    cursor: pointer;
  }
  
  @media (max-width: 768px) {
    .menu {
      display: none;
    }
  
    .menu-open {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: #f8f8f8;
      padding: 1rem;
    }
  
    .burger {
      display: block;
    }
  }
  </style>