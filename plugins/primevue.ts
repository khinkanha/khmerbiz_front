import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Checkbox from 'primevue/checkbox'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Editor from 'primevue/editor'
import FileUpload from 'primevue/fileupload'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import Message from 'primevue/message'
import Paginator from 'primevue/paginator'
import Password from 'primevue/password'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import Slider from 'primevue/slider'
import Tag from 'primevue/tag'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import ToggleSwitch from 'primevue/toggleswitch'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      }
    }
  })

  nuxtApp.vueApp.use(ConfirmationService)
  nuxtApp.vueApp.use(ToastService)

  const components = {
    Button, Calendar, Card, Carousel, Checkbox, Column, ConfirmDialog,
    DataTable, Dialog, Dropdown, Editor, FileUpload, InputNumber, InputText,
    Menu, Message, Paginator, Password, ProgressBar, ProgressSpinner,
    Slider, Tag, Textarea, Toast, ToggleSwitch,
  }

  for (const [name, component] of Object.entries(components)) {
    nuxtApp.vueApp.component(name, component)
  }
})
