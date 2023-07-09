import './page.scss';
import Image from 'next/image';
import Meristream_Logo from '@/images/Meristream-logo.png';
import Ellipse from '@/app/(components)/constants/constants';


export default function HomePage() {
    return (
        // <main className="flex h-screen flex-col items-center justify-between">
        <main className="h-screen">
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="meristream-logo-center flex items-center justify-center">
            <Image className="meristream-logo" src={Meristream_Logo} alt="Meristream Logo" />
          </div>
          <div>Click the orb to begin!</div>
        </div>
        <div>
            {/* <div className="ellipse-container"> */}
            <Ellipse className="first-logo-circle" />
          {/* </div>
          <div className="ellipse-container"> */}
            <Ellipse className="second-logo-circle" />
          {/* </div>
          <div className="ellipse-container"> */}
            <Ellipse className="third-logo-circle" />
          {/* </div>
          <div className="ellipse-container"> */}
            <Ellipse className="fourth-logo-circle" />
          {/* </div>
          <div className="ellipse-container">
            <Ellipse className="radial1-circle" />
          </div>
          <div className="ellipse-container">
            <Ellipse className="radial2-circle" />
          </div>
          <div className="ellipse-container">
            <Ellipse className="radial3-circle" />
          </div> */}
        </div>
      </main>
    );
}