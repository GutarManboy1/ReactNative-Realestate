import {
  agentImages,
  galleryImages,
  propertiesImages,
  reviewImages,
} from "./data";

const propertyTypes = [
  "House",
  "Townhomes",
  "Condos",
  "Duplexes",
  "Studios",
  "Villa",
  "Apartments",
  "Others",
];

const facilities = [
  "Laundry",
  "Car Parking",
  "Sports Center",
  "Cutlery",
  "Gym",
  "Swimming pool",
  "Wifi",
  "Pet Center",
];

function getRandomSubset<T>(
  array: T[],
  minItems: number,
  maxItems: number,
): T[] {
  if (minItems > maxItems)
    throw new Error("minItems cannot be greater than maxItems");
  if (minItems < 0 || maxItems > array.length)
    throw new Error(
      "minItems or maxItems are out of valid range for the array",
    );
  const subsetSize =
    Math.floor(Math.random() * (maxItems - minItems + 1)) + minItems;
  const arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[i],
    ];
  }
  return arrayCopy.slice(0, subsetSize);
}

export interface Agent {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Review {
  $id: string;
  name: string;
  avatar: string;
  review: string;
  rating: number;
}

export interface Gallery {
  $id: string;
  image: string;
}

export interface Property {
  $id: string;
  name: string;
  type: string;
  description: string;
  address: string;
  geolocation: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  facilities: string[];
  image: string;
  agent: Agent;
  reviews: Review[];
  gallery: Gallery[];
}

function generateData() {
  const agents: Agent[] = Array.from({ length: 5 }, (_, i) => ({
    $id: `agent-${i + 1}`,
    name: `Agent ${i + 1}`,
    email: `agent${i + 1}@example.com`,
    avatar: agentImages[Math.floor(Math.random() * agentImages.length)],
  }));

  const reviews: Review[] = Array.from({ length: 20 }, (_, i) => ({
    $id: `review-${i + 1}`,
    name: `Reviewer ${i + 1}`,
    avatar: reviewImages[Math.floor(Math.random() * reviewImages.length)],
    review: `This is a review by Reviewer ${i + 1}.`,
    rating: Math.floor(Math.random() * 5) + 1,
  }));

  const galleries: Gallery[] = galleryImages.map((image, i) => ({
    $id: `gallery-${i + 1}`,
    image,
  }));

  const properties: Property[] = Array.from({ length: 20 }, (_, i) => {
    const idx = i + 1;
    const assignedAgent = agents[Math.floor(Math.random() * agents.length)];
    const assignedReviews = getRandomSubset(reviews, 5, 7);
    const assignedGalleries = getRandomSubset(
      galleries,
      3,
      Math.min(8, galleries.length),
    );
    const selectedFacilities = [...facilities]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * facilities.length) + 1);
    const image =
      propertiesImages.length - 1 >= idx
        ? propertiesImages[idx]
        : propertiesImages[Math.floor(Math.random() * propertiesImages.length)];

    return {
      $id: `property-${idx}`,
      name: `Property ${idx}`,
      type: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
      description: `This is the description for Property ${idx}.`,
      address: `123 Property Street, City ${idx}`,
      geolocation: `192.168.1.${idx}, 192.168.1.${idx}`,
      price: Math.floor(Math.random() * 9000) + 1000,
      area: Math.floor(Math.random() * 3000) + 500,
      bedrooms: Math.floor(Math.random() * 5) + 1,
      bathrooms: Math.floor(Math.random() * 5) + 1,
      rating: Math.floor(Math.random() * 5) + 1,
      facilities: selectedFacilities,
      image,
      agent: assignedAgent,
      reviews: assignedReviews,
      gallery: assignedGalleries,
    };
  });

  return { agents, reviews, galleries, properties };
}

export const { agents, reviews, galleries, properties } = generateData();

export default function seed() {
  console.log("Local seed data ready:", properties.length, "properties");
}
