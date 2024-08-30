<template>
  <div class="qr-generator">
    <header>
      <h1>WiFi QR Code Generator</h1>
      <p class="intro">Create a QR code for your WiFi network. Visitors can scan this code to connect instantly without typing a password.</p>
    </header>

    <main>
      <form @submit.prevent="generateQR" class="input-form">
        <div class="form-group">
          <label for="ssid">WiFi Name (SSID)</label>
          <input 
            v-model.trim="ssid" 
            id="ssid" 
            type="text" 
            required 
            placeholder="Enter WiFi name"
            @input="validateForm"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            v-model.trim="password" 
            id="password" 
            type="password" 
            required 
            placeholder="Enter WiFi password"
            @input="validateForm"
          >
        </div>
        <div class="form-group">
          <label for="encryption">Encryption</label>
          <select v-model="encryption" id="encryption" @change="validateForm">
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No Password</option>
          </select>
        </div>
        <button type="submit" :disabled="!isFormValid">Generate QR Code</button>
      </form>

      <div v-if="qrValue" class="qr-code">
        <QrcodeVue
          :value="qrValue"
          :size="300"
          level="H"
          render-as="svg"
        ></QrcodeVue>
        <div class="button-group">
          <button @click="downloadQR" class="primary">Download QR Code</button>
          <button @click="resetQR" class="secondary">Generate New QR Code</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'QRGenerator',
  components: {
    QrcodeVue
  },
  data() {
    return {
      ssid: '',
      password: '',
      encryption: 'WPA',
      qrValue: '',
      isFormValid: false
    }
  },
  methods: {
    validateForm() {
      this.isFormValid = this.ssid.length > 0 && 
        (this.encryption === 'nopass' || this.password.length > 0)
    },
    generateQR() {
      this.qrValue = `WIFI:T:${this.encryption};S:${this.ssid};P:${this.password};;`
      console.log('Generated QR value:', this.qrValue)
    },
    downloadQR() {
      const svgElement = this.$el.querySelector('.qr-code svg')
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement)
        const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'})
        const svgUrl = URL.createObjectURL(svgBlob)
        
        const downloadLink = document.createElement('a')
        downloadLink.href = svgUrl
        downloadLink.download = 'wifi-qr-code.svg'
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        
        URL.revokeObjectURL(svgUrl)
      } else {
        console.error('SVG element not found')
      }
    },
    resetQR() {
      this.qrValue = ''
      this.ssid = ''
      this.password = ''
      this.encryption = 'WPA'
      this.isFormValid = false
    }
  }
}
</script>

<style scoped>

</style>