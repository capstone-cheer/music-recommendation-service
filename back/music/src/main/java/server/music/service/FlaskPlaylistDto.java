package server.music.service;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public class FlaskPlaylistDto {

	@JsonProperty("song_id_list")
	private List<String> songIdList = new ArrayList<>();
}
