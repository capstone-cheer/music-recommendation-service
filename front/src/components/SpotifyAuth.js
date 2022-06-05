import React, { Component } from 'react'

const getHash = () => {
    return window ? window.parent.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            if (item) {
                var parts = item.split('=')
                initial[parts[0]] = decodeURIComponent(parts[1])
            }

            return initial
          }, {})
      : ''
}

const getRedirectUrl = (clientID, scopes, redirectUri) => {
    return (
        'https://accounts.spotify.com/authorize?response_type=token' +
        `&client_id=${clientID}` +
        `&scope=${scopes.join('%20')}` +
        `&redirect_uri=${redirectUri}` +
        '&show_dialog=true'
    )
}

class SpotifyAuth extends Component {
    constructor(props) {
        super(props)
        this.state = {
        isAuthenticatedWithSpotify: false
        }
    }

    componentDidMount() {
        const accessToken = getHash().access_token
 
        if (accessToken) {
            if (!this.props.noCookie) {
            document.cookie = `spotifyAuthToken=${accessToken}; max-age=${60 * 60};`
            }
            if (this.props.localStorage) {
                window.localStorage.setItem('spotifyAuthToken', accessToken)
            }
            this.props.onAccessToken(accessToken)
        }
    }
 
    handleClick = (event) => {
        event.preventDefault()
        window.location = getRedirectUrl(
            this.props.clientID,
            this.props.scopes,
            this.props.redirectUri
        )
    }
 
    render() {
        return (
            <button
                className={this.props.btnClassName}
                onClick={(event) => this.handleClick(event)}
            >
                <span>{this.props.title}</span>
            </button>
        )
    }
}
export default SpotifyAuth;