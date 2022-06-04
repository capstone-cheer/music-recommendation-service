package server.music.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PlaylistThumbnail {

	private Long playlistId; //플레이리스트 고유 식별 아이디
	private String name; //플레이리스트 이름
	private String imageUrl; //플레이리스트 커버 이미지
}
