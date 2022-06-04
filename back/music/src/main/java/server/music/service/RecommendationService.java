package server.music.service;

import java.util.List;

import org.springframework.stereotype.Service;

import server.music.controller.SongResultDto;

@Service
public class RecommendationService {

	public List<SongResultDto> getSongListFromFlask(String songId) {

		String id = "스포티파이아이디";
		String name = "음악이름";
		String albumName = "앨범이름";
		String artistName = "아티스트이름";
		new SongResultDto(id, name, albumName, artistName);

		return null;
	}
}
