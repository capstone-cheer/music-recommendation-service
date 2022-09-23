package server.music.spotify.config;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import lombok.extern.slf4j.Slf4j;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

@Configuration
@PropertySource("classpath:application-API-KEY.properties")
@Slf4j
public class SpotifyConfig {

	@Value("${spotify.client.id}")
	private String id;
	@Value("${spotify.client.secret}")
	private String secret;

	@Bean
	public SpotifyApi spotifyApi() {
		SpotifyApi spotifyApi = new SpotifyApi.Builder()
				.setClientId(id)
				.setClientSecret(secret)
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
		log.info("==== Spotify Connected ====");
	}
}
