package server.music.spotify.config;

import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

import java.io.IOException;

@Configuration
@PropertySource("classpath:application-API-KEY.properties")
public class SpotifyConfig {

    @Value("${spotify.client.id}")
    public static String SPOTIFY_CLIENT_ID;

    @Value("${spotify.client.secret}")
    public static String SPOTIFY_CLIENT_SECRET;

    @Bean
    public SpotifyApi spotifyApi(){
        SpotifyApi spotifyApi = new SpotifyApi.Builder()
                .setClientId(SPOTIFY_CLIENT_ID)
                .setClientSecret(SPOTIFY_CLIENT_SECRET)
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
