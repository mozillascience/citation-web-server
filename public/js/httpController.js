

const GITHUB_CLIENT_ID = '2c034c1c587df515c7d9';
const urlParams = new Map(window.location.search.slice(1).split('&').map(e => [e.split('=')[0], e.split('=')[1]]));

function replaceCitation(msg, error) {
  const $citationOutput = $('#citationOutput');
  const $citationMsg = $citationOutput.children('.panel-body');

  if (error) {
    $citationMsg.addClass('error');
  }
  else {
    $citationMsg.removeClass('error');
  }

  if (!$citationOutput.is(':visible')) {
    $citationMsg.html(msg);
    $citationOutput.slideDown();
  }
  else {
    $citationMsg.fadeOut(200);
    $citationMsg.html(msg);
    $citationMsg.fadeIn(200);
  }
}

function getGitHubCode() {
  let secret;
  let secretUrl;


  // get the secret from the backend

  const data = {
    clientId: GITHUB_CLIENT_ID,
  };

  if (window.location.href.includes('?')) {
    secretUrl = `${window.location.href.slice(0, window.location.href.indexOf('?'))}v01/gitHub/secret/`;
  }
  else {
    secretUrl = `${window.location.href}v01/github/secret`;
  }


  $.post(secretUrl, data)
    .done((returnData) => {
      secret = returnData.secret;
      // set the cookie for 15 minutes
      document.cookie = `gitHubSecret=${secret}; max-age=900`;

      window.location.href = `${'https://github.com/login/oauth/authorize'
            + '?client_id='}${GITHUB_CLIENT_ID
             }&redirect_uri=${window.location.href
             }&state=${secret}`;
    })
    .fail((jqxhr, status, err) => {
      console.error(`Error (HTTP status code ${status}): ${err}`);
    });
}

function getGitHubToken() {
  const data = {
    code: urlParams.get('code'),
    secret: urlParams.get('state'),
  };

  let tokenUrl;

  if (window.location.href.includes('?')) {
    tokenUrl = `${window.location.href.slice(0, window.location.href.indexOf('?'))}v01/gitHub/token/`;
  }
  else {
    tokenUrl = `${window.location.href}v01/github/token`;
  }

  $.post(tokenUrl, data)
    .done((returnData) => {
      // set the cookie with a max age of two weeks
      document.cookie = `gitHubToken=${returnData.token}; max-age=1210000`;
    })
    .fail((jqxhr, status, err) => {
      console.error(`Error (HTTP status code ${status}): ${err}`);
    });
}

function getCitation() {
  let authToken;
  const src = $('#citationUrl').val();

  // If a GitHub URL is used, perform special checks to make sure we have / get a GitHub Oauth key
  if (~src.toLowerCase().indexOf('github.com')) {
    if (~document.cookie.indexOf('gitHubToken=')) {
      // user has an active authentication token for GitHub
      authToken = document.cookie.match(/gitHubToken=.*/)[0].slice(12, document.cookie.length);
    }
    else {
      // user does not have an active GitHub token
      $('#authorizeGitHubModal').modal('show');
      return;
    }
  }

  const data = {
    style: $('#citationFormat').val(),
    token: authToken || null,
    url: src,
  };

  $.post(`${window.location.href.slice(0, window.location.href.indexOf('?'))}v01/citation/`, data)
    .done((returnData) => {
      if (returnData.citation) {
        replaceCitation(returnData.citation);
      }
      else {
        console.error('Error: Empty citation returned.');
        replaceCitation('Unable to generate citation. Please check your citation URL and try again.', true);
      }
    })
    .fail((jqxhr, status, err) => {
      console.error(`Error (HTTP status code )${status}): ${err}`);
      replaceCitation('Unable to generate citation. Please check your citation URL and try again.', true);
    });
}

$('#authorizeGitHubModal').modal({ show: false });
$('#authorizeGitHubBtn').click((evt) => {
  getGitHubCode();
});

$('#citeBtn').click((evt) => {
  getCitation();
});

if (urlParams.has('code')) {
  getGitHubToken();
}
