package server.music.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.lang.Nullable;

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
	private String login_id;
	@Column(nullable = false)
	private String password;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "member", cascade = CascadeType.ALL)
	@Nullable
	private List<Playlist> playlistList = new ArrayList<>();
}
