package server.music.recommendation.controller.form;

import java.util.List;

import lombok.Getter;

@Getter
public class RecommendSongForm {
	private String songId;
	private List<String> category;
}
