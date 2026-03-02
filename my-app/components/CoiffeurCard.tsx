import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Heart, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Coiffeur } from "../lib/types";
import StarRating from "./StarRating";
import SpecialtyTag from "./SpecialtyTag";

interface CoiffeurCardProps {
  coiffeur: Coiffeur;
  compact?: boolean;
}

export default function CoiffeurCard({ coiffeur, compact = false }: CoiffeurCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl border border-afro-border overflow-hidden"
      onPress={() => router.push(`/coiffeur/${coiffeur.id}` as any)}
    >
      {/* Photo */}
      <View className="relative">
        <Image
          source={{ uri: coiffeur.photos[0] }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <TouchableOpacity className="absolute top-3 right-3 bg-white rounded-full p-2">
          <Heart size={16} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View className="p-4 gap-2">
        <Text className="text-afro-black font-semibold text-base">{coiffeur.name}</Text>

        <View className="flex-row items-center gap-1">
          <MapPin size={12} color="#6B6B6B" />
          <Text className="text-afro-gray text-xs">{coiffeur.arrondissement ?? coiffeur.location}</Text>
        </View>

        <StarRating rating={coiffeur.rating} reviewCount={coiffeur.reviewCount} />

        {/* Tags */}
        <View className="flex-row flex-wrap gap-2 mt-1">
          {coiffeur.specialties.slice(0, 3).map((s) => (
            <SpecialtyTag key={s} label={s} />
          ))}
        </View>

        <Text className="text-afro-gray text-xs mt-1">
          Prix à partir de :{" "}
          <Text className="text-afro-black font-semibold">{coiffeur.priceFrom}€</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}
