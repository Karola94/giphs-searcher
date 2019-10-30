const GIPHY_API_URL = 'https://api.giphy.com';
const GIPHY_PUB_KEY = 'Src0St8Xs2QVvGCdzsVbjBI6FdaBIkLQ';

App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },
    getGif: function(searchingText, callback) {
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;

        function httpGet(url) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.onload = function() {
                    if(xhr.status === 200) {
                        resolve(response = JSON.parse(xhr.responseText).data);
                    } else {
                        reject(new Error(this.statusText));
                    }
                };
                xhr.onerror = function() {
                    reject(new Error(
                        `XMLHttpRequest Error: ${this.statusText}`
                    ));
                };
                xhr.open('GET', url);
                xhr.send();
            });
        }
        httpGet(url)
            .then(response => {                
                var gif = {
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);
            })
            .catch(error => console.error('Something went wrong', error));       
    },
    handleSearch: function(searchingText) {
        this.setState({
          loading: true
        });
        this.getGif(searchingText, function(gif) {
          this.setState({
            loading: false,
            gif: gif,
            searchingText: searchingText
          });
        }.bind(this));
    },
    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
          </div>
        );
    }
});