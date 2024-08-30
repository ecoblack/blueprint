<template>
  <div class="qr-generator">
    <div class="content-wrapper">
      <header class="hero-section">
        <div class="hero-content">
          <div class="hero-text">
            <h1>{{ headerText }}</h1>
            <p class="intro">{{ introText }}</p>
          </div>
          <div class="hero-image">
            <img src="@/assets/logo.png" alt="WiFi QR Code illustration" />
          </div>
        </div>
      </header>
      <main class="generator-section">
        <QRForm v-if="!qrValue" @generate="generateQR" />
        <LoadingSpinner v-else-if="loading" />
        <QRCode v-else :value="qrValue" @reset="resetQR" @share="shareQR" />
      </main>
    </div>
  </div>
</template>

<script>
import QRForm from './QRForm.vue'
import QRCode from './QRCode.vue'
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  name: 'QRGenerator',
  components: {
    QRForm,
    QRCode,
    LoadingSpinner
  },
  data() {
    return {
      qrValue: '',
      loading: false
    }
  },
  computed: {
    headerText() {
      return this.qrValue 
        ? "Here's your code! 🎉" 
        : this.$t('message.app_title')
    },
    introText() {
      return this.qrValue 
        ? "Scan this QR code to connect to the WiFi network" 
        : this.$t('message.app_description')
    }
  },
  methods: {
    async generateQR(formData) {
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 300)) // Simulate loading
      this.qrValue = `WIFI:T:${formData.encryption};S:${formData.ssid};P:${formData.password};;`
      this.loading = false
    },
    resetQR() {
      this.qrValue = ''
    },
    shareQR() {
      if (navigator.share) {
        navigator.share({
          title: 'WiFi QR Code',
          text: 'Scan this QR code to connect to WiFi',
          url: window.location.href
        }).catch(console.error)
      } else {
        alert('Sharing is not supported on this browser')
      }
    }
  }
}
</script>

<style scoped>
/* Font Import */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;600&display=swap');
.qr-generator {
  max-width: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  color: #333;
}

.content-wrapper {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
}
.hero-section {
  flex: 1;
  background-color: #331333;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start; /* Change from center to flex-start */
  justify-content: center;
  min-height: 50vh;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 40px;
  color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero-text {
  max-width: 80%;
  z-index: 2;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center; /* Add this line to position the image from the top */
  opacity: 0.6;
}


.generator-section {
  flex: 1;
  background-color: #fff;
  padding: 40px;
}
/* Headings */
h1 {
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #fff; /* Ensure text color is white for visibility */
}
.intro {
  font-size: 1.25rem;
  line-height: 1.6;
  text-align: left;
  color: #f1faee; /* Lightened text for contrast */
}

/* Form Styles */
.input-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input, select {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

/* Button Styles */
button {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button.primary {
  background-color: #331333; /* Deep Blue */
  color: #fff;
}

button.primary:hover:not(:disabled) {
  background-color: #457b9d; /* Slightly lighter for hover */
}

button.secondary {
  background-color: #fff;
  color: #1d3557;
  border: 1px solid #331333;
}

button.secondary:hover:not(:disabled) {
  background-color: #f1faee;
}

/* QR Code Section */
.qr-code {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

/* Button Group */
.button-group {
  display: flex;
  gap: 1rem;
}

@media (max-width: 480px) {
  .button-group {
    flex-direction: column;
  }
}

/* Update the media query */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }

  .hero-section {
    min-height: 40vh;
  }

  .hero-text {
    max-width: 100%;
  }

  .generator-section {
    position: relative;
    padding: 30px;
    border-radius: 20px 20px 0 0;
    z-index: 3;
    margin-top: -20px;
    background-color: #fff;
  }
}


@media (max-width: 768px) {


  .hero-content {
    flex-direction: column;
    justify-content: center;
  }

  .hero-text {
    max-width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }

  .hero-image {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.3; /* Add transparency to the image on mobile */
  }

}
</style>
