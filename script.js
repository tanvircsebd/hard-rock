         const searchSong = document.getElementById('search-criterion');
         const searchButton = document.getElementById('searchBtn');
         const showResult = document.getElementById('showSearchResult');
         searchButton.addEventListener('click', () => { 
            showResult.innerHTML = '';
            showLyric.innerHTML = '';
            getSearchResult();
         });

         const apiLink = 'https://api.lyrics.ovh/suggest/';
         const getSearchResult = () => { 
            fetch(`${apiLink}${searchSong.value}`)
                .then(res => res.json())
                .then(data => {
                    createDivBySearchResult(data.data);
                })
        }
        
        const createDivBySearchResult = (totalResult) => { 
            for (let i = 0; i < totalResult.length; i++) {
                if (i > 9) {
                    break;
                } else {
                    createElements(totalResult[i].title, totalResult[i].album.title, totalResult[i].artist.name, totalResult[i].artist.picture);
                }
            }
        }

        const createElements = (title, album, artist, artistPicture) => {
            showResult.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                              <div class="col-md-6">
                              <h3 class="lyrics-name">${title}</h3>
                              <p class="author lead">Artist: <span>${artist}</span></p>
                              <p class="author lead"> Album: <span>${album}</span></p>
                              </div>
                              <div class="col-md-3">
                              <h4>${artist}</h4>
                              <img src="${artistPicture}" height="100" >
                              </div>
                              <div class="col-md-3 text-md-right text-center">
                              <button onclick="getLyric('${artist}', '${title}')" class="btn btn-success">Get Lyrics</button>
                              </div>                         
                              </div>`;
        }
        const showLyric = document.getElementById('showDesiredlyrics');
        const lyric = 'https://api.lyrics.ovh/v1/';
        
        const displayLyrics = (title, artist, lyric = 'Lyric not available! Please try another one.') => {
            showLyric.innerHTML = ` <button class="btn go-back">&lsaquo;</button>
                                    <h2 class="text-success mb-4">${title} - ${artist}</h2>
                                    <pre class="lyric text-white">${lyric}</pre>
                                `;
        }