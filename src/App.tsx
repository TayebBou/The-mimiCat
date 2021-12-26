import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './routes'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '@fontsource/baloo-2'

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
