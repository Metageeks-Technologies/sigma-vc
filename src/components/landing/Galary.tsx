import * as React from "react";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={className} />
);

interface SectionProps {
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  isReversed?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  isReversed = false,
}) => (
  <section className="flex gap-5 max-md:flex-col max-md:gap-0">
    {!isReversed && (
      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col items-start pt-20 pr-8 pb-11 pl-20 max-md:px-5 max-md:max-w-full">
            <h3 className="mt-6 text-base tracking-widest leading-5 uppercase bg-clip-text max-md:max-w-full">
              {title}
            </h3>
            <h2 className="mt-16 text-5xl text-white leading-[58px] max-md:mt-10 max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
              {description}
            </h2>
          </div>
          <p className="self-start mt-6 text-xl leading-8 text-gray-300 max-md:max-w-full">
            Elevate your ventures with Legion OTC Platform, ensuring <br />
            security for investments in top web3 projects. Our robust <br />
            security framework guarantees worry-free exploration of <br />
            the dynamic world of digital assets.
          </p>
        </div>
      </div>
    )}
    <div
      className={`flex flex-col ${
        isReversed ? "w-6/12" : "ml-5 w-6/12"
      } max-md:ml-0 max-md:w-full`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        className="grow mt-24 w-full aspect-[1.54] max-md:mt-10 max-md:max-w-full"
      />
    </div>
    {isReversed && (
      <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col px-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col pt-20 pb-11 max-md:px-5 max-md:max-w-full">
            <h3 className="mt-6 text-base tracking-widest leading-5 uppercase bg-clip-text max-md:max-w-full">
              {title}
            </h3>
            <h2 className="mt-16 text-5xl text-white leading-[58px] max-md:mt-10 max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
              {description}
            </h2>
          </div>
          <p className="self-end mt-6 text-xl leading-8 text-gray-300 max-md:max-w-full">
            Welcome to Legion, the future of trading, where <br />
            revolutionary 0% commission structure grants <br />
            unrestricted access to seamless deals. Participate in any <br />
            trade for automatic eligibility in a future token airdrop, <br />
            enhancing your crypto journey.
          </p>
        </div>
      </div>
    )}
  </section>
);

const LandingPage: React.FC = () => {
  const partnerLogos = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/09ee714ba61a11b65ca2faae4465d98979963a792f9b555b8987e9af61b414a2?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      alt: "Partner 1",
      className: "shrink-0 max-w-full aspect-[3.7] w-[148px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a8cd9e245e6aac61590f72f5d852f44f223a3c63d4c9918649fce62182747efa?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      alt: "Partner 2",
      className: "shrink-0 my-auto max-w-full aspect-[5.56] w-[154px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d6569bcffe6ec15068a86a31c40f3b04a208bafc65658a30b56c78283ef1702?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      alt: "Partner 3",
      className: "shrink-0 max-w-full aspect-[4] w-[158px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6cd612141c038d8e3378530ce412dfbfdbe036d120536e9886ad49f2a830f8be?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      alt: "Partner 4",
      className: "shrink-0 my-auto max-w-full aspect-[5.88] w-[167px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f0d9fa4f4e4deeb11e445ecc4a91dd5c594135c3aeab48e389cb0ffea8bbd368?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      alt: "Partner 5",
      className: "shrink-0 max-w-full aspect-[3.13] w-[124px]",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9a1f40fae017d17f038ce72795019a8768d6f599ea2374a1e697676031cc5d64?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      alt: "Partner 6",
      className: "shrink-0 self-start aspect-[2.27] w-[86px]",
    },
  ];

  return (
    <main className="flex flex-col">
      <header className="flex flex-col self-center p-20 w-full max-w-screen-xl max-md:px-5 max-md:max-w-full">
        <h1 className="self-center mt-2 text-2xl leading-9 text-center text-gray-300 max-md:max-w-full">
          Hundreds of crypto projects to get early access
        </h1>
        <div className="flex gap-5 justify-between mt-14 mb-12 max-md:flex-wrap max-md:my-10 max-md:mr-2.5 max-md:max-w-full">
          {partnerLogos.map(({ src, alt, className }) => (
            <Image key={alt} src={src} alt={alt} className={className} />
          ))}
        </div>
      </header>
      <div className="z-10 -mt-6 w-full max-md:max-w-full">
        <Section
          title="Fortress of Assurance"
          description={
            <>
              Fortified confidence in <br /> secure crypto <br /> investments
            </>
          }
          imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d8eba8344061d71f0a19956717d4719fd4cd5325c53338ebc20d2602d8e4b2bd?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
          imageAlt="Fortress of Assurance"
        />
      </div>
      <div className="self-center mt-24 w-full max-w-screen-xl max-md:mt-10 max-md:max-w-full">
        <Section
          title="Breaking Boundaries"
          description={
            <>
              Revolutionary trading <br /> freedom with zero <br /> commissions
            </>
          }
          imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/1321b5e713884131c94bc04b5e0ce9385bed733db822648672d3b8ffcb1e29e1?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
          imageAlt="Breaking Boundaries"
          isReversed
        />
      </div>
      <div className="mt-36 w-full max-md:mt-10 max-md:max-w-full">
        <Section
          title="Community-Driven"
          description={
            <>
              We are shaping the <br /> future together
            </>
          }
          imageSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/2a5e7556b0cbbc648f1e79061f120e15cc79e2aad58d7baa58a8b48ec985e3b1?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
          imageAlt="Community-Driven"
        />
      </div>
    </main>
  );
};

export default LandingPage;
