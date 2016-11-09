<!-- base -->
<!doctype html>
<html lang="{%- if lang %}{{lang}}{%- else %}zh-cmn-Hans{%- endif %}">
<head>
<meta charset="{%- if charset %}{{charset}}{%- else %}utf-8{%- endif %}">
<title>{%- if info.title %}{{info.title}}{%- endif %}{%- if sitename %} - {{sitename}}{%- endif %}</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
{%- if author %}
<meta name="author" content="{{author}}" />
{%- endif %}
{%- if siteurl %}
<meta name="copyright" content="{{siteurl}}" />
{%- endif %}
{%- if keywords %}
<meta name="keywords" content="{{keywords}}" />
{%- endif %}
{%- if description %}
<meta name="description" content="{{description}}" />
{%- endif %}
{%- if favicon %}
<link rel="shortcut icon" href="{{favicon}}"/>
{%- endif %}
<link href="static/css/style.css" rel="stylesheet" type="text/css">
<script src="static/js/main.js" type="text/javascript" ></script>
</head>
<!-- /base -->
<body>
<!-- header -->
<header>
  <div><img src="static/images/logo.jpg"/></div>
  {%- if navigation %}
  <menu class="animated fadeInRight">
  {%- for nav in navigation %}
    <li><a href="{{nav.url}}"{%- if info.url === nav.url %} class="current"{%- endif %}>{{nav.title}}</a></li>{%- endfor %}
  </menu>
  {%- endif %}
</header>
<!-- /header --> 
<!-- container --> 
{%- block page %}
{%- endblock %} 
<!-- /container --> 
<!-- footer -->
<footer> </footer>
{%- block script %}
{% endblock %} 
<!-- /footer -->
</body>
</html>