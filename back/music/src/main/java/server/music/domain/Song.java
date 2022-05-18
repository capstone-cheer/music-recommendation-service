package server.music.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;

@Entity
@Getter
@Table(name = "song")
public class Song {
	@Id
	@Column(name = "song_id")
	private String songCode; //spotify 음원 고유 식별 문자열

	private String title; //노래 제목
	private String imageUrl;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "artist_id")
	private Artist artist; //대표아티스트 한명 또는 그룹 하나
}