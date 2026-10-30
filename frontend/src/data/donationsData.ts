export interface DonationTier {
  id: string;
  title: string;
  shortTitle: string;
  amount: number;
  period: string;
  badge?: string;
  badgeColor?: string;
  popular?: boolean;
  description: string;
  iconName: "graduation" | "milk" | "food" | "heart";
  colorGradient: string;
}

export const donationTiers: DonationTier[] = [
  {
    id: "child-sponsorship",
    title: "Sponsor a Child",
    shortTitle: "Child Sponsorship",
    amount: 50000,
    period: "per child / year",
    badge: "Most Comprehensive",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    popular: true,
    description:
      "This contribution supports a child's overall educational needs, including school fees, stationery, and skill development.",
    iconName: "graduation",
    colorGradient: "from-[#E8B923] to-amber-500",
  },
];

export const customDonationTier = {
  id: "custom",
  title: "Custom Contribution",
  shortTitle: "Custom Amount",
  amount: 0,
  period: "any amount",
  description: "Choose any amount to support the school.",
  iconName: "heart" as const,
  colorGradient: "from-rose-500 to-[#E8B923]",
};
