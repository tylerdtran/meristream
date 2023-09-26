'use client';
import './page.scss';
import Image from 'next/image';
import Meristream_Logo from '@/images/Meristream-logo.png';
import Ellipse from '@/app/(components)/constants/constants';
// import { Session, User } from '@supabase/supabase-js';

// interface Props {
//   session: Session | null;
//   user: User | null | undefined;
//   // products: ProductWithPrices[];
//   subscription: SubscriptionWithProduct | null;
// } 

 export default function HomePage(
//   session,
//   user,
//   subscription
// }: Props
) {

    console.log('success')
    

    return (
        // <main className="flex h-screen flex-col items-center justify-between">
        <main className="h-screen">
        <div className="flex flex-col items-center justify-center h-full w-full">
        <div>Click the orb to begin!</div>
        {/* <div>Loading percent</div> */}
          <div className="meristream-logo-center flex items-center justify-center">
            <button>
              <Image className="meristream-logo" src={Meristream_Logo} priority alt="Meristream Logo" />
            </button>
          </div>

        </div>
        <div>
            {/* <Ellipse className="first-logo-circle" />
            <Ellipse className="second-logo-circle" />
            <Ellipse className="third-logo-circle" />
            <Ellipse className="fourth-logo-circle" /> */}
        </div>
      </main>
    );
}

