package server.music.spotify.config;

import org.apache.hc.core5.http.ParseException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import server.music.spotify.api.ApiKey;

import java.io.IOException;

@Configuration
public class SpotifyConfig {

    @Bean
    public SpotifyApi spotifyApi(){
        SpotifyApi spotifyApi = new SpotifyApi.Builder()
                .setClientId(ApiKey.SPOTIFY_CLIENT_ID)
                .setClientSecret(ApiKey.SPOTIFY_CLIENT_SECRET)
                .build();
        generateAccessToken(spotifyApi);
        return spotifyApi;
    }

    private void generateAccessToken(SpotifyApi spotifyApi) {
        ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials().build();
        try {
            final ClientCredentials clientCredentials = clientCredentialsRequest.execute();
            // Set access token for further "spotifyApi" object usage
            spotifyApi.setAccessToken(clientCredentials.getAccessToken());
//            System.out.println("Expires in: " + clientCredentials.getExpiresIn());
//            System.out.println("Access Token: " + clientCredentials.getAccessToken());
        } catch (IOException | ParseException | SpotifyWebApiException e) {
            e.printStackTrace();
        }
    }
}
