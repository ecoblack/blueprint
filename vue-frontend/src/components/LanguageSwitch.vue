<template>
    <select v-model="$i18n.locale">
      <option value="en">🇬🇧 English</option>
      <option value="de">🇩🇪 Deutsch</option>
    </select>
  </template>
  
  <script>
  export default {
    name: 'LanguageSwitch'
  }
  </script>
  
  <style scoped>
  select {
    padding: 5px;
    font-size: 16px;
    border-radius: 4px;
  }
  </style>
  