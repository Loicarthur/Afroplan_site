import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import SearchBar from "../../components/SearchBar";
import AppointmentCard from "../../components/AppointmentCard";
import CoiffeurCard from "../../components/CoiffeurCard";
import { MOCK_APPOINTMENTS, MOCK_COIFFEURS } from "../../lib/mockData";
import { ArrowRight } from "lucide-react-native";

const USERNAME = "Talia";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Hero */}
      <View className="bg-white px-8 py-10 items-center gap-4 border-b border-afro-border">
        <Text className="text-3xl font-bold text-afro-black text-center">
          Bon retour parmi nous {USERNAME}
        </Text>
        <Text className="text-afro-gray text-base text-center">
          Réserve en ligne avec les meilleurs professionnels près de chez toi
        </Text>

        <View className="w-full mt-4">
          <SearchBar />
        </View>
      </View>

      {/* Past appointments */}
      <View className="px-8 mt-8 gap-4">
        <Text className="text-xl font-bold text-afro-black">Mes rendez-vous passé</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-4">
          <View className="flex-row gap-4">
            {MOCK_APPOINTMENTS.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Recommended coiffeurs */}
      <View className="px-8 mt-10 gap-4">
        <View className="flex-row items-center justify-between">
          <View className="gap-1">
            <Text className="text-xl font-bold text-afro-black">Coiffeurs recommandés</Text>
            <Text className="text-afro-gray text-sm">
              Les meilleurs professionnels sélectionnés pour vous
            </Text>
          </View>
          <TouchableOpacity
            className="flex-row items-center gap-2 border border-afro-border px-4 py-2 rounded-full"
            onPress={() => router.push("/coiffeurs" as any)}
          >
            <Text className="text-afro-dark text-sm font-medium">Voir tous les coiffeurs</Text>
            <ArrowRight size={14} color="#2D2D2D" />
          </TouchableOpacity>
        </View>

        {/* Grid */}
        <View className="flex-row flex-wrap gap-4">
          {MOCK_COIFFEURS.map((coiffeur) => (
            <View key={coiffeur.id} style={{ width: "31%" }}>
              <CoiffeurCard coiffeur={coiffeur} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
