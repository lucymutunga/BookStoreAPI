import Login from './components/login';
import Signup from './components/signup';
import {BrowserRouter as Router,Route, createBrowserRouter, RouterProvider} from 'react-router-dom';
function App() {
const router=createBrowserRouter([
  {
  path:"/",
  element:<Login/>,
},
{
  path:"/Signup",
  element:<Signup/>,
},
{
  path:"/login",
  element:<Login/>,
}
]);
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}
 
export default App;
