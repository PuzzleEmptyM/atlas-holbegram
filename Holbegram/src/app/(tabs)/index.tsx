import { Text } from "react-native";
import { View } from "react-native-reanimated/lib/typescript/Animated";

export default function FeedScreen() {
  return (
    <View className="bg-slate-300 flex-1 items-center justify-center m-10">
      <Text className="text-md font-bold text-blue-300">
        Feed
      </Text>
    </View>
  );
}
