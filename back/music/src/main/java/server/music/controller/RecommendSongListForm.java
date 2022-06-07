package server.music.controller;

import java.util.List;

import lombok.Getter;

@Getter
public class RecommendSongListForm {
	private List<String> songIdList; //고유 식별 문자열
	private List<String> category;
}
