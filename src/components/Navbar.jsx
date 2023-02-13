import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import Cart from './Cart';
import { Chat, Notification, UserProfile } from './';
import { useStateContext } from '../context/ContextProvider';

const NavButton = ({ title, customFun, icon, color, dotColor }) => (
  <TooltipComponent content={title}>
    <button className='relative text-xl roudend full p-3 hover:bg-light-gray' style={{ color }} type="button" onClick={customFun}>
      <span className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' style={{ background: dotColor }} />{icon}
    </button>
  </TooltipComponent>


)

const Navbar = () => {
  const { activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick, screenSize, setScreenSize } = useStateContext()
  useEffect(() => {

    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()
    return () => window.addEventListener('resize', handleResize)
  }, [])
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false)
    } else {

      setActiveMenu(true)
    }
  }, [screenSize])

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton icon={<AiOutlineMenu />} color="blue" title="Menu" customFun={() => setActiveMenu(!activeMenu)} />
      <div className="flex ">
        <NavButton icon={<FiShoppingCart />} color="blue" title="Cart" customFun={() => handleClick('cart')} />
        <NavButton icon={<BsChatLeft />} color="blue" dotColor="#03c9d7" title="Chat" customFun={() => handleClick('chat')} />
        <NavButton icon={<RiNotification3Line />} color="blue" dotColor="#03c9d7" title="Notifications" customFun={() => handleClick('notification')} />
        <TooltipComponent
          content="Profile"
          position='BottomCenter'
        >
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg" onClick={() => handleClick('userProfile')}>
            <img className='rounded-full w-8 h-8' src={avatar} alt="avatar" />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{''}
              <span className="text-gray-400 font-bold ml-1 text-14">Hugo</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />

          </div>
        </TooltipComponent>
        {isClicked.cart && (<Cart />)}
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
  )
}

export default Navbar