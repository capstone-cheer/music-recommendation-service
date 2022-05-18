package server.music.controller;

import java.util.List;

import lombok.Getter;

@Getter
public class SongCodeDto {
	private List<String> songCodeList; //고유 식별 문자열
}
