<template>
  <form @submit.prevent="onSubmit" class="input-form">
    <div class="form-group">
      <label for="ssid">{{ $t('message.wifi_name') }}</label>
      <input 
        v-model.trim="ssid" 
        id="ssid" 
        type="text" 
        required 
        :placeholder="$t('message.enter_wifi_name')"
        @input="validateForm"
      >
    </div>
    <div class="form-group">
      <label for="password">{{ $t('message.password') }}</label>
      <input 
        v-model.trim="password" 
        id="password" 
        type="password" 
        required 
        :placeholder="$t('message.enter_wifi_password')"
        @input="validateForm"
      >
    </div>
    <div class="form-group">
      <label for="encryption">{{ $t('message.encryption') }}</label>
      <select v-model="encryption" id="encryption" @change="validateForm">
        <option value="WPA">{{ $t('message.wpa') }}</option>
        <option value="WEP">{{ $t('message.wep') }}</option>
        <option value="nopass">{{ $t('message.no_password') }}</option>
      </select>
    </div>
    <button type="submit" :disabled="!isFormValid" :class="{ 'active': isFormValid }">{{ $t('message.generate') }}</button>
  </form>
</template>
  
  <script>
  export default {
    name: 'QRForm',
    data() {
      return {
        ssid: '',
        password: '',
        encryption: 'WPA',
        isFormValid: false
      }
    },
    methods: {
      validateForm() {
        this.isFormValid = this.ssid.length > 0 && 
          (this.encryption === 'nopass' || this.password.length > 0)
      },
      onSubmit() {
        if (this.isFormValid) {
          this.$emit('generate', {
            ssid: this.ssid,
            password: this.password,
            encryption: this.encryption
          })
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* ... (keep existing form styles) ... */
  button {
    /* ... (existing button styles) ... */
    opacity: 0.6;
    transition: opacity 0.3s ease, background-color 0.3s ease;
  }
  
  button.active {
    opacity: 1;
    color: white;
    background-color: #4c224f;
  }
  
  button.active:hover {
    background-color: #45a049;
  }
  </style>