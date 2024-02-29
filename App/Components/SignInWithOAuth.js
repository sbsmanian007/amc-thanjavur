import React from "react";
import { TouchableOpacity, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import Colors from "../../assets/Shared/Colors";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 16,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
        width: '100%',
      }}
    >
      <Text style={{ fontSize: 16, color: Colors.white, fontWeight: 'bold' }}>
        Login With Google
      </Text>
    </TouchableOpacity>
  );
};
export default SignInWithOAuth;
