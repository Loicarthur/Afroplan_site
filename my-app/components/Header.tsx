import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { User } from "lucide-react-native";

const NAV_LINKS = [
  { label: "À propos", href: "/about" },
  { label: "Nos coiffeurs", href: "/coiffeurs" },
  { label: "Types de cheveux", href: "/hair-types" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View className="bg-white border-b border-afro-border px-6 py-3 flex-row items-center justify-between">
      {/* Logo */}
      <TouchableOpacity onPress={() => router.push("/")} className="flex-row items-center gap-2">
        <View className="w-8 h-8 bg-afro-black rounded-full items-center justify-center">
          <Text className="text-white text-xs font-bold">A</Text>
        </View>
        <Text className="text-afro-black font-bold text-base tracking-wide">AfroPlan</Text>
      </TouchableOpacity>

      {/* Nav links */}
      <View className="flex-row items-center gap-8">
        {NAV_LINKS.map((link) => (
          <TouchableOpacity key={link.href} onPress={() => router.push(link.href as any)}>
            <Text
              className={`text-sm ${
                pathname === link.href
                  ? "text-afro-black font-semibold"
                  : "text-afro-gray"
              }`}
            >
              {link.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Profile */}
      <TouchableOpacity className="flex-row items-center gap-2 bg-afro-black rounded-full px-4 py-2">
        <User size={16} color="white" />
        <Text className="text-white text-sm font-medium">Talia</Text>
      </TouchableOpacity>
    </View>
  );
}
