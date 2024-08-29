import { Outlet } from 'react-router-dom';
import { useStyles } from './App.classNames'
function App() {
  const rootStyles = useStyles();
  return (
    <div className={rootStyles.appRoot}>
      <Outlet />
    </div>
  )
}
export default App
