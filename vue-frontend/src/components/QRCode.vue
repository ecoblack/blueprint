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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
.qr-code-container {
  max-width: 340px;
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  color: #333;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}


.qr-code-card {
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  overflow: hidden;
}

.loading-spinner-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.qr-code-card:hover {
  transform: translateY(-5px);
}
.qr-code-container:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}
.qr-code-svg {
  display: block;
  margin: 0 auto;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn i {
  margin-right: 0.5rem;
}

.btn-primary {
  background-color: #34c759;
  color: white;
}

.btn-secondary {
  background-color: #4c224f;
  color: white;
}

.btn-outline {
  background-color: transparent;
  color: #4c224f;
  border: 1px solid #4c224f;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.credits {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  text-align: center;
  color: #666;
}

.credit-link {
  color: #4a90e2;
  text-decoration: none;
}

.credit-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .qr-code-container {
    padding: 0;
  }
  
  .qr-code-card {
    padding: 1rem;
  }
}
</style>