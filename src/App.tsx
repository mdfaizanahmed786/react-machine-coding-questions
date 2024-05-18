import './App.css'
import Accordion from "./components/Accordion"
import ImageSlider from './components/ImageSlider'
import LoadMore from "./components/LoadMore";
import StarHover from './components/StarHover'
import CustomTab from "./components/CustomTab";
import SearchUser from './components/LightModeDark';
import LikeButton from './components/LikeButton';
import Pagination from './components/Pagination';
import ProgressBar from './components/ProgressBar';
import PasswordGenerator from './components/PasswordGenerator';
import JobBoard from './components/JobBoard';
import GridLights from './components/GridLights';
import QuizApp from './components/QuizApp';
// import EcommerceSlider from './components/EcommerceSlider';
import GridSelect from './components/GridSelect';
export default function App() {
  return (
    <main>
    {/* <Accordion/> */}
    {/* <StarHover/> */}
      {/* <ImageSlider/> */}
      {/* <LoadMore/> */}
      {/* <CustomTab/> */}
      {/* <SearchUser/> */}
      {/* <LikeButton/> */}
      {/* <Pagination/> */}   
      {/* <ProgressBar/> */}
      {/* <PasswordGenerator/> */}
      {/* <JobBoard/> */}
      {/* <GridLights/> */}
      {/* <QuizApp/> */}
      {/* <EcommerceSlider/> */}
      <GridSelect cols={15} rows={15}/>
    </main>
  )
}