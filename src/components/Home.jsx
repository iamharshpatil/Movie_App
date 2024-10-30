import Sidenav from "../partials/Sidenav";
import Topnav from "../partials/Topnav";

function Home() {
    document.title = 'PrimeMax | Homepage';
  return (
     <>

     <Sidenav/>
     <div className="w-[80%] h-full">
        <Topnav/>
     </div>
     </>
  )
}

export default Home