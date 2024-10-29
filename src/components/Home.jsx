import Sidenav from "../partials/Sidenav";

function Home() {
    document.title = 'PrimeMax | Homepage';
  return (
     <>

     <Sidenav/>
     <div className="w-[80%] h-full"></div>
     </>
  )
}

export default Home