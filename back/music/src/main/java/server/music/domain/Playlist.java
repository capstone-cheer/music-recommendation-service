package server.music.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Getter;

@Getter
@Entity
public class Playlist {
	@Id
	@GeneratedValue
	@Column(name = "playlist_id")
	private Long id;

	private String name; //사용자가 지정한 플레이리스트 이름

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "playlist", cascade = CascadeType.ALL)
	private List<PlaylistSong> playlistSongs = new ArrayList<>();

}
