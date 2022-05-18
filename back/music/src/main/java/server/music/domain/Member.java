package server.music.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Member {
	@Id
	@GeneratedValue
	@Column(name = "member_id")
	private Long id;

	@Column(unique = true, nullable = false, updatable = false)
	private String loginId;
	@Column(nullable = false)
	private String password;

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<Playlist> playlistList = new ArrayList<>();
}
