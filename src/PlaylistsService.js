const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const query = {
      text: `
      SELECT
        s.id AS song_id,
        s.title AS title,
        s.year AS year,
        s.performer AS performer,
        s.genre AS genre,
        s.duration AS duration
      FROM
        songs s
      LEFT JOIN
        playlistsongs ps
      ON
        ps.song_id = s.id
      LEFT JOIN
        playlists p
      ON
        p.id = ps.playlist_id
      WHERE
        p.id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return { [playlistId]: result.rows };
  }
}

module.exports = PlaylistsService;
