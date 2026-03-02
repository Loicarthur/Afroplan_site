import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Search, MapPin, ChevronDown } from "lucide-react-native";
import CoiffeurCard from "../components/CoiffeurCard";
import { MOCK_COIFFEURS } from "../lib/mockData";
import { Coiffeur, Specialty, LocationType } from "../lib/types";

const SPECIALTIES: Specialty[] = [
  "Tresses", "Locks", "Défrisage", "Coloration", "Soins", "Coupe", "Kids friendly",
];
const LOCATION_TYPES: LocationType[] = ["En salon", "Chez moi", "Chez la coiffeuse"];

export default function CoiffeursScreen() {
  const [selectedSpecialties, setSelectedSpecialties] = useState<Specialty[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<LocationType[]>([]);
  const [priceMax, setPriceMax] = useState(200);
  const [query, setQuery] = useState("");

  const toggleSpecialty = (s: Specialty) => {
    setSelectedSpecialties((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const toggleLocation = (l: LocationType) => {
    setSelectedLocations((prev) =>
      prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]
    );
  };

  const filtered: Coiffeur[] = MOCK_COIFFEURS.filter((c) => {
    if (selectedSpecialties.length > 0 && !selectedSpecialties.some((s) => c.specialties.includes(s))) return false;
    if (selectedLocations.length > 0 && !selectedLocations.some((l) => c.locationTypes.includes(l))) return false;
    if (c.priceFrom > priceMax) return false;
    if (query && !c.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <View className="flex-1 flex-row">
      {/* Sidebar */}
      <ScrollView className="bg-white border-r border-afro-border" style={{ width: 240 }} contentContainerStyle={{ padding: 24, gap: 24 }}>
        <Text className="text-afro-black font-semibold text-base">Spécialités</Text>
        <View className="gap-3">
          {SPECIALTIES.map((s) => (
            <TouchableOpacity
              key={s}
              className="flex-row items-center gap-2"
              onPress={() => toggleSpecialty(s)}
            >
              <View
                className={`w-4 h-4 rounded-full border ${
                  selectedSpecialties.includes(s)
                    ? "bg-afro-black border-afro-black"
                    : "bg-white border-afro-gray"
                }`}
              />
              <Text className="text-afro-dark text-sm">{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="h-px bg-afro-border" />

        <Text className="text-afro-black font-semibold text-base">Lieu</Text>
        <View className="gap-3">
          {LOCATION_TYPES.map((l) => (
            <TouchableOpacity
              key={l}
              className="flex-row items-center gap-2"
              onPress={() => toggleLocation(l)}
            >
              <View
                className={`w-4 h-4 rounded-full border ${
                  selectedLocations.includes(l)
                    ? "bg-afro-black border-afro-black"
                    : "bg-white border-afro-gray"
                }`}
              />
              <Text className="text-afro-dark text-sm">{l}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="h-px bg-afro-border" />

        <Text className="text-afro-black font-semibold text-base">Prix</Text>
        <View className="gap-2">
          <View className="h-2 bg-afro-border rounded-full">
            <View
              className="h-2 bg-afro-black rounded-full"
              style={{ width: `${(priceMax / 300) * 100}%` }}
            />
          </View>
          <View className="flex-row justify-between">
            <Text className="text-afro-gray text-xs">0€</Text>
            <Text className="text-afro-gray text-xs">{priceMax}€+</Text>
          </View>
          <View className="flex-row gap-2">
            {[50, 100, 150, 200].map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPriceMax(p)}
                className={`px-2 py-1 rounded-full border text-xs ${
                  priceMax === p ? "bg-afro-black border-afro-black" : "border-afro-border"
                }`}
              >
                <Text className={`text-xs ${priceMax === p ? "text-white" : "text-afro-gray"}`}>
                  {p}€
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Main content */}
      <View className="flex-1">
        {/* Search bar */}
        <View className="bg-white border-b border-afro-border px-6 py-4">
          <View className="flex-row items-center gap-4">
            <View className="flex-1 flex-row items-center bg-afro-light-gray rounded-2xl px-4 py-3 gap-2">
              <Search size={18} color="#6B6B6B" />
              <TextInput
                placeholder="Recherche par type de coiffeur, coiffeur"
                placeholderTextColor="#9B9B9B"
                value={query}
                onChangeText={setQuery}
                className="flex-1 text-sm text-afro-black"
              />
            </View>
            <View className="flex-row items-center bg-afro-light-gray rounded-2xl px-4 py-3 gap-2" style={{ minWidth: 160 }}>
              <MapPin size={18} color="#6B6B6B" />
              <Text className="text-afro-gray text-sm">Ville, quartier...</Text>
            </View>
            <TouchableOpacity className="flex-row items-center bg-afro-light-gray rounded-2xl px-4 py-3 gap-1">
              <Text className="text-afro-gray text-sm">Où</Text>
              <ChevronDown size={16} color="#6B6B6B" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-afro-black px-5 py-3 rounded-xl">
              <Text className="text-white text-sm font-medium">Rechercher</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
          <Text className="text-afro-gray text-sm">{filtered.length} coiffeurs trouvés</Text>

          {/* Grid */}
          <View className="flex-row flex-wrap gap-4">
            {filtered.map((coiffeur) => (
              <View key={coiffeur.id} style={{ width: "31%" }}>
                <CoiffeurCard coiffeur={coiffeur} />
              </View>
            ))}
          </View>

          {filtered.length === 0 && (
            <View className="items-center py-16 gap-3">
              <Text className="text-afro-gray text-base">Aucun coiffeur trouvé</Text>
              <Text className="text-afro-gray text-sm">Essayez d'élargir vos critères</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
