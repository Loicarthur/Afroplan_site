import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Calendar, Clock, Heart } from "lucide-react-native";
import { Appointment } from "../lib/types";
import { useRouter } from "expo-router";

interface AppointmentCardProps {
  appointment: Appointment;
}

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl border border-afro-border overflow-hidden flex-row"
      style={{ width: 280 }}
      onPress={() => router.push(`/coiffeur/${appointment.coiffeurId}` as any)}
    >
      {/* Photo */}
      <View className="relative w-28">
        <Image
          source={{ uri: appointment.coiffeurAvatar }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <TouchableOpacity className="absolute top-2 right-2 bg-white rounded-full p-1">
          <Heart size={12} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View className="flex-1 p-3 gap-1">
        <View className="flex-row items-center gap-1">
          <Calendar size={12} color="#6B6B6B" />
          <Text className="text-afro-gray text-xs">{appointment.date}</Text>
          <Clock size={12} color="#6B6B6B" />
          <Text className="text-afro-gray text-xs">{appointment.time}</Text>
        </View>

        <Text className="text-afro-black font-semibold text-sm">{appointment.coiffeurName}</Text>
        <Text className="text-afro-gray text-xs">
          Nom du coiffeur : {appointment.coiffeurName}
        </Text>
        <Text className="text-afro-gray text-xs">
          Services : {appointment.services.join(", ")}
        </Text>
        <Text className="text-afro-gray text-xs">
          Total : <Text className="text-afro-black font-medium">{appointment.totalEur}€</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}
