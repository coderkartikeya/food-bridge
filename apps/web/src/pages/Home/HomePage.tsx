/**
 * FoodBridge Main Landing Page
 * Implements the full marketing funnel: Hero Section, Impact Statistics,
 * and a three-step 'How It Works' guide. Strictly utilizes the atomic
 * design system (Heading, Text, Card) passing typography definitions
 * directly through component props rather than arbitrary utility classes.
 */
import { Heading, Text, Button, Icon, Card } from "@components/export/index";
import chefImage from "../../assets/chefImages.png";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <section className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <Heading
            headingType="h1"
            fontWeight="bold"
            className="text-5xl lg:text-6xl leading-[1.1] text-text-heading"
          >
            Don't let good food go to waste.{" "}
            <span className="text-brand-primary underline decoration-brand-secondary underline-offset-8">
              Route it to where it matters.
            </span>
          </Heading>

          <Text
            fontSize="lg"
            fontColor="var(--color-text-body)"
            className="max-w-lg leading-relaxed"
          >
            FoodBridge connects local restaurants with surplus food to dedicated
            volunteers, ensuring no nutritious meal is thrown away while
            neighbors go hungry.
          </Text>

          <div className="flex flex-col gap-4 mt-6 w-full max-w-sm">
            <Button buttonType="primary" className="px-8 py-4 text-base w-full">
              Start Delivering (For Volunteers)
            </Button>

            <Button
              buttonType="secondary"
              className="px-8 py-4 text-base w-full"
            >
              Donate Food (For Restaurants)
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={chefImage}
              alt="Professional Chefs"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
          <div className="absolute bottom-6 left-6 bg-bg-card p-4 rounded-xl shadow-lg flex items-center gap-3 border border-border-subtle animate-bounce-slow">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
              <Icon name="check" size={20} className="text-brand-primary" />
            </div>
            <div>
              <Text
                fontSize="xs"
                fontWeight="bold"
                fontColor="var(--color-text-muted)"
                className="uppercase tracking-widest"
              >
                Trusted By
              </Text>
              <Text
                fontSize="sm"
                fontWeight="bold"
                fontColor="var(--color-text-heading)"
              >
                450+ Local Partners
              </Text>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-primary py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "MEALS RESCUED", value: "15,420", icon: "check" },
            { label: "ACTIVE VOLUNTEERS", value: "1,200", icon: "eye" },
            { label: "PARTNER OUTLETS", value: "450", icon: "search" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4 border border-white/20 transition-transform hover:scale-105"
            >
              <div className="p-3 bg-white/20 rounded-xl text-white">
                <Icon name={stat.icon as any} size={24} />
              </div>
              <div className="text-white">
                <Text fontSize="xl" fontWeight="bold" fontColor="white">
                  {stat.value}
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  fontColor="white"
                  className="tracking-widest opacity-80 uppercase"
                >
                  {stat.label}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Heading
          headingType="h2"
          fontWeight="bold"
          className="text-4xl mb-4 text-text-heading"
        >
          How It Works
        </Heading>
        <Text
          fontSize="sm"
          fontColor="var(--color-text-muted)"
          className="mb-16 max-w-xl mx-auto"
        >
          Our seamless platform bridges the gap between waste and want in three
          simple steps.
        </Text>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Restaurant lists surplus",
              desc: "Restaurants log edible surplus food via our easy mobile interface in seconds.",
              icon: "edit",
            },
            {
              title: "Volunteer notified",
              desc: "Nearby volunteers receive a notification and claim the pickup based on their route.",
              icon: "eyeOff",
            },
            {
              title: "Delivered to shelter",
              desc: "Food is delivered directly to vetted local shelters and community kitchens.",
              icon: "check",
            },
          ].map((step, idx) => (
            <Card
              key={idx}
              className="flex flex-col items-center p-10 hover:shadow-2xl transition-all border-none bg-bg-card"
            >
              <div className="w-16 h-16 bg-green-50 text-brand-primary rounded-full flex items-center justify-center mb-6">
                <Icon name={step.icon as any} size={28} />
              </div>
              <Heading
                headingType="h4"
                fontWeight="bold"
                className="text-xl mb-3 text-text-heading"
              >
                {step.title}
              </Heading>
              <Text
                fontSize="sm"
                fontColor="var(--color-text-body)"
                className="leading-relaxed"
              >
                {step.desc}
              </Text>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
