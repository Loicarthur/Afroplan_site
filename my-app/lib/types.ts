export type Specialty =
  | "Tresses"
  | "Locks"
  | "Défrisage"
  | "Coloration"
  | "Soins"
  | "Coupe"
  | "Kids friendly";

export type LocationType = "En salon" | "Chez moi" | "Chez la coiffeuse";

export interface Review {
  id: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  priceEur: number;
  category: "coupe" | "soin" | "autre";
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Coiffeur {
  id: string;
  name: string;
  location: string;
  arrondissement?: string;
  rating: number;
  reviewCount: number;
  priceFrom: number;
  specialties: Specialty[];
  locationTypes: LocationType[];
  bio?: string;
  hairCareAdvice?: string;
  photos: string[];
  avatar: string;
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    facebook?: string;
  };
  services: Service[];
  reviews: Review[];
  mapCoords?: { lat: number; lng: number };
}

export interface Appointment {
  id: string;
  coiffeurId: string;
  coiffeurName: string;
  coiffeurAvatar: string;
  date: string;
  time: string;
  services: string[];
  totalEur: number;
  status: "upcoming" | "past" | "cancelled";
}

export interface BookingState {
  coiffeurId: string;
  selectedServices: Service[];
  selectedDate: string | null;
  selectedTime: string | null;
  hairPhotoAdded: boolean;
  paymentMethod: "visa" | "paypal" | "apple_pay";
}
