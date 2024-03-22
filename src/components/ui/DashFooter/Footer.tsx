import * as React from "react";

interface FooterLinkProps {
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ label }) => {
  return <div className="mt-4">{label}</div>;
};

interface FooterSectionProps {
  title: string;
  links: string[];
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => {
  return (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow text-sm leading-6 text-white max-md:mt-10">
        <div>{title}</div>
        {links.map((link, index) => (
          <FooterLink key={index} label={link} />
        ))}
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: "Careers",
      links: ["About Dotipad", "Council", "Apply for Launchpad"],
    },
    {
      title: "Terms and conditions",
      links: ["Privacy Policy", "Documentation", "Audits"],
    },
    {
      title: "Documentation",
      links: ["Dotipad.js"],
    },
  ];

  return (
    <footer className="flex flex-col pb-14">
      <div className="flex flex-col justify-center items-start px-16 py-20 w-full shadow-sm bg-neutral-950 max-md:px-5 max-md:max-w-full">
        <div className="ml-20 max-w-full w-[656px]">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            {footerSections.map((section, index) => (
              <FooterSection
                key={index}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="justify-center items-start py-6 pr-16 pl-36 w-full text-sm leading-6 shadow-sm bg-neutral-950 text-zinc-400 max-md:px-5 max-md:max-w-full">
        © 2024 • support@.io • All rights reserved. Designed by Rosheed.0x
      </div>
    </footer>
  );
};

export default Footer;
