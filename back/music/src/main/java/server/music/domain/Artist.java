package server.music.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Getter
@Table(name = "artist")
public class Artist {

	@OneToMany(mappedBy = "artist", cascade = CascadeType.ALL)
	List<Song> songList = new ArrayList<>();
	@Id
	@GeneratedValue
	@Column(name = "artist_id")
	private Long id;
	private String name;
}