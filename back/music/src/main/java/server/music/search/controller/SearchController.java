package server.music.search.controller;

import lombok.RequiredArgsConstructor;
import org.apache.hc.core5.http.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.special.SearchResult;
import se.michaelthelin.spotify.model_objects.specification.Track;
import server.music.global.dto.SongResultDto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SearchController {

    private final SpotifyApi spotifyApi;

    @GetMapping("/search")
    public ResponseEntity<List<SongResultDto>> search(@RequestParam String keyword) throws IOException, ParseException, SpotifyWebApiException {
        SearchResult execute = spotifyApi.searchItem(keyword, "track")
                .limit(10)
                .build()
                .execute();
        Track[] items = execute.getTracks().getItems();
        List<SongResultDto> songResultDtos = new ArrayList<>();
        for (Track item : items) {
            songResultDtos.add(new SongResultDto(
                    item.getId(),
                    item.getName(),
                    item.getAlbum().getName(),
                    item.getArtists()[0].getName(),
                    item.getAlbum().getImages()[0].getUrl()
            ));
        }
        return ResponseEntity.ok(songResultDtos);
    }
}
