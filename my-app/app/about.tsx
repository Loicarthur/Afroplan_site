import React from "react";
import { View, Text, ScrollView } from "react-native";

export default function AboutScreen() {
  return (
    <ScrollView className="flex-1 bg-afro-light-gray" contentContainerStyle={{ padding: 32, gap: 20 }}>
      <View className="gap-6 max-w-2xl">
        <Text className="text-3xl font-bold text-afro-black">À propos d'AfroPlan</Text>
        <Text className="text-afro-gray text-base leading-7">
          AfroPlan est la plateforme de référence pour réserver des coiffeurs spécialisés en cheveux
          afro et texturés en France. Notre mission est de connecter les clients avec les meilleurs
          professionnels capillaires près de chez eux.
        </Text>
        <Text className="text-afro-gray text-base leading-7">
          Que vous cherchiez à faire des tresses, des locks, un soin hydratant ou une coloration
          naturelle, AfroPlan vous met en relation avec des coiffeuses et coiffeurs qualifiés,
          disponibles à domicile ou en salon.
        </Text>

        <View className="gap-4 mt-4">
          {[
            { icon: "🌍", title: "Notre mission", desc: "Valoriser le savoir-faire des coiffeurs afro et faciliter l'accès à des soins capillaires adaptés." },
            { icon: "⭐", title: "Qualité garantie", desc: "Tous nos coiffeurs sont sélectionnés et évalués par notre communauté." },
            { icon: "🔒", title: "Paiement sécurisé", desc: "Vos paiements sont protégés par un système de paiement certifié." },
          ].map((item) => (
            <View key={item.title} className="bg-white rounded-2xl border border-afro-border p-5 gap-2">
              <Text className="text-2xl">{item.icon}</Text>
              <Text className="text-afro-black font-bold text-base">{item.title}</Text>
              <Text className="text-afro-gray text-sm leading-5">{item.desc}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
