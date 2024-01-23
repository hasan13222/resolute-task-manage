import { Outlet } from "react-router-dom"
import Header from "../AllShared/Header"
import Footer from "../AllShared/Footer"

const Root = () => {
  return (
    <>  
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Root