import React from "react";
import { View, Text } from "react-native";
import { Star } from "lucide-react-native";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function StarRating({ rating, reviewCount, size = 12 }: StarRatingProps) {
  return (
    <View className="flex-row items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          color={star <= Math.round(rating) ? "#C9A84C" : "#E5E5E5"}
          fill={star <= Math.round(rating) ? "#C9A84C" : "transparent"}
        />
      ))}
      <Text className="text-afro-gray text-xs ml-1">
        {rating.toFixed(1)}
        {reviewCount !== undefined && ` (${reviewCount} avis)`}
      </Text>
    </View>
  );
}
