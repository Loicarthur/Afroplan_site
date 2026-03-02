import React from "react";
import { View, Text, ScrollView } from "react-native";

const HAIR_TYPES = [
  { type: "1A–1C", label: "Cheveux raides", desc: "Fins à épais, complètement lisses" },
  { type: "2A–2C", label: "Cheveux ondulés", desc: "Légères ondulations en forme de S" },
  { type: "3A–3C", label: "Cheveux bouclés", desc: "Boucles définies, du grand au petit" },
  { type: "4A–4C", label: "Cheveux frisés / afro", desc: "Très serrés, texture dense et fragile" },
];

export default function HairTypesScreen() {
  return (
    <ScrollView className="flex-1 bg-afro-light-gray" contentContainerStyle={{ padding: 32, gap: 24 }}>
      <Text className="text-3xl font-bold text-afro-black">Types de cheveux</Text>
      <Text className="text-afro-gray text-base">
        Découvrez les différents types de cheveux afro et texturés pour mieux comprendre vos besoins capillaires.
      </Text>

      <View className="flex-row flex-wrap gap-4 mt-4">
        {HAIR_TYPES.map((item) => (
          <View
            key={item.type}
            className="bg-white rounded-2xl border border-afro-border p-6 gap-2"
            style={{ width: "47%" }}
          >
            <Text className="text-2xl font-bold text-afro-black">{item.type}</Text>
            <Text className="text-afro-dark font-semibold text-base">{item.label}</Text>
            <Text className="text-afro-gray text-sm leading-5">{item.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
