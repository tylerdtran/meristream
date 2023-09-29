"use client";
import "./page.scss";
import Image from "next/image";
import Meristream_Logo from "@/images/Meristream-logo.png";
import Ellipse from "@/app/(components)/constants/constants";
// import { Session, User } from '@supabase/supabase-js';
import Lottie from "lottie-react";
import SoundAnimation from "../../../animations/meristream app animation desktop with button.json";

// interface Props {
//   session: Session | null;
//   user: User | null | undefined;
//   // products: ProductWithPrices[];
//   subscription: SubscriptionWithProduct | null;
// }

export default function HomePage() {
//   session,
//   user,
//   subscription
// }: Props
  console.log("success");

  return (
    // <main className="flex h-screen flex-col items-center justify-between">
    <div className="homepage-container">
      <div className="flex flex-col items-center justify-center">
        <div className="lottie-container">
          <Lottie
            animationData={SoundAnimation}
            loop={false}
            className="lottie"
          >
            {" "}
          </Lottie>
        </div>
        {/* <div className="flex flex-col items-center justify-center index">
                <div>Click the orb to begin!</div>
                <div className="meristream-logo-center flex items-center justify-center">
                  <button>
                    <Image className="meristream-logo" src={Meristream_Logo} priority alt="Meristream Logo" />
                  </button>
                </div>
              </div> */}
      </div>
    </div>
  );
}
