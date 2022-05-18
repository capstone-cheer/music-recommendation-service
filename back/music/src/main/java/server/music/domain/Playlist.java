package server.music.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.lang.Nullable;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import server.music.domain.constvalue.Default;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Playlist {
	@Id
	@GeneratedValue
	@Column(name = "playlist_id")
	private Long id;

	private String name; //사용자가 지정한 플레이리스트 이름
	private String imageUrl = Default.THUMBNAIL; // 플레이리스트 대표 이미지 (가장 첫 음악의 앨범커버)

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "playlist", cascade = CascadeType.ALL)
	private List<PlaylistSong> playlistSongs = new ArrayList<>();

	//==연관관계 메서드==//
	public void setMember(Member member) {
		this.member = member;
		member.getPlaylistList().add(this);
	}

	public void setName(String name) {
		this.name = name;
	}

	public void addPlaylistSong(PlaylistSong playlistSong) {
		playlistSongs.add(playlistSong);
		playlistSong.setPlaylist(this);
	}

	//==생성 메서드==//
	public static Playlist createPlaylist(String name, Member member, @Nullable  PlaylistSong... playlistSongs) {
		Playlist playlist = new Playlist();
		playlist.setName(name);
		playlist.setMember(member);
		for (PlaylistSong playlistSong : Objects.requireNonNull(playlistSongs)) {
			playlist.addPlaylistSong(playlistSong);
		}
		return playlist;
	}
}
