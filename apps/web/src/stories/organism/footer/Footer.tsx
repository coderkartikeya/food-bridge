/**
 * FoodBridge Footer Organism
 * Provides secondary navigation, legal links, and brand identity.
 * Built with a responsive grid layout.
 */
import { Heading, Text, Icon } from "@components/export/index";

const footerLinks = [
  {
    title: "About FoodBridge",
    links: ["Who We Are", "Blog", "Work With Us", "Report Fraud", "Contact Us"],
  },
  {
    title: "For Food Partners",
    links: ["Partner With Us", "Apps For You", "Restaurant Dashboard"],
  },
  {
    title: "Learn More",
    links: ["Privacy", "Security", "Terms", "Sitemap"],
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="leafCustom" size={32} className="text-green-700" />
              <Heading headingType="h3" fontWeight="bold" className="text-2xl">
                FoodBridge
              </Heading>
            </div>
            <Text className="text-gray-500 max-w-sm">
              Connecting surplus food from restaurants to those in need.
              Reducing waste, feeding communities, and building a sustainable
              future.
            </Text>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <Heading
                headingType="h5"
                fontWeight="semibold"
                className="mb-4 text-gray-900 uppercase tracking-wider text-xs"
              >
                {section.title}
              </Heading>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-green-700 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200">
          <Text className="text-center text-xs text-gray-400">
            By continuing past this page, you agree to our Terms of Service,
            Cookie Policy, Privacy Policy and Content Policies. All trademarks
            are properties of their respective owners. 2026 © FoodBridge™ Ltd.
            All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
