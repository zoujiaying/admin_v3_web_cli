import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import authDirective from '@/directives/checkAuth'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ELIcons from '@element-plus/icons-vue'

import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
import 'normalize.css'
import 'virtual:svg-icons-register'
import 'remixicon/fonts/remixicon.css'
import { painaInstall } from '@/store/plugins'

const app = createApp(App)

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

function useTable(app: App) {
	app.use(VXETable)
}

for (const name in ELIcons) {
	app.component(name, (ELIcons as any)[name])
}
if (import.meta.env.MODE === 'development') {
	app.use(ElementPlus)
}
app.use(useTable)
app.use(painaInstall)
app.use(authDirective)
app.use(router)
app.mount('#app')
