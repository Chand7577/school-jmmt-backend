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
    title: "Sponsor a Child for a Year",
    shortTitle: "Child Sponsorship",
    amount: 50000,
    period: "per child / year",
    badge: "Most Comprehensive",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    popular: true,
    description:
      "Covers all stationery, transport, and schooling needs for a child for an entire year.",
    iconName: "graduation",
    colorGradient: "from-[#E8B923] to-amber-500",
  },
  {
    id: "child-milk",
    title: "Sponsor a Child's Milk for a Year",
    shortTitle: "Milk Sponsorship",
    amount: 10000,
    period: "per child / year",
    badge: "Health & Nutrition",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-200",
    description:
      "Provides daily milk for a child throughout the school year.",
    iconName: "milk",
    colorGradient: "from-blue-500 to-indigo-600",
  },
  {
    id: "nutritious-food",
    title: "Nutritious Food for a Year",
    shortTitle: "Food Sponsorship",
    amount: 8000,
    period: "per child / year",
    badge: "Daily Meals",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-200",
    description:
      "Ensures a child receives a nutritious meal every school day for an entire year.",
    iconName: "food",
    colorGradient: "from-emerald-500 to-teal-600",
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
