import notfound from "/404.gif";

const Notfound = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
        <img src={notfound} alt="" />
    </div>
  )
}

export default Notfound