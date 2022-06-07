package server.music.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@AllArgsConstructor
@Getter
public class SongResultDto {
    private String id;
    private String name;
    private String albumName;
    private String artistName;
    private String imageUrl;
}
