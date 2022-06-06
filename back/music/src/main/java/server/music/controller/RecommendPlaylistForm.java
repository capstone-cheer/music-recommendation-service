package server.music.controller;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;

@Getter
public class RecommendPlaylistForm {
	private List<String> songIdList = new ArrayList<>();
}
