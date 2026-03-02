import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Instagram,
  Share2,
  MapPin,
  ChevronDown,
  ChevronUp,
  Star,
  Calendar,
  Clock,
} from "lucide-react-native";
import { MOCK_COIFFEURS } from "../../lib/mockData";
import StarRating from "../../components/StarRating";
import SpecialtyTag from "../../components/SpecialtyTag";
import { Service } from "../../lib/types";

export default function CoiffeurDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const coiffeur = MOCK_COIFFEURS.find((c) => c.id === id);

  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  if (!coiffeur) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-afro-gray">Coiffeur introuvable</Text>
      </View>
    );
  }

  const toggleService = (service: Service) => {
    setSelectedServices((prev) =>
      prev.find((s) => s.id === service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service]
    );
  };

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.priceEur, 0);

  const goToBooking = () => {
    if (selectedServices.length > 0) {
      router.push({
        pathname: `/booking/${coiffeur.id}` as any,
        params: { services: JSON.stringify(selectedServices) },
      });
    }
  };

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 60 }}>
      {/* Back + actions bar */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-afro-border">
        <TouchableOpacity onPress={() => router.back()} className="flex-row items-center gap-2">
          <ArrowLeft size={20} color="#1A1A1A" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-afro-black px-5 py-2 rounded-full">
          <Text className="text-white text-sm font-medium">Choisir une prestation</Text>
        </TouchableOpacity>
      </View>

      {/* Profile info */}
      <View className="px-8 pt-6 pb-4 bg-white gap-3">
        <View className="flex-row items-start justify-between">
          <View className="gap-1">
            <Text className="text-2xl font-bold text-afro-black">{coiffeur.name}</Text>
            <View className="flex-row items-center gap-1">
              <MapPin size={14} color="#6B6B6B" />
              <Text className="text-afro-gray text-sm">{coiffeur.location}</Text>
            </View>
            <StarRating rating={coiffeur.rating} reviewCount={coiffeur.reviewCount} />
          </View>
        </View>

        {/* Social links */}
        <View className="flex-row gap-3">
          {coiffeur.socialLinks?.instagram && (
            <TouchableOpacity className="w-8 h-8 border border-afro-border rounded-lg items-center justify-center">
              <Instagram size={16} color="#1A1A1A" />
            </TouchableOpacity>
          )}
          {coiffeur.socialLinks?.tiktok && (
            <TouchableOpacity className="w-8 h-8 border border-afro-border rounded-lg items-center justify-center">
              <Share2 size={16} color="#1A1A1A" />
            </TouchableOpacity>
          )}
          {coiffeur.socialLinks?.facebook && (
            <TouchableOpacity className="w-8 h-8 border border-afro-border rounded-lg items-center justify-center">
              <Share2 size={16} color="#1A1A1A" />
            </TouchableOpacity>
          )}
        </View>

        {/* Specialties */}
        <View className="flex-row flex-wrap gap-2">
          {coiffeur.specialties.map((s) => (
            <SpecialtyTag key={s} label={s} />
          ))}
        </View>

        <Text className="text-afro-gray text-sm italic">
          Salon dans lequel elle travaille
        </Text>
      </View>

      {/* Photo gallery */}
      <View className="px-8 py-4 bg-white gap-3">
        {/* Main photo */}
        <Image
          source={{ uri: coiffeur.photos[0] }}
          className="w-full rounded-2xl"
          style={{ height: 280 }}
          resizeMode="cover"
        />
        {/* Secondary photos */}
        {coiffeur.photos.length > 1 && (
          <View className="flex-row gap-3">
            {coiffeur.photos.slice(1).map((photo, i) => (
              <Image
                key={i}
                source={{ uri: photo }}
                className="flex-1 rounded-xl"
                style={{ height: 140 }}
                resizeMode="cover"
              />
            ))}
          </View>
        )}
      </View>

      {/* Services / Prestations */}
      <View className="px-8 py-6 gap-4">
        <Text className="text-xl font-bold text-afro-black">Prestations</Text>
        <Text className="text-afro-gray text-sm font-medium">Votre panier</Text>

        <View className="bg-white rounded-2xl border border-afro-border overflow-hidden">
          {coiffeur.services.map((service, index) => (
            <View key={service.id}>
              {index > 0 && <View className="h-px bg-afro-border mx-4" />}
              <TouchableOpacity
                className="flex-row items-center justify-between px-5 py-4"
                onPress={() =>
                  setExpandedService(expandedService === service.id ? null : service.id)
                }
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <View
                    className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                      selectedServices.find((s) => s.id === service.id)
                        ? "border-afro-black bg-afro-black"
                        : "border-afro-border"
                    }`}
                  >
                    {selectedServices.find((s) => s.id === service.id) && (
                      <View className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className="text-afro-black text-sm font-medium">{service.name}</Text>
                    {service.durationMinutes > 0 && (
                      <View className="flex-row items-center gap-1 mt-0.5">
                        <Clock size={11} color="#6B6B6B" />
                        <Text className="text-afro-gray text-xs">{service.durationMinutes}min</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View className="flex-row items-center gap-3">
                  {service.priceEur > 0 && (
                    <Text className="text-afro-black font-semibold text-sm">
                      {service.priceEur},00€
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => toggleService(service)}
                    className="text-afro-gray text-sm"
                  >
                    <Text className="text-afro-gray text-xs underline">
                      {selectedServices.find((s) => s.id === service.id) ? "Retirer" : "Choisir"}
                    </Text>
                  </TouchableOpacity>
                  {expandedService === service.id ? (
                    <ChevronUp size={16} color="#6B6B6B" />
                  ) : (
                    <ChevronDown size={16} color="#6B6B6B" />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Choisir une date button */}
        <View className="flex-row items-center justify-between mt-2">
          <TouchableOpacity className="border border-afro-border px-5 py-3 rounded-full">
            <Text className="text-afro-dark text-sm">Précédent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`px-6 py-3 rounded-full ${
              selectedServices.length > 0 ? "bg-afro-black" : "bg-afro-border"
            }`}
            onPress={goToBooking}
            disabled={selectedServices.length === 0}
          >
            <Text className="text-white text-sm font-medium">
              Choisir une date {totalPrice > 0 ? `— ${totalPrice}€` : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Reviews */}
      <View className="px-8 py-6 gap-4">
        <Text className="text-xl font-bold text-afro-black">Avis</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row gap-4">
            {coiffeur.reviews.map((review) => (
              <View
                key={review.id}
                className="bg-white rounded-2xl border border-afro-border p-5 gap-3"
                style={{ width: 300 }}
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-afro-light-gray rounded-full items-center justify-center">
                    <Text className="text-afro-dark font-semibold text-sm">
                      {review.authorName[0]}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-afro-black font-medium text-sm">{review.authorName}</Text>
                    <StarRating rating={review.rating} size={10} />
                  </View>
                  <Text className="text-afro-gray text-xs">{review.date}</Text>
                </View>
                <Text className="text-afro-gray text-sm leading-5">{review.comment}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Hair care advice */}
      {coiffeur.hairCareAdvice && (
        <View className="px-8 py-6 gap-3 bg-white mx-8 rounded-2xl border border-afro-border">
          <Text className="text-afro-black font-bold text-base">
            Conseil de {coiffeur.name} pour entretenir vos cheveux
          </Text>
          <Text className="text-afro-gray text-sm leading-6">{coiffeur.hairCareAdvice}</Text>
        </View>
      )}

      {/* Map placeholder */}
      <View className="px-8 py-6 gap-3">
        <Text className="text-afro-black font-bold text-base">Où trouver le salon ?</Text>
        <View className="bg-afro-light-gray rounded-2xl border border-afro-border items-center justify-center" style={{ height: 200 }}>
          <MapPin size={32} color="#6B6B6B" />
          <Text className="text-afro-gray text-sm mt-2">{coiffeur.location}</Text>
          <TouchableOpacity className="mt-4 border border-afro-border px-5 py-2 rounded-full">
            <Text className="text-afro-dark text-sm">Itinéraire</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
