import { Coiffeur, Appointment } from "./types";

export const MOCK_COIFFEURS: Coiffeur[] = [
  {
    id: "1",
    name: "Miya",
    location: "Paris 13e arrondissement",
    arrondissement: "Paris 13e",
    rating: 4.8,
    reviewCount: 32,
    priceFrom: 50,
    specialties: ["Tresses", "Soins", "Kids friendly"],
    locationTypes: ["En salon", "Chez moi"],
    bio: "Coiffeuse professionnelle spécialisée dans les cheveux afro et texturés, avec 8 ans d'expérience.",
    hairCareAdvice:
      "Pour entretenir vos cheveux bouclés, hydratez-les régulièrement avec des soins à base de karité et d'huile d'argan. Évitez de les laver trop souvent et utilisez une taie d'oreiller en soie pour réduire les frisottis pendant la nuit. La méthode LOC (Liquid, Oil, Cream) est idéale pour garder vos boucles définies et brillantes.",
    photos: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600",
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400",
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400",
    ],
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
    socialLinks: {
      instagram: "#",
      tiktok: "#",
      facebook: "#",
    },
    services: [
      { id: "s1", name: "Tresse", durationMinutes: 180, priceEur: 50, category: "coupe" },
      { id: "s2", name: "Box braids", durationMinutes: 240, priceEur: 80, category: "coupe" },
      { id: "s3", name: "Soin hydratant profond", durationMinutes: 30, priceEur: 35, category: "soin" },
      { id: "s4", name: "Wash & go", durationMinutes: 60, priceEur: 40, category: "soin" },
      { id: "s5", name: "Coupe pointes", durationMinutes: 30, priceEur: 20, category: "coupe" },
      { id: "s6", name: "Ajout de prestations supplémentaires", durationMinutes: 0, priceEur: 0, category: "autre" },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Lucie",
        rating: 5,
        date: "2024-01-15",
        comment:
          "Excellente coiffeuse, très professionnelle et à l'écoute. Mes tresses sont magnifiques et ont tenu plus de 6 semaines !",
      },
      {
        id: "r2",
        authorName: "Sarah",
        rating: 4,
        date: "2024-01-10",
        comment:
          "Très bonne prestation, Miya est douce et rapide. Le résultat est top, je recommande vivement pour les tresses.",
      },
      {
        id: "r3",
        authorName: "Amina",
        rating: 5,
        date: "2024-01-05",
        comment:
          "Parfait comme toujours ! Miya connaît parfaitement les cheveux afro. Mes cheveux sont en pleine santé.",
      },
    ],
    mapCoords: { lat: 48.8309, lng: 2.3597 },
  },
  {
    id: "2",
    name: "Huguette",
    location: "Paris 11e arrondissement",
    arrondissement: "Paris 11e",
    rating: 4.4,
    reviewCount: 19,
    priceFrom: 40,
    specialties: ["Locks", "Coloration", "Soins"],
    locationTypes: ["En salon", "Chez la coiffeuse"],
    bio: "Spécialiste des locks et des techniques naturelles depuis 5 ans.",
    photos: [
      "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600",
      "https://images.unsplash.com/photo-1582095133179-bfd08e2fb6b9?w=400",
    ],
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200",
    services: [
      { id: "s1", name: "Locks starter", durationMinutes: 180, priceEur: 60, category: "coupe" },
      { id: "s2", name: "Retouche locks", durationMinutes: 120, priceEur: 40, category: "soin" },
      { id: "s3", name: "Coloration naturelle", durationMinutes: 90, priceEur: 55, category: "soin" },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Fatou",
        rating: 5,
        date: "2024-01-12",
        comment: "Super travail sur mes locks ! Huguette est une vraie professionnelle.",
      },
    ],
    mapCoords: { lat: 48.8602, lng: 2.3789 },
  },
  {
    id: "3",
    name: "Régis",
    location: "Paris 9e arrondissement",
    arrondissement: "Paris 9e",
    rating: 4.1,
    reviewCount: 9,
    priceFrom: 30,
    specialties: ["Coupe", "Défrisage"],
    locationTypes: ["En salon"],
    bio: "Coiffeur mixte avec une expertise particulière en coupe et défrisage.",
    photos: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600",
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400",
    ],
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    services: [
      { id: "s1", name: "Coupe homme", durationMinutes: 45, priceEur: 30, category: "coupe" },
      { id: "s2", name: "Défrisage", durationMinutes: 120, priceEur: 50, category: "soin" },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Marc",
        rating: 4,
        date: "2024-01-08",
        comment: "Très bonne coupe, propre et soignée. Je reviendrai.",
      },
    ],
    mapCoords: { lat: 48.8765, lng: 2.3367 },
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "a1",
    coiffeurId: "1",
    coiffeurName: "Miya",
    coiffeurAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
    date: "lundi 17 nov.",
    time: "18h00",
    services: ["Tresse", "Soin hydratant"],
    totalEur: 85,
    status: "past",
  },
  {
    id: "a2",
    coiffeurId: "2",
    coiffeurName: "Huguette",
    coiffeurAvatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200",
    date: "lundi 17 nov.",
    time: "18h00",
    services: ["Locks starter"],
    totalEur: 60,
    status: "past",
  },
];

export const WEEK_DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export const MOCK_TIME_SLOTS = [
  { time: "9h00", available: true },
  { time: "10h00", available: true },
  { time: "11h00", available: false },
  { time: "12h00", available: true },
  { time: "13h00", available: false },
  { time: "14h00", available: true },
  { time: "15h00", available: true },
  { time: "16h00", available: true },
  { time: "17h00", available: false },
  { time: "18h00", available: true },
  { time: "19h00", available: true },
  { time: "20h00", available: true },
];
