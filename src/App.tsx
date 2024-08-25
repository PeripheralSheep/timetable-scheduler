import WelcomeScreen from './WelcomeScreen/WelcomeScreen'
import MandatoryCoursesPage from './CoursePages/MandatoryCoursesPage';
import Header from './common/Header/Header';
import { useStyles } from './App.classNames'
function App() {
  const rootStyles = useStyles();
  return (
    <div className={rootStyles.appRoot}>
      <Header />
      {/* <WelcomeScreen /> */}
      <MandatoryCoursesPage />
    </div>
  )
}

export default App
