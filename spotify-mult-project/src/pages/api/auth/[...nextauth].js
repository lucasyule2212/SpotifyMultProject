import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.access_token);
    spotifyApi.setRefreshToken(token.refresh_token);
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accesTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: "bb1d8b641c7c4a84ab38d793f8fb11a4",
      clientSecret: "58cd9aeb47d642caa78f798bb1f5fec7",
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
   secret: 'KwUYNOkKFCywazc+jsD74O7eohQRBJL1rQPh4kwaPLc',
  callbacks: {
    async jwt({ token, account, user }) {
      //first login
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }
      //valid token
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      //expired token
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
});
