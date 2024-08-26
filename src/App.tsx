import WelcomeScreen from './WelcomeScreen/WelcomeScreen'
import CoursePlan from './CoursePlan/CoursePlan';
import MandatoryCoursesPage from './CoursePages/MandatoryCoursesPage';
import AnalyzerPage from './AnalyzerPage/AnalyzerPage';
import Header from './common/Header/Header';
import { useStyles } from './App.classNames'
function App() {
  const rootStyles = useStyles();
  return (
    <div className={rootStyles.appRoot}>
      <Header />
      {/* <WelcomeScreen /> */}
      {/* <MandatoryCoursesPage /> */}
      {/* <CoursePlan /> */}
      <AnalyzerPage />
    </div>
  )
}

export default App
