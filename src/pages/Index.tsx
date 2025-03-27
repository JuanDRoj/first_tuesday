import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ProgressBar from "@/components/ProgressBar";
import DonorsList from "@/components/DonorsList";
import DonationTier from "@/components/DonationTier";
import ImpactStats from "@/components/ImpactStats";
import CampaignInfo from "@/components/CampaignInfo";
import PodcastSection from "@/components/PodcastSection";
import GrowWithAlliance from "@/components/GrowWithAlliance";
import VideoSection from "@/components/VideoSection";
import ScrollAnimationDemo from "@/components/ScrollAnimationDemo";
import DonationPopUp from "@/components/DonationPopUp";
import { DonationForm, getDonations } from "@/api/useDonations";

const Index = () => {
  // Define PopUp status
  const [isDonationPopupOpen, setIsDonationPopupOpen] = useState(false);

  const [donations, setDonations] = useState<DonationForm[]>([]);
  const [donationRaised, setDonationRaised] = useState(0);

  const [defaultDonationAmount, setDefaultDonationAmount] = useState(0);

  // Animation on scroll effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Get donations
  useEffect(() => {
    getDonations(true)
      .then((donations) => {
        setDonations(donations);
        setDonationRaised(
          donations.reduce((sum, { amount }) => sum + amount, 0)
        );
      })
      .catch(console.error);
  }, []);

  // Define donation tiers
  const donationTiers = [
    {
      title: "The Changemaker",
      amount: 100,
      benefits: [
        { text: "Funds training and organizing volunteers" },
        { text: "Covers the cost of onboarding a small business" },
        { text: "Name listed as a 'Changemaker' on website" },
      ],
    },
    {
      title: "The Nonprofit Champion",
      amount: 500,
      benefits: [
        { text: "Fully supports one nonprofit for an event" },
        { text: "Develops digital tools that track impact" },
        { text: "Social media shoutout & logo placement" },
      ],
      highlight: true,
    },
    {
      title: "The Tech Enabler",
      amount: 1000,
      benefits: [
        { text: "Directly contributes to building our platform" },
        { text: "Funds a small business team to serve for a month" },
        { text: "Recognition at our platform launch event" },
      ],
    },
    {
      title: "The Impact Partner",
      amount: 5000,
      benefits: [
        { text: "Accelerates development of our tech platform" },
        { text: "Sponsors three nonprofit organizations" },
        { text: "Featured on our podcast as an Impact Partner" },
        { text: "VIP invitation to Leadership Breakfast" },
      ],
    },
    {
      title: "The Community Pillar",
      amount: 10000,
      benefits: [
        { text: "Founding partner of First Tuesday's future" },
        { text: "Supports 100+ new businesses joining in 2025" },
        { text: "Named as a Community Pillar Sponsor" },
        { text: "Exclusive podcast feature" },
      ],
      limited: true,
      limitText: "Only 3 spots available",
    },
  ];

  // handle PopUpOpen
  const handleOnDonate = (amount?: number) => {
    setIsDonationPopupOpen(true);
    setDefaultDonationAmount(amount || 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <img
            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/yNs6MDaUC3lENJrSOcmE/media/64c3ef5114592c85c49e1956.png"
            alt="First Tuesday Logo"
            className="h-8"
          />
          <button
            onClick={() => {
              handleOnDonate();
            }}
            className="bg-ftpurple text-white font-semibold py-2 px-6 rounded-full text-sm hover:bg-ftpurple-dark transition-all duration-300"
          >
            Donate Now
          </button>
        </div>
      </header>

      {isDonationPopupOpen && (
        <DonationPopUp
          onClose={() => setIsDonationPopupOpen(false)}
          defaultAmount={defaultDonationAmount}
        />
      )}

      {/* Hero Section */}
      <Hero
        onDonate={() => {
          handleOnDonate();
        }}
      />

      {/* Scroll Animation Demo */}
      <ScrollAnimationDemo />

      {/* Main Fundraising Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Campaign Details */}
          <div className="lg:col-span-2">
            <div className="mb-10 animate-on-load animate-delay-100">
              <p className="text-lg text-gray-700 mb-6">
                For two years, First Tuesday has been a labor of love—a movement
                built by passionate business leaders and community members who
                believe that when businesses serve, Baton Rouge wins.
              </p>

              <p className="text-lg text-gray-700 mb-6">
                We started with nothing but a vision and a willingness to do the
                work. Every event, every connection, and every hour served was
                coordinated manually, through emails, calls, and sheer
                persistence.
              </p>

              <div className="font-display text-2xl font-bold text-ftpurple mb-5">
                Now, it's time to scale.
              </div>

              <p className="text-lg text-gray-700 mb-8">
                We're launching a tech-enabled platform that will transform
                First Tuesday from a labor-intensive movement into a structured,
                data-driven, scalable initiative—making business-led
                volunteerism easier, smarter, and more impactful.
              </p>
            </div>

            {/* Fundraising Goal */}
            <div className="glass-morphism p-6 rounded-2xl mb-12">
              <h2 className="font-display text-2xl font-bold mb-6 text-center">
                Our fundraising goal:{" "}
                <span className="text-ftpurple">$20,000</span>
              </h2>
              <ProgressBar
                onDonate={() => {
                  handleOnDonate();
                }}
                raised={donationRaised}
                goal={20000}
              />
            </div>

            {/* Donation Tiers */}
            <div className="mb-16 animate-on-scroll">
              <h2 className="font-display text-2xl font-bold mb-2">
                Choose Your Level of Impact
              </h2>
              <p className="text-gray-600 mb-8">
                Every gift moves the mission forward.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {donationTiers.map((tier, index) => (
                  <div
                    key={index}
                    className="animate-on-scroll"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <DonationTier
                      title={tier.title}
                      amount={tier.amount}
                      benefits={tier.benefits}
                      highlight={tier.highlight}
                      limited={tier.limited}
                      limitText={tier.limitText}
                      onDonate={() => handleOnDonate(tier.amount)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Donors */}
          <div className="lg:sticky lg:top-24 lg:self-start h-max">
            <div className="glass-morphism rounded-2xl p-6">
              <DonorsList donationsData={donations} />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Impact Stats */}
      <ImpactStats />

      {/* Grow With Alliance Section */}
      <GrowWithAlliance />

      {/* Campaign Information */}
      <CampaignInfo />

      {/* Podcast Section */}
      <PodcastSection />

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/yNs6MDaUC3lENJrSOcmE/media/64c3ef5114592c85c49e1956.png"
            alt="First Tuesday Logo"
            className="h-16 mx-auto mb-6"
          />
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join us in building something bigger than a volunteer day—help us
            create a lasting legacy of impact.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              onClick={() => {
                handleOnDonate();
              }}
              className="ft-btn-primary"
            >
              Donate Now
            </button>
            <button className="ft-btn-secondary">Sign Up to Volunteer</button>
          </div>

          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} First Tuesday. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
