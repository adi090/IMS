
import AppRoutes from './Routes'
import 'flowbite';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  return (
   <SidebarProvider>
     <AppRoutes/>
   </SidebarProvider>
  )
}

export default App
