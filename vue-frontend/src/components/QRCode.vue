<template>
  <div class="qr-code-container">
    <div class="qr-code-card">
      <QrcodeVue
        :value="value"
        :size="280"
        level="H"
        render-as="svg"
        class="qr-code-svg"
      ></QrcodeVue>
    </div>
    <div class="button-group">
      <button @click="downloadQR" class="btn btn-primary">
        <i class="fas fa-download"></i> {{ $t('message.download') }}
      </button>
      <button @click="$emit('share')" class="btn btn-secondary">
        <i class="fas fa-share-alt"></i> {{ $t('message.share') }}
      </button>
      <button @click="$emit('reset')" class="btn btn-outline">
        <i class="fas fa-redo"></i> {{ $t('message.generate_new') }}
      </button>
    </div>
    <div class="credits">
      <p>QR Code technology © DENSO WAVE INCORPORATED.</p>
      <p>Website by <a href="#" class="credit-link">Pine Hill Digital Agency</a></p>
    </div>
  </div>
</template>

  <script>
  import QrcodeVue from 'qrcode.vue'
  
  export default {
    name: 'QRCode',
    components: {
      QrcodeVue
    },
    props: {
      value: {
        type: String,
        required: true
      }
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
      }
    }
  }
  </script>
  
  <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.qr-code-container {
  max-width: 340px;
  margin: 2rem auto;
  padding: 1.5rem;
  font-family: 'Roboto', sans-serif;
  color: #333;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.qr-code-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.qr-code-card:hover {
  transform: translateY(-5px);
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
  background-color: #4a90e2;
  color: white;
}

.btn-secondary {
  background-color: #34c759;
  color: white;
}

.btn-outline {
  background-color: transparent;
  color: #4a90e2;
  border: 1px solid #4a90e2;
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
    padding: 1rem;
  }
  
  .qr-code-card {
    padding: 1rem;
  }
}
</style>