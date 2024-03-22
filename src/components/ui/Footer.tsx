import * as React from "react";

interface SocialMediaIconProps {
  src: string;
  alt: string;
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ src, alt }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className="shrink-0 w-6 aspect-square"
  />
);

const Footer: React.FC = () => {
  const socialMediaIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b422462c71d3dee0b65fd0a3201a3d3d25a1f424e1464c469c42181ffb797cf2?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      alt: "Social media icon 1",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7ebe05810f9eb72f7bbadbfcc1053190cc6155854772842d28d540b231e45648?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      alt: "Social media icon 2",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1412302e42eeed147aea3a3802fc5b94bc55befedff62ba0d4702f9044085645?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      alt: "Social media icon 3",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/513c486ef21c829cb77f0028a5ce7e983e300be445c049dab5eec7bc00d5509e?apiKey=caf73ded90744adfa0fe2d98abed61c0&",
      alt: "Social media icon 4",
    },
  ];

  return (
    <footer className="flex justify-center items-center px-16 py-8 border-t border-gray-800 border-solid bg-zinc-950 max-md:px-5">
      <div className="flex gap-5 justify-between max-w-full w-[1280px] max-md:flex-wrap">
        <div className="flex flex-col self-start mt-1.5 text-sm font-medium text-center text-slate-500">
          <p>© 2023 Legion Ventures. All rights reserved.</p>
          <nav className="flex gap-3 mt-4">
            <a href="#" className="grow underline">
              Privacy Policy
            </a>
            <a href="#" className="flex-auto underline">
              Terms & Condition
            </a>
          </nav>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7284f96f3db1a76df120048df135f004e2becf2b0ce42b113c4ee4848dd22261?apiKey=caf73ded90744adfa0fe2d98abed61c0&"
          alt="Legion Ventures logo"
          className="shrink-0 max-w-full aspect-[4.17] w-[206px]"
        />
        <div className="flex gap-5 justify-between my-auto">
          {socialMediaIcons.map((icon, index) => (
            <SocialMediaIcon key={index} src={icon.src} alt={icon.alt} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
