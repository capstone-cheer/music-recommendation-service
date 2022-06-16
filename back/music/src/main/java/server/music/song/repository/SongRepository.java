package server.music.song.repository;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import server.music.song.domain.Song;

@Repository
@RequiredArgsConstructor
public class SongRepository {

	private final EntityManager em;

	public Song save(Song song) {
		em.persist(song);
		return song;
	}

	public Song findOne(String id) {
		return em.find(Song.class, id);
	}

	public List<Song> findAll() {
		return em.createQuery("select s from Song s", Song.class)
			.getResultList();
	}
}
