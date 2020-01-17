<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Homepage</title>

  <link rel="stylesheet" href="/lib/bulma.min.css">
  <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>

  <link rel="stylesheet" href="/home/style/index.css">
</head>

<body>
  <div class="container">
    <div id="panel-collapse-button">
      <span class="icon">
        <i class="fas fa-compress"></i>
      </span>
    </div>
  </div>
  <section id="active-area" class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">


        <div class="columns">
          <div class="column is-one-third">
            <nav id="panel" class="panel">
              <div class="panel-heading">
                <span>Homepage</span>
              </div>
              <p class="panel-tabs">
                <a id="panel-tabs-home">Home</a>
                <a id="panel-tabs-assignments">Assignments</a>
                <a id="panel-tabs-team">Team</a>
                <a id="panel-tabs-misc">Misc</a>
              </p>
              <div id="nav-panel">
                <div class="panel-block">
                  <progress class="progress is-small" max="100"></progress>
                </div>
              </div>
            </nav>
          </div>
        </div>

      </div>
    </div>
    <div id="threejs"></div>
  </section>

  <!-- <script src="/lib/three.min.js"></script> -->
  <!-- <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/264161/OrbitControls.js"></script> -->
  <!-- <script src="/lib/examples/js/postprocessing/UnrealBloomPass.js"></script> -->

  <script type="module" src="/home/script/app.js"></script>
  <script type="module" src="/home/script/index.js"></script>

</body>

</html>