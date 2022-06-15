package server.music.playlistsong;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import server.music.playlist.domain.Playlist;
import server.music.song.domain.Song;

@Getter
@Setter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PlaylistSong {
	@Id
	@GeneratedValue
	@Column(name = "playlist_song_id")
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "playlist_id")
	private Playlist playlist;

	@ManyToOne//(fetch = FetchType.LAZY)
	@JoinColumn(name = "song_id")
	private Song song;

	//==생성 메서드==//
	public static PlaylistSong createPlaylistSong(Playlist playlist, Song song) {
		PlaylistSong playlistSong = new PlaylistSong();
		playlistSong.setPlaylist(playlist);
		playlistSong.setSong(song);

		return playlistSong;
	}
}
