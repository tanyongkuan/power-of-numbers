// import Image from "next/image";
// import logo from '@/app/icon.png'
// export default function Page() {
//   return (
//     <>

//       <main className="bg-[#272727] flex min-h-screen flex-col text-[#bdb3b3] items-center justify-center text-center gap-12 p-8">
//         {/* <h1 className="text-3xl font-extrabold">Ship Fast ⚡️</h1> */}
//         <div className='flex flex-row'>
//           <Image
//             src={logo}
//             alt={`logo`}
//             className="w-8 mr-2"
//             placeholder="blur"
//             priority={true}
//           />

//           <span className="font-extrabold text-lg">Ship Fast</span>
//         </div>

//         <p className="text-lg opacity-80">
//           The start of your new startup... What are you gonna build?
//         </p>

//         <a
//           className="btn btn-primary"
//           href="https://shipfa.st/docs"
//           target="_blank"
//         >
//           Documentation & tutorials{" "}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//             className="w-5 h-5"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </a>
//       </main>
//     </>
//   );
// }
import { Suspense } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
// import Problem from '@/components/Problem';
// import FeaturesAccordion from '@/components/FeaturesAccordion';
import FeaturesListicle from '@/components/FeaturesListicle';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
	return (
		<>
			<Suspense>
				<Header />
			</Suspense>
			<main>
				<Hero />
				{/* <Problem /> */}
				<FeaturesListicle />
				<Pricing />
				<FAQ />
				<CTA />
			</main>
			<Footer />
		</>
	);
}
