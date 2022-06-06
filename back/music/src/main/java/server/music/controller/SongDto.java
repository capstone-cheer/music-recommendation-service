package server.music.controller;

import lombok.Getter;

@Getter
public class SongDto {
	private String songId;
	private String songName;
	private String albumName;
	private String artist;

	public SongDto(String songId, String songName, String albumName, String artist) {
		this.songId = songId;
		this.songName = songName;
		this.albumName = albumName;
		this.artist = artist;
	}
}
