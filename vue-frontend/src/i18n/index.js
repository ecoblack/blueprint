import { createI18n } from 'vue-i18n'

const messages = {
    en: {
      message: {
        hello: 'Hello',
        wifi_name: 'WiFi Name (SSID)',
        password: 'Password',
        encryption: 'Encryption',
        generate: 'Generate QR Code',
        download: 'Download QR Code',
        share: 'Share QR Code',
        generate_new: 'Generate New QR Code',
        enter_wifi_name: 'Enter WiFi name',
        enter_wifi_password: 'Enter WiFi password',
        wpa: 'WPA/WPA2',
        wep: 'WEP',
        no_password: 'No Password',
        app_title: 'WiFi QR Code Generator',
        app_description: 'Create a QR code for your WiFi network. Visitors can scan this code to connect instantly without typing a password.',
        share_title: 'WiFi QR Code',
        share_text: 'Scan this QR code to connect to WiFi',
        share_not_supported: 'Sharing is not supported on this browser',
        copy: 'Copy QR!',
        copied: 'QR copied to clipboard!'
      },
      menu: {
        home: 'Home',
        about: 'About',
        contact: 'Contact',
        services: 'Services'
      }
    },
    de: {
      message: {
        hello: 'Hallo',
        wifi_name: 'WLAN-Name (SSID)',
        password: 'Kennwort',
        encryption: 'Verschlüsselung',
        generate: 'QR-Code generieren',
        download: 'QR-Code herunterladen',
        share: 'QR-Code teilen',
        generate_new: 'Neuen QR-Code generieren',
        enter_wifi_name: 'WLAN-Name eingeben',
        enter_wifi_password: 'WLAN-Passwort eingeben',
        wpa: 'WPA/WPA2',
        wep: 'WEP',
        no_password: 'Kein Passwort',
        app_title: 'WiFi QR Code Generator',
        app_description: 'Erstellen Sie einen QR-Code für Ihr WLAN-Netzwerk. Besucher können diesen Code scannen, um sich sofort zu verbinden, ohne ein Passwort einzugeben.',
        share_title: 'WiFi QR Code',
        share_text: 'Scannen Sie diesen QR-Code, um sich mit dem WLAN zu verbinden',
        share_not_supported: 'Das Teilen wird in diesem Browser nicht unterstützt',
        copy: 'QR kopieren!',
        copied: 'QR gekopieren!'
      },
      menu: {
        home: 'Home',
        about: 'Über uns',
        contact: 'Kontakte',
        services: 'Services'
      }
    }
  }

const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})

export default i18n