<template>
  <div class="qr-code-container">
    <div class="qr-code-card">
      <transition name="fade" mode="out-in">
        <div v-if="isQRLoading" key="loading" class="loading-spinner">
          <LoadingSpinner />
        </div>
        <QrcodeVue
          v-else
          key="qrcode"
          :value="value"
          :size="280"
          level="H"
          render-as="svg"
          class="qr-code-svg"
        ></QrcodeVue>
      </transition>
    </div>
    <div class="button-group">
      <button @click="copyToClipboard" class="btn btn-primary" :disabled="isQRLoading">
        <i class="fas fa-copy"></i> {{ $t('message.copy') }}
      </button>
      <button @click="downloadQR" class="btn btn-primary" :disabled="isQRLoading">
        <i class="fas fa-download"></i> {{ $t('message.download') }}
      </button>
      <button @click="$emit('share')" class="btn btn-secondary" :disabled="isQRLoading">
        <i class="fas fa-share-alt"></i> {{ $t('message.share') }}
      </button>
      <button @click="$emit('reset')" class="btn btn-outline" :disabled="isQRLoading">
        <i class="fas fa-redo"></i> {{ $t('message.generate_new') }}
      </button>
    </div>
    <Notification :show="showNotification" message="QR code copied to clipboard!" />
  </div>
</template>

  <script>
import QrcodeVue from 'qrcode.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import Notification from './Notification.vue'

  export default {
    name: 'QRCode',
    components: {
    QrcodeVue,
    LoadingSpinner,
    Notification
  },
    props: {
      value: {
        type: String,
        required: true
      }
    },
    data() {
    return {
      isQRLoading: true,
      showNotification: false
    }
  },
  mounted() {
    // Simulate loading time
    setTimeout(() => {
      this.isQRLoading = false
    }, 1) // Adjust this value to control how long the spinner shows
  },
    methods: {
      downloadQR() {
        const svgElement = this.$el.querySelector('svg')
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
      async copyToClipboard() {
      const svgElement = this.$el.querySelector('svg')
      if (svgElement) {
        try {
          const svgData = new XMLSerializer().serializeToString(svgElement)
          const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'})

          const item = new ClipboardItem({ "image/svg+xml": svgBlob })
          await navigator.clipboard.write([item])

          this.showNotification = true
          setTimeout(() => {
            this.showNotification = false
          }, 3000) // Hide notification after 3 seconds
        } catch (err) {
          console.error('Failed to copy: ', err)
          // You might want to show an error notification here
        }
      } else {
        console.error('SVG element not found')
      }
    },
    }
  }
  </script>
  
  <style scoped>

</style>