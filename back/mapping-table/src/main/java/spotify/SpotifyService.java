package spotify;

import java.io.IOException;

import org.apache.hc.core5.http.ParseException;

import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import spotify.api.ApiKey;

public class SpotifyService {

	private static SpotifyApi spotifyApi;

	public static SpotifyApi getSpotifyService() {
		return spotifyApi;
	}

	public static void initialize() {
		try {
			spotifyApi = new SpotifyApi.Builder()
				.setClientId(ApiKey.SPOTIFY_CLIENT_ID)
				.setClientSecret(ApiKey.SPOTIFY_CLIENT_SECRET)
				.build();
			generateAccessToken();

		} catch (Exception e) {
			System.out.println("오류");
			e.printStackTrace();
		}
	}

	public static void generateAccessToken() {
		ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials().build();
		try {
			final ClientCredentials clientCredentials = clientCredentialsRequest.execute();
			// Set access token for further "spotifyApi" object usage
			spotifyApi.setAccessToken(clientCredentials.getAccessToken());
			System.out.println("Expires in: " + clientCredentials.getExpiresIn());
			System.out.println("Access Token: " + clientCredentials.getAccessToken());
		} catch (IOException | ParseException | SpotifyWebApiException e) {
			e.printStackTrace();
		}
	}

}
