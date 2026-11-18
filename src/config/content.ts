import { images } from "./images";

/**
 * Section copy. Working copy: review it with the centre and edit freely.
 * No real prices, hours, testimonials, partners or member statistics are claimed.
 */
export const nav = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Membership", href: "#plans" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  lines: ["TRAIN HARDER.", "BECOME STRONGER."],
  sub: "Push your limits, build confidence and transform your fitness journey at Dark Knight Unisex Fitness Centre.",
};

/** Illustrative sample values for the floating hero cards. Not real member data. */
export const heroStats = {
  calories: { value: 486, goal: 650 },
  activeMinutes: 52,
  week: [38, 52, 44, 61, 47, 70, 55],
  progress: 72,
};

export const trust = "TRAIN WITH PURPOSE. TRANSFORM WITH CONFIDENCE.";

export const features = [
  { icon: "Dumbbell", title: "Strength Training", text: "Free weights and machines for building real, lasting strength." },
  { icon: "HeartPulse", title: "Cardio Training", text: "Build stamina and burn energy with cardio that keeps you moving." },
  { icon: "ClipboardList", title: "Fitness Programs", text: "Structured programs matched to your goal: size, strength or weight loss." },
  { icon: "UserCheck", title: "Personal Fitness Guidance", text: "Ask for help with form, routines or where to start." },
  { icon: "Users", title: "Fitness Community", text: "Men and women training side by side and pushing each other forward." },
  { icon: "Flame", title: "Transformation", text: "Consistent training, adjusted as you grow, until the change shows." },
] as const;

export const about = {
  title: "One floor. Two kinds of strong.",
  body: [
    "Dark Knight is a unisex fitness centre built for men and women who want to train hard. Everyone shares the same floor, the same equipment and the same standard.",
    "We built the centre around the work itself: heavy lifts, honest cardio and coaching that pays attention to how you move.",
  ],
};

export const programs = [
  { name: "Weight Training", text: "Dumbbells, barbells and machines used with purpose and good form.", image: images.programs.weight },
  { name: "Strength Training", text: "Built around the big lifts, with progress you can measure.", image: images.programs.strength },
  { name: "Cardio", text: "Stamina and conditioning work that raises your engine.", image: images.programs.cardio },
  { name: "Muscle Building", text: "Structured splits and progressive overload for steady size and shape.", image: images.programs.muscle },
  { name: "Weight Loss", text: "Training and habits that burn fat and that you can keep up.", image: images.programs.weightloss },
  { name: "General Fitness", text: "A balanced routine for energy, mobility and everyday strength.", image: images.programs.general },
];

/** Set `price` (for example "₹0,000") once the centre confirms rates. Empty shows "Price on request". */
/** Illustrative package content for the membership cards. Confirm real rates and inclusions with the centre before publishing. */
export const plans = [
  { id: "monthly", name: "Monthly", duration: "1 month", text: "A flexible start for building a consistent training routine.", price: "?1,500", includes: ["Full gym floor access", "Strength and cardio equipment", "Trainer orientation"], featured: false },
  { id: "quarterly", name: "Quarterly", duration: "3 months", text: "A focused term to build momentum and make progress.", price: "?3,900", includes: ["Full gym floor access", "Strength and cardio equipment", "Trainer orientation", "One monthly progress check-in"], featured: true },
  { id: "half-yearly", name: "Half-Yearly", duration: "6 months", text: "More time to make training a lasting part of your week.", price: "?7,200", includes: ["Full gym floor access", "Strength and cardio equipment", "Trainer orientation", "Monthly progress check-ins"], featured: false },
  { id: "annual", name: "Annual", duration: "12 months", text: "A full year of training, consistency and steady improvement.", price: "?12,000", includes: ["Full gym floor access", "Strength and cardio equipment", "Trainer orientation", "Monthly progress check-ins"], featured: false },
];